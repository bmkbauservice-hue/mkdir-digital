import { HashRouter, Route, Routes } from "react-router";
import { SiteLayout } from "../../components/layout/SiteLayout";
import { HomePage } from "../../pages/Home/HomePage";
import { ProductsPage } from "../../pages/Products/ProductsPage";
import { ProductDetailPage } from "../../pages/ProductDetail/ProductDetailPage";
import { ConfiguratorPage } from "../../pages/Configurator/ConfiguratorPage";
import { PromotionsPage } from "../../pages/Promotions/PromotionsPage";
import { ExclusivePage } from "../../pages/Exclusive/ExclusivePage";
import { AccessoriesPage } from "../../pages/Accessories/AccessoriesPage";
import { LoginPage } from "../../pages/Login/LoginPage";
import { AccountPage } from "../../pages/Account/AccountPage";
import { CheckoutPage } from "../../pages/Checkout/CheckoutPage";
import { NotFoundPage } from "../../pages/NotFound/NotFoundPage";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="produkte" element={<ProductsPage />} />
          <Route path="produkte/:slug" element={<ProductDetailPage />} />
          <Route path="konfigurator" element={<ConfiguratorPage />} />
          <Route path="aktionen" element={<PromotionsPage />} />
          <Route path="exclusive" element={<ExclusivePage />} />
          <Route path="zubehoer" element={<AccessoriesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="konto" element={<AccountPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
