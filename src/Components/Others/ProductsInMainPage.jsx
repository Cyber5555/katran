/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import "../../Css/ProductsInMainPage.css";
import BasketIcon from "../../Assets/icons/BasketIcon.svg";
import BasketIconDark from "../../Assets/icons/BasketIconDark.svg";
import HeartBlack from "../../Assets/icons/HeartBlack.svg";
import HeartRed from "../../Assets/icons/HeartRed.svg";
import Trash from "../../Assets/icons/trash.svg";
import NewIcon from "../../Assets/icons/NewIcon.svg";
import Dram from "../../Assets/icons/Dram1.svg";
import SaleIcon from "../../Assets/icons/saleIcon.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChangeCountButton from "./ChangeCountButton";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice.js";
import { removeFavoriteRequest } from "../../store/authReducer/removeFavoriteSlice.js";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import { useNumberWithDots } from "../useNumberWithDot.js";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice.js";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice.js";
import {
  basketCount,
  changeCountEveryProduct,
  favoriteCount,
} from "../../store/other/updateCountsSlice.js";
import { useTranslation } from "react-i18next";
import useWindowSize from "../useWindowSize.js";

const ProductsInMainPage = ({ products, onRemoveFavorite }) => {
  const windowSize = useWindowSize();
  const [isOpenCountChanger, setIsOpenCountChanger] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [isBasket, setIsBasket] = useState([]);
  const userToken = localStorage.getItem("userToken") || null;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const storedFavorites = localStorage.getItem("favorites") || "[]";
  const storedBasket = localStorage.getItem("baskets") || "[]";
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  const { favorite_count, basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const navbarFavoriteEffect = document.querySelector(
    ".Navbar__right__side__favorite"
  );
  const tabBarFavoriteEffect = document.querySelector(
    ".TabNavigator__right__side__favorite"
  );
  const navbarBasketEffect = document.querySelector(
    ".Navbar__right__side__basket"
  );
  const tabBarBasketEffect = document.querySelector(
    ".TabNavigator__right__side__basket"
  );
  const [t, i18next] = useTranslation("global");
  const handleChangeEveryProductCount = () => {
    let storedBaskets = localStorage.getItem("baskets");

    try {
      storedBaskets = JSON.parse(storedBaskets) || [];
    } catch (error) {
      console.error("Error parsing baskets from localStorage:", error);
      storedBaskets = [];
    }

    // let bas = userToken ? auth_basket_data : storedBaskets;

    const totalCount = storedBaskets.reduce(
      (item, index) => item + index.count_user_basket,
      0
    );

    dispatch(changeCountEveryProduct(totalCount));
  };

  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getBasketRequest({}));
  //   }
  // }, [dispatch, userToken, count_every_item]);

  useEffect(() => {
    setIsFavorite(() => {
      if (localStorage.getItem("userToken")) {
        return auth_favorites_data.map((item) => item);
      }

      const favoritesFromLocalStorage = localStorage.getItem("favorites");

      try {
        const parsedFavorites = JSON.parse(favoritesFromLocalStorage);

        if (Array.isArray(parsedFavorites)) {
          return parsedFavorites;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    });
    setProductData(products);
  }, [auth_favorites_data, products, dispatch, favorite_count]);

  useEffect(() => {
    setIsBasket(() => {
      // if (userToken) {
      //   return auth_basket_data.map((item) => item);
      // } else {
      const basketsFromLocalStorage = localStorage.getItem("baskets");

      const parsedBaskets = JSON.parse(basketsFromLocalStorage);
      try {
        if (Array.isArray(parsedBaskets)) {
          return parsedBaskets;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
      // }
    });

    setProductData(products);
  }, [
    // auth_basket_data,
    products,
    dispatch,
    basket_count,
    count_every_item,
    userToken,
  ]);

  const toggleFavorite = async (event, item) => {
    event.stopPropagation();

    const isProductInFavorites = isFavorite.some(
      (favorite) => favorite.id === item.id
    );

    try {
      if (isProductInFavorites) {
        const fav = isFavorite.filter((favorite) => favorite.id !== item.id);
        setIsFavorite(fav);
        localStorage.setItem("favorites", JSON.stringify(fav));
        userToken &&
          (await dispatch(removeFavoriteRequest({ item_id: item.id })));
      } else {
        setIsFavorite([...isFavorite, item]);
        localStorage.setItem(
          "favorites",
          JSON.stringify([...isFavorite, item])
        );
        userToken && (await dispatch(addFavoriteRequest({ item_id: item.id })));
      }
      windowSize.width <= 1024
        ? addShadowEffectFavorite(tabBarFavoriteEffect)
        : addShadowEffectFavorite(navbarFavoriteEffect);
      userToken && (await dispatch(getFavoriteRequest({})));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const addToBasket = async (event, item) => {
    event.stopPropagation();
    handleChangeEveryProductCount();
    const isProductInBasket = isBasket.some(
      (basketItem) => basketItem.id === item.id
    );
    try {
      if (!isProductInBasket) {
        setIsBasket((prevBasket) => {
          const updatedBasket = [...prevBasket, item];
          if (userToken) {
            dispatch(
              addBasketRequest({
                itemId: item.id,
                count: item.count_user_basket,
              })
            );
          }
          // .then((res) => {
          //   if (res.payload.success) {
          //     dispatch(getBasketRequest({}));
          //   }
          // });
          // } else {
          localStorage.setItem("baskets", JSON.stringify(updatedBasket));
          // }
          return updatedBasket;
        });
      } else {
        setIsBasket((prevBasket) => {
          const updatedBasket = prevBasket.map((basketItem) =>
            basketItem.id === item.id
              ? {
                  ...basketItem,
                  count_user_basket: item.count_user_basket,
                }
              : basketItem
          );
          if (userToken) {
            dispatch(
              addBasketRequest({
                itemId: item.id,
                count: item.count_user_basket,
              })
            );
          }
          // } else {
          localStorage.setItem("baskets", JSON.stringify(updatedBasket));
          // }
          return updatedBasket;
        });
      }
      windowSize.width <= 1024
        ? addShadowEffectBasket(tabBarBasketEffect)
        : addShadowEffectBasket(navbarBasketEffect);
      handleChangeEveryProductCount();
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  };

  const openCountChanger = (event, item_id) => {
    event.stopPropagation();
    setIsOpenCountChanger(item_id);
  };

  const closeCountChanger = (e) => {
    e.stopPropagation();
    if (e.target.className !== "ProductsInMainPage__items__contents") {
      setIsOpenCountChanger(false);
    }
  };

  const handleCountMinus = (item) => {
    setProductData((prevState) =>
      prevState.map((product) =>
        product.id === item.id && product.count_user_basket > 1
          ? { ...product, count_user_basket: product.count_user_basket - 1 }
          : product
      )
    );
  };

  const handleCountPlus = (item) => {
    setProductData((prevState) =>
      prevState.map((product) =>
        product.id === item.id && product.count_user_basket < item.count
          ? { ...product, count_user_basket: product.count_user_basket + 1 }
          : product
      )
    );
  };

  useEffect(() => {
    if (userToken || storedBasket) {
      // const baskets = userToken
      //   ? Math.min(auth_basket_data.length, 99)
      //   : JSON.parse(storedBasket)?.length || 0;
      const baskets = JSON.parse(storedBasket)?.length || 0;
      dispatch(basketCount({ baskets }));
    }
  }, [
    // auth_basket_data?.length,
    dispatch,
    storedBasket,
    userToken,
    basket_count,
    count_every_item,
  ]);

  useEffect(() => {
    if (userToken || storedFavorites) {
      const favorite = userToken
        ? Math.min(auth_favorites_data?.length, 99)
        : JSON.parse(storedFavorites)?.length || 0;
      dispatch(favoriteCount({ favorite }));
    }
  }, [
    auth_favorites_data?.length,
    dispatch,
    storedFavorites,
    userToken,
    favorite_count,
  ]);

  const addShadowEffectBasket = (element) => {
    if (element) {
      element.classList.add("shadow");
      setTimeout(() => {
        element.classList.remove("shadow");
      }, 2000);
    }
  };

  const addShadowEffectFavorite = (element) => {
    if (element) {
      element.classList.add("shadow");
      setTimeout(() => {
        element.classList.remove("shadow");
      }, 2000);
    }
  };

  return (
    <div className="ProductsInMainPage__items__renderer--parent">
      {productData?.map((product, index) => (
        <div
          className="ProductsInMainPage__items--parent"
          key={index}
          onClick={() => {
            navigate(`/${i18next.language}/product/${product.url}`);
          }}>
          <div className="ProductsInMainPage__items--top__content">
            <div className="ProductsInMainPage__items--new--parent--all">
              {product.new === 1 && (
                <div className="ProductsInMainPage__items--new--parent">
                  <img src={NewIcon} alt="NewIcon" />
                  <p className="ProductsInMainPage__items--new--text">
                    {t("ProductsInMainPage.New")}
                  </p>
                </div>
              )}
              {product.new_price && (
                <div className="ProductsInMainPage__sale--icon__parent">
                  <img src={SaleIcon} alt="SaleIcon" />
                  <p className="ProductsInMainPage__sale--icon__text">
                    - {product.percent}%
                  </p>
                </div>
              )}
            </div>
            {location.pathname === `/${i18next.language}/profile/favorites` ? (
              <img
                src={Trash}
                alt="Trash"
                className="ProductsInMainPage__items--favorite"
                onClick={(event) => onRemoveFavorite(event, product.id)}
              />
            ) : (
              <img
                src={
                  isFavorite?.some((favorite) => favorite.id === product.id)
                    ? HeartRed
                    : HeartBlack
                }
                alt={
                  isFavorite?.some((favorite) => favorite.id === product.id)
                    ? HeartRed
                    : HeartBlack
                }
                className="ProductsInMainPage__items--favorite"
                onClick={(event) => toggleFavorite(event, product)}
              />
            )}
          </div>
          <div className="ProductsInMainPage__items--image__parent">
            <img
              src={product.image}
              alt="Product_Image"
              className="ProductsInMainPage__items--image"
              loading="lazy"
            />
          </div>
          <div
            className={
              isOpenCountChanger === product.id
                ? "ProductsInMainPage__items__contents active"
                : "ProductsInMainPage__items__contents"
            }
            onMouseLeave={closeCountChanger}
            onClick={(e) => e.stopPropagation()}>
            <h3
              className="ProductsInMainPage__items--title"
              onClick={() =>
                navigate(`/${i18next.language}/product/${product.url}`)
              }>
              {product?.title && product?.title[i18next.language]}
            </h3>
            <p className="ProductsInMainPage__items--measurement">
              {product?.measurement[i18next.language] &&
                t("SingleProduct.UnitOfMeasurement")}{" "}
              {product?.measurement[i18next.language]}
            </p>

            <p className="ProductsInMainPage__items--old__price">
              {useNumberWithDots(
                localStorage.getItem("user_type") == 2
                  ? product.company_new_price > 0
                    ? product.company_price
                    : product.price > 0
                    ? product.price
                    : ""
                  : product.percent > 0
                  ? product.price
                  : ""
              )}
              {product?.percent > 0 || product?.company_percent > 0 ? "֏" : ""}
            </p>

            {product?.count > 0 ? (
              <div className="ProductsInMainPage__items--price__parent">
                <p className="ProductsInMainPage__items--new__price">
                  {useNumberWithDots(
                    localStorage.getItem("user_type") == 2
                      ? product.company_new_price > 0
                        ? product.company_new_price
                        : product.company_price > 0
                        ? product.company_price
                        : product.new_price > 0
                        ? product.new_price
                        : product.price > 0
                        ? product.price
                        : ""
                      : product.new_price > 0
                      ? product.new_price
                      : product.price
                  )}
                  <img src={Dram} alt="Dram" />
                </p>
                {isOpenCountChanger !== product.id && (
                  <img
                    src={
                      product.count_user_basket > 1
                        ? BasketIconDark
                        : BasketIcon
                    }
                    alt="BasketIcon"
                    className="ProductsInMainPage__items--basket"
                    onClick={(event) => openCountChanger(event, product.id)}
                  />
                )}
              </div>
            ) : (
              <p className="ProductsInMainPage__items--notFound">
                {t("ProductsInMainPage.NotAvailable")}
              </p>
            )}

            <div
              className={
                isOpenCountChanger === product.id
                  ? "ProductsInMainPage__countChanger active"
                  : "ProductsInMainPage__countChanger"
              }>
              <ChangeCountButton
                count={product.count_user_basket}
                countMinus={() => handleCountMinus(product)}
                countPlus={() => handleCountPlus(product)}
                disabled={product.count_user_basket === product.count}
                parentStyle={{
                  width: "80%",
                  gap: 2,
                }}
              />

              <img
                src={BasketIcon}
                alt="BasketIcon"
                className="ProductsInMainPage__items--basket"
                onClick={(event) => addToBasket(event, product)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsInMainPage;
