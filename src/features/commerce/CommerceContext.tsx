import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type CardDesign = {
  productId: string;
  productName: string;
  material: string;
  finish: string;
  quantity: number;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  accent: string;
  price: number;
};

type CommerceContextValue = {
  design: CardDesign | null;
  setDesign: (design: CardDesign) => void;
  clearDesign: () => void;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);
const storageKey = "mkdir-configured-product";

export function CommerceProvider({ children }: PropsWithChildren) {
  const [design, setDesignState] = useState<CardDesign | null>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as CardDesign) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (design) localStorage.setItem(storageKey, JSON.stringify(design));
    else localStorage.removeItem(storageKey);
  }, [design]);

  const value = useMemo(
    () => ({
      design,
      setDesign: setDesignState,
      clearDesign: () => setDesignState(null),
    }),
    [design],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used inside CommerceProvider");
  return context;
}
