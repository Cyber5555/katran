import { useNavigate } from "react-router-dom";
import "../../Css/Archive.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { archiveRequest } from "../../store/authReducer/archiveSlice.tsx";
import moment from "moment";

const Archive = () => {
  const [t, i18next] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { archive_data } = useSelector((state) => state.archiveSlice);

  useEffect(() => {
    dispatch(archiveRequest({}));
  }, [dispatch]);

  return (
    <div className="Archive">
      {archive_data?.map((item, index) => (
        <div
          key={index}
          className="Archive--items"
          onClick={() => {
            localStorage.setItem("cpID", item?.id);
            navigate(
              `/${i18next.language}/profile/archive-info/#${item?.random_order_id}`
            );
          }}>
          <p>
            {t("Basket.OrderNumber")} № {item?.random_order_id}
          </p>
          <div className="CurrentPurchases__buttons--parent">
            <button
              className="Archive--button"
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

                // index === 0 ? "#09AD95" : index === 1 ? "#2E7BEE" : "#F7B731",
              }}>
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
            <button className="Archive--button last">
              Время {moment(item.created_at).format("HH:mm / DD.MM YYYY")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Archive;
