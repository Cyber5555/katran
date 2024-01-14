/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/ProductCatalog.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Subcategory = ({ handleParentClick, staticPage }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [t, i18next] = useTranslation("global");
  const navigate = useNavigate();
  const { header_footer_data } = useSelector(
    (state) => state.getHeaderDataSlice
  );

  const onSelectSub = (event, product) => {
    setSelectedIndex(product);

    if (product?.children?.length) {
      document
        .querySelectorAll(".Navbar__subcategory__product")
        .forEach((item) => {
          if (product.name[i18next.language] === item.textContent) {
            item.classList.add("hovered");
            item.children[1]?.classList.add("hovered");
          } else {
            item.classList.remove("hovered");
            item.children[1].classList.remove("hovered");
          }
        });
    } else {
      handleParentClick(event, "");
      navigate(`/${i18next.language}/product-list/${product.url}`);
    }
  };

  return (
    <div className="Navbar__subcategory">
      <ul
        className="Navbar__subcategory__product--parent"
        onClick={(event) => event.stopPropagation()}>
        {header_footer_data?.categories_all?.map((product, index) => {
          if (product.page === staticPage)
            return (
              <li
                key={index}
                className="Navbar__subcategory__product"
                onClick={(event) => onSelectSub(event, product, index)}>
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="Navbar__subcategory__product--image"
                />
                <p className="Navbar__subcategory__product--title">
                  {product?.name[i18next.language]}
                </p>
              </li>
            );
        })}
      </ul>
      {selectedIndex?.children?.length > 0 ? (
        <ul className="Navbar__subcategory__product--items">
          <h2
            className="Subcategory__rendered--title"
            onClick={(event) => {
              handleParentClick(event, "");
              navigate(
                `/${i18next.language}/product-list/${selectedIndex?.url}`
              );
            }}>
            {selectedIndex?.name[i18next.language]}
          </h2>
          <div className="Subcategory__rendered--parent">
            {selectedIndex.children.map((subItem) => (
              <li
                key={subItem.id}
                onClick={(event) => {
                  handleParentClick(event, "");
                  navigate(`/${i18next.language}/product-list/${subItem.url}`);
                }}
                className="Subcategory__rendered--items">
                {subItem.name[i18next.language]}
              </li>
            ))}
          </div>
        </ul>
      ) : null}
    </div>
  );
};

export default Subcategory;
