import React, { useEffect } from "react";
import "../../Css/Works.css";
import { useDispatch, useSelector } from "react-redux";
import { getWorksRequest } from "../../store/reducer/getWorksSlice.tsx";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const Works = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const { works_data } = useSelector((state) => state.getWorksSlice);

  useEffect(() => {
    dispatch(getWorksRequest({}));
  }, [dispatch]);

  return (
    <div className="Works--Container">
      <h2 className="Works--title">
        {works_data?.current_page?.title[i18next.language]}
      </h2>
      <React.Fragment>
        {works_data?.works?.map((work, index) => (
          <div className="Works__items" key={index}>
            <h3 className="Works__items--title">
              {work?.title[i18next.language]}
            </h3>
            <div className="Works__items--time__more--parent">
              <div className="Works__items--time--parent">
                <div className="Works__items--work--time--parent">
                  <p className="Works__items--work--time--title">
                    Рабочее время
                  </p>
                  <p className="Works__items--work--time">09:00 - 18:00</p>
                </div>
                <div className="Works__items--work--time--parent">
                  <p className="Works__items--work--time--title">Зарплата</p>
                  <p className="Works__items--work--time">09:00 - 18:00</p>
                </div>
              </div>
              <button
                className="Works__borderButton"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${i18next.language}/works/${work.url}`);
                }}>
                {/* {t("BasketPopup.Order")} */}
                Подробнее
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __style: {},
                __html: DOMPurify.sanitize(work?.short[i18next.language], {
                  ALLOWED_TAGS: [
                    "p",
                    "span",
                    "strong",
                    "em",
                    "b",
                    "u",
                    "i",
                    "ol",
                    "ul",
                    "li",
                    "br",
                    "h1",
                    "h2",
                    "h3",
                  ],
                  ALLOWED_ATTR: ["style"],
                  FORBID_TAGS: ["style"],
                  FORBID_ATTR: ["style"],
                }),
              }}
            />
          </div>
        ))}
      </React.Fragment>
    </div>
  );
};

export default Works;
