import ProductCatalog from "../Others/ProductCatalog";
import "../../Css/HomePage.css";
import Header from "../Header/Header";
import DownloadApp from "./DownloadApp";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import Brands from "./Brands";
import { useEffect } from "react";
import { getHomeDataRequest } from "../../store/reducer/getHomeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const dispatch = useDispatch();
  const { home_data } = useSelector((state) => state.getHomeDataSlice);
  const [t] = useTranslation("global");

  useEffect(() => {
    dispatch(getHomeDataRequest({}));
  }, [dispatch]);

  localStorage.setItem("user_type", home_data.user_type);

  return (
    <>
      <Header />
      <div className="HomePage--Container">
        <ProductCatalog />
        <DownloadApp />

        <h2 className="ProductsInMainPage--title">{t("homePage.cordial")}</h2>
        <h3 className="ProductsInMainPage--product__type">
          {t("homePage.SeafoodReadyFood")}
        </h3>

        <ProductsInMainPage
          isShow={true}
          products={home_data?.items_best_seller}
        />
        <Brands brands={home_data?.brands} />
      </div>
    </>
  );
};

export default HomePage;
