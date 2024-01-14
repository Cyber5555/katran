import React, { useEffect } from "react";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import { useDispatch, useSelector } from "react-redux";
import { promoRequest } from "../../store/reducer/promoSlice.tsx";
import "../../Css/Promo.css";
import { useTranslation } from "react-i18next";

const Promo = () => {
  const dispatch = useDispatch();
  const { promo_data } = useSelector((state) => state.promoSlice);
  const [t, i18next] = useTranslation("global");

  useEffect(() => {
    dispatch(promoRequest({}));
  }, [dispatch]);

  return (
    <div className="Promo">
      <h2 className="Promo--title">
        {promo_data?.current_page?.title[i18next.language]}
      </h2>
      <ProductsInMainPage products={promo_data?.items} />
    </div>
  );
};

export default Promo;
