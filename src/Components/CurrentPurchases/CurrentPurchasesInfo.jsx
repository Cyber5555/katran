import { useNavigate } from "react-router-dom";
import "../../Css/CurrentPurchasesInfo.css";
import ArrowBack from "../../Assets/icons/arrowBack.svg";
import Download from "../../Assets/icons/download.svg";
import Dram1 from "../../Assets/icons/Dram1.svg";
import Dram from "../../Assets/icons/Dram.svg";
import { useTranslation } from "react-i18next";
import useWindowSize from "../useWindowSize.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPurchasesInfoRequest } from "../../store/authReducer/currentPurchasesInfoSlice.tsx";
import moment from "moment";

const CurrentPurchasesInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const windowSize = useWindowSize();
  const { current_purchases_info_data } = useSelector(
    (state) => state.currentPurchasesInfoSlice
  );

  useEffect(() => {
    dispatch(currentPurchasesInfoRequest({}));
  }, [dispatch]);

  return (
    <div className="CurrentPurchasesInfo">
      <div className="CurrentPurchasesInfo--goBack__download">
        <p
          className="CurrentPurchasesInfo--goBack"
          onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="ArrowBack" style={{ marginRight: 4 }} />
          назад
        </p>
        <button
          className="CurrentPurchasesInfo__borderButton"
          style={{ padding: "9px 27px" }}>
          <img src={Download} alt="Download" style={{ marginRight: 9 }} />
          {t("Archive.SaveCopy")}
        </button>
      </div>

      <div className="CurrentPurchasesInfo__information--parent">
        <h2 className="CurrentPurchasesInfo__information--title">
          <p>{t("Archive.OrderDetails")}</p>
        </h2>
        {windowSize.width > 620 && (
          <div className="CurrentPurchasesInfo__information__first__box--title__parent">
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Basket.OrderNumber")}
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Archive.OrderStatus")}
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Archive.Date")}
            </p>
            <p></p>
            <p></p>
          </div>
        )}
        <div className="CurrentPurchasesInfo__information__first__box--item--order">
          {windowSize.width <= 620 && (
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Basket.OrderNumber")}
            </p>
          )}
          <p className="CurrentPurchasesInfo__information__first__box--item--order--text">
            № {current_purchases_info_data?.activeOrderInfo?.random_order_id}
          </p>
          {windowSize.width <= 620 && (
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Archive.OrderStatus")}
            </p>
          )}
          <p className="CurrentPurchasesInfo__information__first__box--item--order--text">
            {t("Archive.OrderConfirmed")}
          </p>
          {windowSize.width <= 620 && (
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("Archive.Date")}
            </p>
          )}
          <p className="CurrentPurchasesInfo__information__first__box--item--order--text">
            {t("Archive.Time")}{" "}
            {moment(
              current_purchases_info_data?.activeOrderInfo?.created_at
            ).format("HH:mm / DD.MM YYYY")}
          </p>
          {windowSize.width > 620 && (
            <>
              <p></p>
              <p></p>
            </>
          )}
        </div>
        {windowSize.width > 620 && (
          <div className="CurrentPurchasesInfo__information__first__box--title__parent">
            <p className="CurrentPurchasesInfo__information__first__box--title">
              Название товара
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("CheckedProductList.Price")}
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("CheckedProductList.Discount")}
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("CheckedProductList.Quantity")}
            </p>
            <p className="CurrentPurchasesInfo__information__first__box--title">
              {t("CheckedProductList.Sum")}
            </p>
          </div>
        )}

        <div className="CurrentPurchasesInfo__information__first__box--padding">
          {current_purchases_info_data?.items?.map((item) => (
            <div
              className="CurrentPurchasesInfo__information__first__box--item"
              key={item}>
              {windowSize.width <= 620 && (
                <p className="CurrentPurchasesInfo__information__first__box--title">
                  Название товара
                </p>
              )}
              <p className="CurrentPurchasesInfo__information__first__box--name">
                {item?.name[i18next.language]}
              </p>
              {windowSize.width <= 620 && (
                <p className="CurrentPurchasesInfo__information__first__box--title">
                  {t("CheckedProductList.Price")}
                </p>
              )}
              <p className="CurrentPurchasesInfo__information__first__box--price">
                {item?.price} <img src={Dram1} alt="" />
              </p>
              {windowSize.width <= 620 && (
                <p className="CurrentPurchasesInfo__information__first__box--title">
                  {t("CheckedProductList.Discount")}
                </p>
              )}
              <p className="CurrentPurchasesInfo__information__first__box--sale">
                -{item?.discount}%
              </p>
              {windowSize.width <= 620 && (
                <p className="CurrentPurchasesInfo__information__first__box--title">
                  {t("CheckedProductList.Quantity")}
                </p>
              )}
              <p className="CurrentPurchasesInfo__information__first__box--count">
                {item?.count}
              </p>
              {windowSize.width <= 620 && (
                <p className="CurrentPurchasesInfo__information__first__box--title">
                  {t("CheckedProductList.Sum")}
                </p>
              )}
              <p className="CurrentPurchasesInfo__information__first__box--total__price">
                {item?.real_price} <img src={Dram1} alt="" />
              </p>
            </div>
          ))}

          <div className="CurrentPurchasesInfo__payment_methods--parent first">
            <p className="CurrentPurchasesInfo__payment_methods--title">
              {t("ArchiveInfo.DeliveryMethod")}
            </p>
            <p className="CurrentPurchasesInfo__payment_methods--text">
              {t("Basket.Pickup")}
            </p>
          </div>

          <div className="CurrentPurchasesInfo__payment_methods--parent">
            <p className="CurrentPurchasesInfo__payment_methods--title">
              пункт выдачи
            </p>
            <p className="CurrentPurchasesInfo__payment_methods--text">
              {
                current_purchases_info_data?.activeOrderInfo
                  ?.pickup_point_address
              }
            </p>
          </div>

          <div className="CurrentPurchasesInfo__payment_methods--parent">
            <p className="CurrentPurchasesInfo__payment_methods--title">
              {t("Basket.PaymentMethod")}
            </p>
            <p className="CurrentPurchasesInfo__payment_methods--text">
              {current_purchases_info_data?.activeOrderInfo?.payment_method}
            </p>
          </div>

          <div className="CurrentPurchasesInfo__payment_methods--parent">
            <p className="CurrentPurchasesInfo__payment_methods--title">
              Статус оплаты
            </p>
            <p className="CurrentPurchasesInfo__payment_methods--text">
              {current_purchases_info_data?.activeOrderInfo?.status == 1 &&
              current_purchases_info_data?.activeOrderInfo?.process == 0
                ? "hastatvac e"
                : current_purchases_info_data?.activeOrderInfo?.status == 1 &&
                  current_purchases_info_data?.activeOrderInfo?.process == 1
                ? "patrasman pulum e"
                : current_purchases_info_data?.activeOrderInfo?.status == 1 &&
                  current_purchases_info_data?.activeOrderInfo?.process == 2
                ? "araqvum e"
                : current_purchases_info_data?.activeOrderInfo?.status == 1 &&
                  current_purchases_info_data?.activeOrderInfo?.process == 3
                ? "araqvac e"
                : current_purchases_info_data?.activeOrderInfo?.status == 0 &&
                  current_purchases_info_data?.activeOrderInfo?.process == 0
                ? "hastatvac che"
                : ""}
            </p>
          </div>

          <p className="CurrentPurchasesInfo__payment_methods--total__price">
            Общая сумма: {current_purchases_info_data?.activeOrderInfo?.total}{" "}
            <img src={Dram} alt="Dram" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentPurchasesInfo;
