/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "../../Css/BasketPopup.css";
import CloseIcon from "../../Assets/icons/CloseIcon.svg";
import Dram from "../../Assets/icons/Dram.svg";
import BasketPopupItems from "./BasketPopupItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice.js";
import { useNumberWithDots } from "../useNumberWithDot.js";
import { useTranslation } from "react-i18next";

const BasketPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const [totalPrice, setTotalPrice] = useState(0);
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
  const [basketItems, setBasketItems] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const { basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );

  useEffect(() => {
    let storedBaskets = localStorage.getItem("baskets");

    try {
      storedBaskets = JSON.parse(storedBaskets) || [];
    } catch (error) {
      console.error("Error parsing baskets from localStorage:", error);
      storedBaskets = [];
    }

    // let bas = userToken ? auth_basket_data : storedBaskets;
    setBasketItems(storedBaskets);
  }, [
    userToken,
    //  auth_basket_data,
    basket_count,
    count_every_item,
  ]);

  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getBasketRequest({}));
  //   }
  // }, [dispatch, userToken]);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  return (
    <section
      className="BasketPopup--parent"
      onClick={() => {
        onClose(false);
        document.body.style.overflow = "auto";
      }}
      style={{ display: isOpen ? "block" : "none" }}>
      <aside
        className="BasketPopup--aside"
        onClick={(e) => e.stopPropagation()}>
        <div className="BasketPopup__header">
          <h2 className="BasketPopup--title">{t("BasketPopup.Basket")}</h2>
          <button
            className="BasketPopup__close--button"
            onClick={() => {
              document.body.style.overflow = "auto";
              onClose(false);
            }}>
            <img src={CloseIcon} alt="CloseIcon" />
            {t("BasketPopup.Close")}
          </button>
        </div>

        <div className="BasketPopup__count__price--parent">
          <p className="BasketPopup__count__price--text">
            {t("BasketPopup.ThereAreItemsInYourCartWorth1")}{" "}
            {basketItems?.length}{" "}
            {/* {t("BasketPopup.ThereAreItemsInYourCartWorth2")}{" "} */}
          </p>

          {/* <p className="BasketPopup__start__price">
            {useNumberWithDots(totalPrice)} <img src={Dram} alt="Dram" />
          </p> */}
        </div>
        <BasketPopupItems setTotalPrice={setTotalPrice} onClose={onClose} />
        {totalPrice > 0 && (
          <div className="BasketPopup__total--parent">
            <div>
              <span>{t("Basket.Total")}</span>
              <span>
                {useNumberWithDots(totalPrice)} <img src={Dram} alt="Dram" />
              </span>
            </div>
            {/*<div>*/}
            {/*  <span>Скидка</span>*/}
            {/*  <span>-{useNumberWithDots(totalSalePercent)}%</span>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <span>итого</span>*/}
            {/*  <span>*/}
            {/*    3.600 <img src={Dram} alt="Dram" />*/}
            {/*  </span>*/}
            {/*</div>*/}
            <button
              className="BasketPopup__borderButton"
              onClick={() => {
                navigate(`/${i18next.language}/profile/basket`);

                onClose(false);
                document.body.style.overflow = "auto";
              }}>
              {t("BasketPopup.Order")}
            </button>
          </div>
        )}
      </aside>
    </section>
  );
};

export default BasketPopup;
