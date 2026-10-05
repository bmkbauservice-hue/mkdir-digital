# Werkzeug: Mustertext aus den Kartenmotiven entfernen (OpenCV-Inpainting + Struktur aus sauberem Musterstueck).
# Wird nur zum Vorbereiten der Bilder benutzt, nicht von der Website.
import cv2, numpy as np, sys, json
def text_mask(img, boxes, mode="light", k=25, thr=28, grow=4):
    g=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    kern=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
    if mode=="light": th=cv2.morphologyEx(g,cv2.MORPH_TOPHAT,kern)     # helle Schrift auf dunklem Grund
    else: th=cv2.morphologyEx(g,cv2.MORPH_BLACKHAT,kern)                # dunkle Schrift auf hellem Grund
    m=np.zeros_like(g)
    for b in boxes:
        x0,y0,x1,y1=b[:4]; kk=b[4] if len(b)>4 else None
        sub=th[y0:y1,x0:x1]
        if kk=="full": m[y0:y1,x0:x1]=255; continue
        m[y0:y1,x0:x1]=np.where(sub>thr,255,0)
    m=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*grow+1,2*grow+1)))
    return m
def retouch(path,out,boxes,mode="light",k=25,thr=28,grow=4,radius=9,method=cv2.INPAINT_TELEA):
    img=cv2.imread(path)
    m=text_mask(img,boxes,mode,k,thr,grow)
    res=cv2.inpaint(img,m,radius,method)
    cv2.imwrite(out,res); cv2.imwrite(out.replace('.jpg','-mask.png'),m)
    return res

def full_fill(img, boxes, radius=15):
    """Bereiche komplett neu füllen (für glatte Hintergründe)."""
    m=np.zeros(img.shape[:2],np.uint8)
    for x0,y0,x1,y1 in boxes: m[y0:y1,x0:x1]=255
    return cv2.inpaint(img,m,radius,cv2.INPAINT_TELEA)

def texture_fill(img, boxes, src_box, feather=14, seed=1):
    """Bereiche mit echter Struktur aus einem sauberen Ausschnitt füllen (für Papier, Stoff)."""
    rng=np.random.default_rng(seed)
    out=img.copy().astype(np.float32)
    sx0,sy0,sx1,sy1=src_box; src=img[sy0:sy1,sx0:sx1].astype(np.float32)
    sh,sw=src.shape[:2]
    # Helligkeit an die Umgebung jedes Bereichs anpassen
    for x0,y0,x1,y1 in boxes:
        h,w=y1-y0,x1-x0
        tile=np.zeros((h,w,3),np.float32)
        for ty in range(0,h,sh//2):
            for tx in range(0,w,sw//2):
                ox,oy=rng.integers(0,sw//2),rng.integers(0,sh//2)
                patch=src[oy:oy+sh//2, ox:ox+sw//2]
                ph,pw=min(patch.shape[0],h-ty),min(patch.shape[1],w-tx)
                tile[ty:ty+ph,tx:tx+pw]=patch[:ph,:pw]
        ring=np.concatenate([img[max(0,y0-8):y0,x0:x1].reshape(-1,3),img[y1:y1+8,x0:x1].reshape(-1,3)]).astype(np.float32)
        if len(ring): tile+= ring.mean(0)-src.reshape(-1,3).mean(0)
        a=np.zeros((h,w),np.float32); a[feather:h-feather,feather:w-feather]=1
        a=cv2.GaussianBlur(a,(0,0),feather/2)[...,None]
        out[y0:y1,x0:x1]=out[y0:y1,x0:x1]*(1-a)+tile*a
    return np.clip(out,0,255).astype(np.uint8)

def clean_patch(img, size=110, exclude=()):
    """Ruhigsten Ausschnitt suchen (geringste Struktur-Abweichung), der nicht in exclude liegt."""
    g=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY).astype(np.float32)
    best=None
    for y in range(0,img.shape[0]-size,20):
        for x in range(0,img.shape[1]-size,20):
            if any(not(x+size<a or x>c or y+size<b or y>d) for a,b,c,d in exclude): continue
            s=g[y:y+size,x:x+size].std()
            if best is None or s<best[0]: best=(s,(x,y,x+size,y+size))
    return best[1]

def make_texture(img, src_box, shape, seed=5):
    rng=np.random.default_rng(seed)
    sx0,sy0,sx1,sy1=src_box; src=img[sy0:sy1,sx0:sx1].astype(np.float32)
    step=min(src.shape[:2])//2; H,W=shape
    t=np.zeros((H,W,3),np.float32)
    for y in range(0,H,step):
        for x in range(0,W,step):
            ox,oy=rng.integers(0,src.shape[1]-step+1),rng.integers(0,src.shape[0]-step+1)
            p=src[oy:oy+step,ox:ox+step]; ph,pw=min(step,H-y),min(step,W-x)
            t[y:y+ph,x:x+pw]=p[:ph,:pw]
    return t

def fill_detail(img, mask, src_box, radius=15, blur=9):
    """Farbverlauf aus der Umgebung (Inpainting) + feine Struktur aus einem sauberen Musterstück."""
    base=cv2.inpaint(img,mask,radius,cv2.INPAINT_TELEA).astype(np.float32)
    tex=make_texture(img,src_box,img.shape[:2])
    hp=tex-cv2.GaussianBlur(tex,(0,0),blur)
    a=cv2.GaussianBlur(mask.astype(np.float32)/255,(0,0),3)[...,None]
    out=img.astype(np.float32)*(1-a)+(base+hp)*a
    return np.clip(out,0,255).astype(np.uint8)

def box_mask(shape, boxes, pad=0):
    m=np.zeros(shape[:2],np.uint8)
    for x0,y0,x1,y1 in boxes: m[max(0,y0-pad):y1+pad,max(0,x0-pad):x1+pad]=255
    return m
