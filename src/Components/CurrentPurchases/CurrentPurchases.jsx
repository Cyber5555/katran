import { useNavigate } from "react-router-dom";
import "../../Css/CurrentPurchases.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPurchasesRequest } from "../../store/authReducer/currentPurchasesSlice.tsx";
import moment from "moment";
import { useTranslation } from "react-i18next";

const CurrentPurchases = () => {
  const [t, i18next] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current_purchases_data } = useSelector(
    (state) => state.currentPurchasesSlice
  );

  useEffect(() => {
    dispatch(currentPurchasesRequest({}));
  }, [dispatch]);

  return (
    <div className="CurrentPurchases">
      {current_purchases_data.map((item, index) => (
        <div
          key={index}
          className="CurrentPurchases--items"
          onClick={() => {
            localStorage.setItem("cpID", item?.id);
            navigate(
              `/${i18next.language}/profile/current-purchases-info/#${item?.random_order_id}`
            );
          }}>
          <p>
            {t("Basket.OrderNumber")} № {item?.random_order_id}
          </p>
          <div className="CurrentPurchases__buttons--parent">
            <button
              className="CurrentPurchases--button"
              style={{
                background:
                  item?.status == 1 && item?.process == 0
                    ? "#F7B731"
                    : item?.status == 1 && item?.process == 1
                    ? "#F7B731"
                    : item?.status == 1 && item?.process == 2
                    ? "#2E7BEE"
                    : item?.status == 1 && item?.process == 3
                    ? "#2E7BEE"
                    : item?.status == 2 && item?.process == 3
                    ? "#09AD95"
                    : item?.status == 0 && item?.process == 0
                    ? "#F7B731"
                    : item?.status == -1 && item?.process == 0
                    ? "red"
                    : "",
              }}
              onClick={(e) => e.preventDefault()}>
              {item?.status == 1 && item?.process == 0
                ? "hastatvac e"
                : item?.status == 1 && item?.process == 1
                ? "patrasman pulum e"
                : item?.status == 1 && item?.process == 2
                ? "araqvum e"
                : item?.status == 1 && item?.process == 3
                ? "araqvac e"
                : item?.status == 2 && item?.process == 3
                ? "avartvac e"
                : item?.status == 0 && item?.process == 0
                ? "hastatvac che"
                : item?.status == -1 && item?.process == 0
                ? "merjvac e"
                : ""}
            </button>
            <button
              className="CurrentPurchases--button last"
              onClick={(e) => e.preventDefault()}>
              Время {moment(item.created_at).format("HH:mm / DD.MM YYYY")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentPurchases;
