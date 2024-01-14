import "../../Css/BrandSingle.css";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataBrandSingleRequest } from "../../store/reducer/getDataBrandSingleSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BrandSingle = () => {
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const { brand_url } = useParams();
  const { single_brand_data } = useSelector(
    (state) => state.getDataBrandSingleSlice
  );

  useEffect(() => {
    dispatch(getDataBrandSingleRequest({ brand_url: brand_url }));
  }, [dispatch, brand_url]);

  return (
    <div className="Brand__container">
      <div className="Brand--cover__and__logo">
        <img
          src={single_brand_data?.brand?.image_cover}
          alt="Cover"
          className="Brand--cover"
        />
        <img
          src={single_brand_data?.brand?.image}
          alt="Logo"
          className="Brand--logo"
        />
      </div>
      <h2 className="Brand__descriptions--title">
        {single_brand_data?.brand?.title[i18next.language]}
      </h2>
      <p className="Brand__descriptions">
        {single_brand_data?.brand?.description[i18next.language]}
      </p>
      <ProductsInMainPage products={single_brand_data?.brand_items} />
    </div>
  );
};

export default BrandSingle;
