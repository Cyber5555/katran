/* eslint-disable react-hooks/rules-of-hooks */
import "../../Css/HeaderSearch.css";
import SearchIcon from "../../Assets/icons/SearchIcon.svg";
import HeartRed from "../../Assets/icons/HeartRed.svg";
import Dram from "../../Assets/icons/Dram1.svg";
import HeartBlack from "../../Assets/icons/HeartBlack.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRequest } from "../../store/reducer/searchSlice.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeFavoriteRequest } from "../../store/authReducer/removeFavoriteSlice.js";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice.js";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import { useNumberWithDots } from "../useNumberWithDot.js";
import BasketIcon from "../../Assets/icons/BasketIcon.svg";
import { changeCountEveryProduct } from "../../store/other/updateCountsSlice.js";
import { changeSearchValue } from "../../store/other/searchInputSlice.js";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice.js";
import useWindowSize from "../useWindowSize.js";

const HeaderSearch = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.searchInputSlice);
  const { search_data } = useSelector((state) => state.searchSlice);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const [isFavorite, setIsFavorite] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const userToken = localStorage.getItem("userToken") || null;
  const [isBasket, setIsBasket] = useState([]);

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

  const handleSearch = (event) => {
    const { value } = event.target;

    dispatch(changeSearchValue(value));
    if (value.trim().length >= 3) {
      dispatch(searchRequest(value));
    }
  };

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

  const { basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );

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
  }, [auth_favorites_data, basketData, dispatch]);

  useEffect(() => {
    let storedBaskets = localStorage.getItem("baskets");

    try {
      storedBaskets = JSON.parse(storedBaskets) || [];
    } catch (error) {
      console.error("Error parsing baskets from localStorage:", error);
      storedBaskets = [];
    }

    // let bas = userToken ? auth_basket_data : storedBaskets;

    setBasketData(storedBaskets);
  }, [
    userToken,
    // auth_basket_data,
    basket_count,
    count_every_item,
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

  const navigateToSingle = (e, item) => {
    navigate(`/${i18next.language}/product/${item.url}`);
  };

  return (
    <div className="HeaderSearch--parent">
      <div className="HeaderSearch--search__parent">
        <input
          type="search"
          className="HeaderSearch--input"
          value={searchValue}
          onChange={handleSearch}
          aria-labelledby="search"
        />
        <img src={SearchIcon} alt="SearchIcon" className="HeaderSearch--icon" />
      </div>
      <div
        className={`HeaderSearch--render__response ${
          searchValue.trim().length >= 3 ? "opened" : ""
        }`}>
        <div className="HeaderSearch--render__response--scroll">
          {search_data?.items?.map((item, index) => (
            <div className="HeaderSearch__items--parent" key={index}>
              <div className="HeaderSearch--items">
                <img
                  src={item?.image}
                  alt={item?.image}
                  className="HeaderSearch--images"
                  onClick={(e) => navigateToSingle(e, item)}
                />
              </div>
              <div className="HeaderSearch__items--right-side">
                <div className="HeaderSearch__items__title--parent">
                  <h3
                    className="HeaderSearch__items--title"
                    onClick={(e) => navigateToSingle(e, item)}>
                    {item?.title[i18next.language]}
                  </h3>
                  <img
                    src={
                      isFavorite?.some((favorite) => favorite.id === item.id)
                        ? HeartRed
                        : HeartBlack
                    }
                    alt={
                      isFavorite?.some((favorite) => favorite.id === item.id)
                        ? HeartRed
                        : HeartBlack
                    }
                    style={{ cursor: "pointer" }}
                    onClick={(event) => toggleFavorite(event, item)}
                  />
                </div>
                <p className="HeaderSearch__items--gram">
                  {item.measurement[i18next.language] && (
                    <>
                      {t("SingleProduct.UnitOfMeasurement")}{" "}
                      {item.measurement[i18next.language]}
                    </>
                  )}
                </p>

                <div className="HeaderSearch__count__price">
                  <p className="HeaderSearch__items--price">
                    {useNumberWithDots(
                      item?.new_price
                        ? item.new_price * item.count_user_basket
                        : item.price * item.count_user_basket
                    )}
                    <img src={Dram} alt="Dram" />
                  </p>
                  <img
                    src={BasketIcon}
                    alt="BasketIcon"
                    onClick={(event) => addToBasket(event, item)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to={`${i18next.language}/search`}
          className="HeaderSearch--show__more">
          show more
        </Link>
      </div>
    </div>
  );
};

export default HeaderSearch;
