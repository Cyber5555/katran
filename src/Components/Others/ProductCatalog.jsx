/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../Css/ProductCatalog.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../useWindowSize.js";
import { useTranslation } from "react-i18next";
import { toggleBottomSheet } from "../../store/other/bottomSheetSlice.js";
import SubCategoryBottomSheet from "./SubCategoryBottomSheet.jsx";

// function importAll(r) {
//   return r.keys().map(r);
// }

// const images = importAll(
//   require.context("../Assets/images", false, /\.(png|jpe?g|svg)$/)
// );

const ProductCatalog = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const { home_data } = useSelector((state) => state.getHomeDataSlice);
  const [t, i18next] = useTranslation("global");
  const [itemHeight, setItemHeight] = useState(null);
  const { isOpenBottomSheet } = useSelector((state) => state.bottomSheetSlice);

  useEffect(() => {
    let width = document.querySelectorAll(".ProductCatalog_elements")[2]
      ?.offsetWidth;
    setItemHeight(width);
  }, [windowSize.width, home_data]);

  const changeLocation = (event, product) => {
    event.stopPropagation();
    if (isOpenBottomSheet && product.children.length == 0) {
      console.log(product?.children);
      navigate(`/${i18next.language}/product-list/${product.url}`);
      dispatch(
        toggleBottomSheet({
          search: false,
          isOpen: false,
        })
      );
    } else if (isOpenBottomSheet && product.children.length > 0) {
      dispatch(
        toggleBottomSheet({
          render: (
            <SubCategoryBottomSheet
              title={product.name[i18next.language]}
              children={product.children}
            />
          ),
          search: true,
          isOpen: true,
        })
      );
    }
    else {
      navigate(`/${i18next.language}/product-list/${product.url}`);
    }
  };

  return (
    <>
      <ul className="ProductCatalog_elements--parent" style={style}>
        {home_data?.catalog?.map((product, index) => (
          <li
            key={product.id}
            className="ProductCatalog_elements"
            style={{
              height: itemHeight,
              gridColumn: index == 0 ? "span 2" : "span 1",
            }}
            onClick={(event) => changeLocation(event, product)}>
            <p className="ProductCatalog_elements--title">
              {product.name[i18next.language]}
            </p>
            <img
              src={product.image}
              alt="product_image"
              className="ProductCatalog--images"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductCatalog;
