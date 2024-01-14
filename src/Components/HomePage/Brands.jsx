/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "../../Css/Brands.css";
import { useTranslation } from "react-i18next";

const Brands = ({ brands, style }) => {
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  return (
    <div className="Brands--parent" style={style}>
      <h2 className="Brands--title">{t("Brands.Brands")}</h2>
      <div className="Brands__rendered--parent">
        {brands?.map((brand) => (
          <div
            className="Brands--items"
            key={brand.id}
            onClick={() => navigate(`/${i18next.language}/brand/${brand.url}`)}>
            <div className="Brands__items--image--parent">
              <img
                src={brand.image}
                alt={brand.image}
                className="Brands__items--image"
              />
            </div>
            <h3 className="Brands__items--title">
              {brand.title[i18next.language]}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
