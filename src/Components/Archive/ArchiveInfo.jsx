import { useNavigate } from "react-router-dom";
import "../../Css/ArchiveInfo.css";
import ArrowBack from "../../Assets/icons/arrowBack.svg";
import Download from "../../Assets/icons/download.svg";
import Dram1 from "../../Assets/icons/Dram1.svg";
import Dram from "../../Assets/icons/Dram.svg";
import { useTranslation } from "react-i18next";
import useWindowSize from "../useWindowSize";
import { useEffect } from "react";
import { archiveInfoRequest } from "../../store/authReducer/archiveInfoSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import i18next from "i18next";

const ArchiveInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("global");
  const windowSize = useWindowSize();
  const { archive_info_data } = useSelector((state) => state.archiveInfoSlice);

  useEffect(() => {
    dispatch(archiveInfoRequest({}));
  }, [dispatch]);

  return (
    <div className="ArchiveInfo">
      <div className="ArchiveInfo--goBack__download">
        <p className="ArchiveInfo--goBack" onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="ArrowBack" style={{ marginRight: 4 }} />
          назад
        </p>
        <button
          className="ArchiveInfo__borderButton"
          style={{ padding: "9px 27px" }}>
          <img src={Download} alt="Download" style={{ marginRight: 9 }} />
          {t("Archive.SaveCopy")}
        </button>
      </div>

      <div className="ArchiveInfo__information--parent">
        <h2 className="ArchiveInfo__information--title">
          <p>{t("Archive.OrderDetails")}</p>
        </h2>
        {windowSize.width > 620 && (
          <div className="ArchiveInfo__information__first__box--title__parent">
            <p className="ArchiveInfo__information__first__box--title">
              {t("Basket.OrderNumber")}
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("Archive.OrderStatus")}
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("Archive.Date")}
            </p>
            <p></p>
            <p></p>
          </div>
        )}
        <div className="ArchiveInfo__information__first__box--item--order">
          {windowSize.width <= 620 && (
            <p className="ArchiveInfo__information__first__box--title">
              {t("Basket.OrderNumber")}
            </p>
          )}
          <p className="ArchiveInfo__information__first__box--item--order--text">
            № {archive_info_data?.archiveOrderInfo?.random_order_id}
          </p>
          {windowSize.width <= 620 && (
            <p className="ArchiveInfo__information__first__box--title">
              {t("Archive.OrderStatus")}
            </p>
          )}
          <p className="ArchiveInfo__information__first__box--item--order--text">
            {t("Archive.OrderConfirmed")}
          </p>
          {windowSize.width <= 620 && (
            <p className="ArchiveInfo__information__first__box--title">
              {t("Archive.Date")}
            </p>
          )}
          <p className="ArchiveInfo__information__first__box--item--order--text">
            {t("Archive.Time")}{" "}
            {moment(archive_info_data?.archiveOrderInfo?.created_at).format(
              "HH:mm / DD.MM YYYY"
            )}
          </p>
          {windowSize.width > 620 && (
            <>
              <p></p>
              <p></p>
            </>
          )}
        </div>
        {windowSize.width > 620 && (
          <div className="ArchiveInfo__information__first__box--title__parent">
            <p className="ArchiveInfo__information__first__box--title">
              Название товара
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("CheckedProductList.Price")}
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("CheckedProductList.Discount")}
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("CheckedProductList.Quantity")}
            </p>
            <p className="ArchiveInfo__information__first__box--title">
              {t("CheckedProductList.Sum")}
            </p>
          </div>
        )}

        <div className="ArchiveInfo__information__first__box--padding">
          {archive_info_data?.items?.map((item) => (
            <div
              className="ArchiveInfo__information__first__box--item"
              key={item}>
              {windowSize.width <= 620 && (
                <p className="ArchiveInfo__information__first__box--title">
                  Название товара
                </p>
              )}
              <p className="ArchiveInfo__information__first__box--name">
                {item?.name[i18next.language]}
              </p>
              {windowSize.width <= 620 && (
                <p className="ArchiveInfo__information__first__box--title">
                  {t("CheckedProductList.Price")}
                </p>
              )}
              <p className="ArchiveInfo__information__first__box--price">
                {item?.price} <img src={Dram1} alt="" />
              </p>
              {windowSize.width <= 620 && (
                <p className="ArchiveInfo__information__first__box--title">
                  {t("CheckedProductList.Discount")}
                </p>
              )}
              <p className="ArchiveInfo__information__first__box--sale">
                -{item?.discount}%
              </p>
              {windowSize.width <= 620 && (
                <p className="ArchiveInfo__information__first__box--title">
                  {t("CheckedProductList.Quantity")}
                </p>
              )}
              <p className="ArchiveInfo__information__first__box--count">
                {item?.count}
              </p>
              {windowSize.width <= 620 && (
                <p className="ArchiveInfo__information__first__box--title">
                  {t("CheckedProductList.Sum")}
                </p>
              )}
              <p className="ArchiveInfo__information__first__box--total__price">
                {item?.real_price} <img src={Dram1} alt="" />
              </p>
            </div>
          ))}

          <div className="ArchiveInfo__payment_methods--parent first">
            <p className="ArchiveInfo__payment_methods--title">
              {t("ArchiveInfo.DeliveryMethod")}
            </p>
            <p className="ArchiveInfo__payment_methods--text">
              {t("Basket.Pickup")}
            </p>
          </div>

          <div className="ArchiveInfo__payment_methods--parent">
            <p className="ArchiveInfo__payment_methods--title">пункт выдачи</p>
            <p className="ArchiveInfo__payment_methods--text">
              {archive_info_data?.archiveOrderInfo?.pickup_point_address}
            </p>
          </div>

          <div className="ArchiveInfo__payment_methods--parent">
            <p className="ArchiveInfo__payment_methods--title">
              {t("Basket.PaymentMethod")}
            </p>
            <p className="ArchiveInfo__payment_methods--text">
              {archive_info_data?.archiveOrderInfo?.payment_method}
            </p>
          </div>

          <div className="ArchiveInfo__payment_methods--parent">
            <p className="ArchiveInfo__payment_methods--title">Статус оплаты</p>
            <p className="ArchiveInfo__payment_methods--text">Оплачено</p>
          </div>

          <p className="ArchiveInfo__payment_methods--total__price">
            Общая сумма: {archive_info_data?.archiveOrderInfo?.total}{" "}
            <img src={Dram} alt="Dram" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchiveInfo;
