/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import "../../Css/SingleProduct.css";
import Dram from "../../Assets/icons/Dram1.svg";
import HeartBlack from "../../Assets/icons/HeartBlack.svg";
import ChangeCountButton from "../Others/ChangeCountButton";
import { useNumberWithDots } from "../useNumberWithDot.js";
import { useEffect, useState } from "react";
// import { addBasketRequest } from "../../store/authReducer/addBasketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteRequest } from "../../store/authReducer/removeFavoriteSlice.js";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice.js";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import HeartRed from "../../Assets/icons/HeartRed.svg";
import { changeCountEveryProduct } from "../../store/other/updateCountsSlice.js";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice.js";
import { useNavigate } from "react-router-dom";
import { removeBasketRequest } from "../../store/authReducer/removeBasketSlice.js";
import Trash from "../../Assets/icons/trash.svg";
import { useTranslation } from "react-i18next";

const BasketPopupItems = ({ setTotalPrice, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const [isFavorite, setIsFavorite] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const userToken = localStorage.getItem("userToken") || null;
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
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

  // reduce total price
  useEffect(() => {
    const totalPrice =
      basketData?.length &&
      basketData?.reduce((total, item) => {
        const itemPrice =
          item?.new_price * item?.count_user_basket ||
          item?.price * item?.count_user_basket;
        return total + itemPrice;
      }, 0);
    setTotalPrice(totalPrice);
  }, [setTotalPrice, basketData]);

  const handleCountMinus = async (item) => {
    const new_basket_data = basketData.map((product) =>
      product.id === item.id && product.count_user_basket > 1
        ? { ...product, count_user_basket: product.count_user_basket - 1 }
        : product
    );
    setBasketData(new_basket_data);
    // if (userToken) {
    //   dispatch(
    //     addBasketRequest({ itemId: item.id, count: item.count_user_basket - 1 })
    //   );
    // } else {
    localStorage.setItem("baskets", JSON.stringify(new_basket_data));
    // }
    handleChangeEveryProductCount();
  };

  const handleCountPlus = async (item) => {
    const new_basket_data = basketData.map((product) =>
      product.id === item.id && product.count_user_basket < item.count
        ? { ...product, count_user_basket: product.count_user_basket + 1 }
        : product
    );
    setBasketData(new_basket_data);
    // if (userToken) {
    //   dispatch(
    //     addBasketRequest({ itemId: item.id, count: item.count_user_basket + 1 })
    //   );
    // } else {
    localStorage.setItem("baskets", JSON.stringify(new_basket_data));
    // }
    handleChangeEveryProductCount();
  };

  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getBasketRequest({}));
  //   }
  // }, [count_every_item]);

  const toggleFavorite = async (event, item) => {
    event.stopPropagation();

    const isProductInFavorites = isFavorite.some(
      (favorite) => favorite.id === item.id
    );

    if (isProductInFavorites) {
      const fav = isFavorite.filter((favorite) => favorite.id !== item.id);
      setIsFavorite(fav);
      localStorage.setItem("favorites", JSON.stringify(fav));
      if (localStorage.getItem("userToken")) {
        await dispatch(removeFavoriteRequest({ item_id: item.id }));
      }
    } else {
      setIsFavorite([...isFavorite, item]);
      localStorage.setItem("favorites", JSON.stringify([...isFavorite, item]));
      if (localStorage.getItem("userToken")) {
        await dispatch(addFavoriteRequest({ item_id: item.id }));
      }
    }

    if (userToken) {
      await dispatch(getFavoriteRequest({}));
    }
  };

  const navigateToSingle = (e, item) => {
    navigate(`/${i18next.language}/product/${item.url}`);
    onClose(false);
    document.body.style.overflow = "auto";
  };

  const removeBasketItem = async (event, itemId) => {
    event.stopPropagation();
    const basket = basketData.filter((item) => item.id !== itemId);

    if (userToken) {
      try {
        // Dispatch remove and get actions
        await dispatch(removeBasketRequest({ item_id: itemId }));
        localStorage.setItem("baskets", JSON.stringify(basket));
      } catch (error) {
        // Handle errors if needed
        console.error("Error removing or fetching basket:", error);
      }
    } else {
      // Remove item from local state

      localStorage.setItem("baskets", JSON.stringify(basket));
    }
    handleChangeEveryProductCount();

    setBasketData(basket);
  };

  return (
    <div className="BasketPopupItems--parent">
      {basketData?.map((slide, sliderIndex) => (
        <div className="BasketPopupItems__items--parent" key={sliderIndex}>
          <div className="BasketPopupItems--items">
            <img
              src={slide?.image}
              alt={slide?.image}
              className="BasketPopupItems--images"
              onClick={(e) => navigateToSingle(e, slide)}
            />
          </div>
          <div className="BasketPopupItems__items--right-side">
            <h3
              className="BasketPopupItems__items--title"
              onClick={(e) => navigateToSingle(e, slide)}>
              {slide?.title[i18next.language]}
            </h3>

            <p className="BasketPopupItems__items--gram">
              {t("SingleProduct.UnitOfMeasurement")}{" "}
              {slide.measurement[i18next.language]}
            </p>

            <div className="BasketPopupItems__count__price">
              <div className="BasketPopupItems__count__price--right">
                <ChangeCountButton
                  count={slide.count_user_basket}
                  countMinus={() => handleCountMinus(slide)}
                  countPlus={() => handleCountPlus(slide)}
                  disabled={slide.count_user_basket == slide.count}
                  parentStyle={{
                    width: 150,
                    gap: 2,
                  }}
                />

                <img
                  src={
                    isFavorite?.some((favorite) => favorite.id === slide.id)
                      ? HeartRed
                      : HeartBlack
                  }
                  alt={
                    isFavorite?.some((favorite) => favorite.id === slide.id)
                      ? HeartRed
                      : HeartBlack
                  }
                  onClick={(event) => toggleFavorite(event, slide)}
                />
                <img
                  src={Trash}
                  alt="Trash"
                  className="ProductsInMainPage__items--favorite"
                  onClick={(event) => removeBasketItem(event, slide.id)}
                />
              </div>
              <p className="BasketPopupItems__items--price">
                {useNumberWithDots(
                  slide?.new_price
                    ? slide.new_price * slide.count_user_basket
                    : slide.price * slide.count_user_basket
                )}
                <img src={Dram} alt="Dram" />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketPopupItems;
