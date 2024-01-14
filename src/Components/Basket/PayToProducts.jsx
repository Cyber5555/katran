import "../../Css/PayToProducts.css";
import CheckedProductList from "../Others/CheckedProductList";
import Dram from "../../Assets/icons/Dram.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderRequest } from "../../store/authReducer/creteOrderSlice.tsx";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice.js";
import { useNumberWithDots } from "../useNumberWithDot";
import { useTranslation } from "react-i18next";

const PayToProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const [totalPrice, setTotalPrice] = useState("");
  const {
    user_name,
    phone,
    deliver_type,
    pickup_point_id,
    payment_method,
    sum,
    real_sum,
    city_id,
    address,
    description,
    entrance,
    floor,
    intercom,
    date_id,
  } = useSelector((state) => state.basketDataSlice);

  const handleBuyOrder = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      createOrderRequest({
        name: user_name,
        phone,
        deliver_type,
        pickup_point_id,
        payment_method,
        sum,
        real_sum,
        city_id,
        address,
        description,
        entrance,
        floor,
        intercom,
        date_id,
      })
    ).then((result) => {
      if (result.payload?.success)
        navigate(`/${i18next.language}/profile/current-purchases`);
      // dispatch(getBasketRequest({}));
      localStorage.removeItem("baskets");
    });
  };

  return (
    <form className="PayToProducts" onSubmit={handleBuyOrder}>
      <CheckedProductList
        count={false}
        title={"Заказ № 00000041"}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
      />

      <div className="PayToProducts__main--parent">
        <div className="PayToProducts--parent">
          <p className="PayToProducts--title">{t("Basket.NameSurname")}</p>
          <p className="PayToProducts--text">{user_name}</p>
        </div>
        <div className="PayToProducts--parent">
          <p className="PayToProducts--title">{t("Basket.Phone")}</p>
          <p className="PayToProducts--text">{phone}</p>
        </div>
        <div className="PayToProducts--parent">
          <p className="PayToProducts--title">
            {t("ArchiveInfo.DeliveryMethod")}
          </p>
          <p className="PayToProducts--text">
            {deliver_type === "take"
              ? t("Basket.Pickup")
              : t("Basket.Delivery")}
          </p>
        </div>
        <div className="PayToProducts--parent">
          <p className="PayToProducts--title">{t("Basket.Pick-upPoint")}</p>
          <p className="PayToProducts--text">{address[i18next.language]}</p>
        </div>
        <div className="PayToProducts--parent">
          <p className="PayToProducts--title"> {t("Basket.PaymentMethod")}</p>
          <p className="PayToProducts--text">{payment_method}</p>
        </div>
        <div className="PayToProducts--parent last">
          <p className="PayToProducts--title">{t("Basket.PaymentAmount")} </p>
          <p className="PayToProducts--text">
            {useNumberWithDots(totalPrice)} <img src={Dram} alt="Dram" />
          </p>
        </div>

        <div className="PayToProducts__buttons--parent">
          <button
            className="PayToProducts__borderButton"
            onClick={() => navigate(`/${i18next.language}/profile/basket`)}>
            {t("Basket.Edit")}
          </button>
          <button
            className="PayToProducts__borderButton"
            type="submit"
            onClick={(e) => e.stopPropagation()}>
            {t("Basket.Pay")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PayToProducts;
