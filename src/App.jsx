import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ProductList from "./Components/ProductList/ProductList";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import ControllerPage from "./Components/Others/ControllerPage";
import LoginPopup from "./Components/LoginRegister/LoginPopup";
import NoMatch from "./Components/NoMatch/NoMatch";
import Register from "./Components/LoginRegister/Register";
import BrandSingle from "./Components/BrandSingle/BrandSingle";
import Basket from "./Components/Basket/Basket";
import PayToProducts from "./Components/Basket/PayToProducts";
import CurrentPurchases from "./Components/CurrentPurchases/CurrentPurchases";
import CurrentPurchasesInfo from "./Components/CurrentPurchases/CurrentPurchasesInfo";
import Archive from "./Components/Archive/Archive";
import ArchiveInfo from "./Components/Archive/ArchiveInfo";
import PersonalData from "./Components/PersonalData/PersonalData";
import Favorites from "./Components/Favorites/Favorites";
import Settings from "./Components/Settings/Settings";
import NewGoods from "./Components/NewGoods/NewGoods";
import BrandPage from "./Components/BrandPage/BrandPage";
import TabNavigator from "./Components/TabNavigator/TabNavigator";
import BottomSheet from "./Components/BottomSheet/BottomSheet";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Header/Navbar";
import Works from "./Components/Works/Works";
import WorksSingle from "./Components/Works/WorksSingle";
import FAQ from "./Components/FAQ/FAQ";
import { useTranslation } from "react-i18next";
import Contacts from "./Components/Contacts/Contacts";
import Blog from "./Components/Blog/Blog";
import BlogSingle from "./Components/Blog/BlogSingle";
import DynamicPages from "./Components/DynamicPages/DynamicPages";
import Search from "./Components/Search/Search";
import BurgerMenu from "./Components/Others/BurgerMenu";
import Promo from "./Components/Promo/Promo";
import useWindowSize from "./Components/useWindowSize";

function App() {
  const location = useLocation();
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const navigate = useNavigate();
  const isValidLanguage = (lang) => ["hy", "ru", "en"].includes(lang);
  const { lang } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location, i18next.language, lang, i18next, navigate]);

  useEffect(() => {
    const newLang = location.pathname?.split("/")[1];
    if (location.pathname === `/${i18next.language}/`) {
      navigate(`/${i18next.language}`);
      console.log("arajin");
    } else if (location.pathname === "/") {
      i18next.changeLanguage("hy");
      localStorage.setItem("language", "hy");
      navigate(`/`);
      console.log("erkrord");
    } else if (isValidLanguage(newLang) && newLang !== i18next.language) {
      i18next.changeLanguage(newLang);
      localStorage.setItem("language", newLang);
      console.log("errord");
    }
    // else if (newLang !== i18next.language && location.pathname !== "/") {
    //   navigate("/404");
    //   console.log(newLang);
    //   console.log(i18next.language);
    // }
  }, []);

  // useEffect(() => {
  //   // Redirect from www to non-www
  //   if (window.location.hostname.startsWith('www.')) {
  //     const newUrl = window.location.href.replace('www.', '');
  //     navigate(newUrl, { replace: true });
  //   }
  // }, [navigate]);

  return (
    <>
      <BottomSheet />
      <Navbar />
      <LoginPopup />
      <Routes>
        <Route exact path={`/:lang?`} Component={HomePage} />
        <Route path={`/:lang?/product-list/:url`} Component={ProductList} />
        <Route
          path={`/:lang?/product/:product_url`}
          Component={SingleProduct}
        />
        <Route path={`/:lang?/register/:registerType`} Component={Register} />
        <Route path={`/:lang?/brand/:brand_url`} Component={BrandSingle} />
        <Route path={`/:lang?/brand`} Component={BrandPage} />
        <Route path={`/:lang?/works`} Component={Works} />
        <Route path={`/:lang?/works/:work_url`} Component={WorksSingle} />
        <Route path={`/:lang?/faq`} Component={FAQ} />
        <Route path={`/:lang?/contact`} Component={Contacts} />
        <Route path={`/:lang?/blog`} Component={Blog} />
        <Route path={`/:lang?/blog/:blog_url`} Component={BlogSingle} />
        <Route path={`/:lang?/pages/:dynamic_url`} Component={DynamicPages} />
        <Route path={`/:lang?/search`} Component={Search} />
        <Route path={`/:lang?/promo`} Component={Promo} />

        <Route path={`/:lang?/profile/*`} Component={ControllerPage}>
          <Route path="basket" Component={Basket} />
          <Route path="pay-to-products" Component={PayToProducts} />
          <Route path="current-purchases" Component={CurrentPurchases} />
          <Route
            path="current-purchases-info"
            Component={CurrentPurchasesInfo}
          />
          <Route path="archive" Component={Archive} />
          <Route path="archive-info" Component={ArchiveInfo} />
          <Route path="personal-data" Component={PersonalData} />
          <Route path="settings" Component={Settings} />
          <Route path="new-goods" Component={NewGoods} />
          <Route path="favorites" Component={Favorites} />
        </Route>

        <Route path={"/404"} Component={NoMatch} />
        <Route path="/:lang?/*" Component={NoMatch} />
        {/* <Route path="*" Component={NoMatch} /> */}
      </Routes>
      <TabNavigator />
      {windowSize.width <= 1024 && <BurgerMenu />}
      <Footer />
    </>
  );
}

export default App;
