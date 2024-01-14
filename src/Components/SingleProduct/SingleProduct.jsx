/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../Css/SingleProduct.css";
import Dram from "../../Assets/icons/Dram1.svg";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import ChangeCountButton from "../Others/ChangeCountButton";
import BasketIcon from "../../Assets/icons/BasketIcon.svg";
import HeartBlack from "../../Assets/icons/HeartBlack.svg";
import ArrowBackBig from "../../Assets/icons/arrowBackBig.svg";
import HeartRed from "../../Assets/icons/HeartRed.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProductRequest } from "../../store/reducer/getSingleProductSlice";
import ChangeCountButtonFloating from "../Others/ChangeCountButtonFloating";
import { useNavigate, useParams } from "react-router-dom";
import { useNumberWithDots } from "../useNumberWithDot";
import { removeFavoriteRequest } from "../../store/authReducer/removeFavoriteSlice.js";
import { addFavoriteRequest } from "../../store/authReducer/addFavoriteSlice.js";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice.js";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice.js";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import { changeCountEveryProduct } from "../../store/other/updateCountsSlice.js";
import useWindowSize from "../useWindowSize.js";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [image, setImage] = useState("");
  const [count, setCount] = useState(1);
  const { product_url } = useParams();
  const [isFavorite, setIsFavorite] = useState([]);
  const [isBasket, setIsBasket] = useState([]);
  const userToken = localStorage.getItem("userToken");
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  const { basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const { single_product } = useSelector(
    (state) => state.getSingleProductSlice
  );
  const [t, i18next] = useTranslation("global");

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
        return auth_favorites_data.map((item) => item.id);
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
  }, [auth_favorites_data, dispatch, product_url]);

  useEffect(() => {
    dispatch(getSingleProductRequest({ product_url: product_url })).then(
      (res) => {
        setCount(res.payload?.payload?.item?.count_user_basket);
        setImage(res.payload?.payload?.item?.image);
      }
    );
  }, [dispatch, product_url]);

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

  useEffect(() => {
    let storedBaskets = localStorage.getItem("baskets");

    try {
      storedBaskets = JSON.parse(storedBaskets) || [];
    } catch (error) {
      console.error("Error parsing baskets from localStorage:", error);
      storedBaskets = [];
    }

    // let bas = userToken ? auth_basket_data : storedBaskets;

    setIsBasket(storedBaskets);
  }, [
    // auth_basket_data,
    basket_count,
    count_every_item,
  ]);

  const addToBasket = async (event, item) => {
    event.stopPropagation();
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
                count: count,
              })
            );
          }
          //   .then((res) => {
          //     if (res.payload.success) {
          //       dispatch(getBasketRequest({}));
          //     }
          //   });
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
                  count_user_basket: count,
                }
              : basketItem
          );
          if (userToken) {
            dispatch(
              addBasketRequest({
                itemId: item.id,
                count: count,
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
      setCount(1);
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  };

  return (
    <main>
      <>
        <section className="SingleProduct__single__section">
          <div className="SingleProduct__top__bar--container">
            <img
              src={ArrowBackBig}
              alt="ArrowBackBig"
              className="SingleProduct__single--arrow__back"
              onClick={() => navigate(-1)}
            />
            <img
              src={
                isFavorite?.includes(single_product?.item?.id)
                  ? HeartRed
                  : HeartBlack
              }
              alt="HeartBlack"
              className="SingleProduct__single--favorite"
              onClick={(event) => toggleFavorite(event, single_product?.item)}
            />
          </div>
          <div className="SingleProduct__single__image__container">
            <div className="SingleProduct__single__image--parent">
              {image ? (
                <img
                  src={image}
                  alt={image}
                  className="SingleProduct__single__image"
                  loading="eager"
                />
              ) : null}
              {single_product?.item?.percent > 0 && (
                <p className="SingleProduct__image--sale">
                  - {single_product?.item?.percent}%
                </p>
              )}
            </div>
            <div className="SingleProduct__slider--parent">
              {single_product?.item_gallery?.original?.gallery?.map((slide) => (
                <div
                  className="SingleProduct__slider--items"
                  key={slide.id}
                  onClick={() => setImage(slide?.image)}>
                  <img
                    src={slide.image}
                    alt={slide.image}
                    className="SingleProduct__slider--images"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="SingleProduct__right__side">
            <h2 className="SingleProduct__description--title">
              {single_product?.item?.title[i18next.language]}
            </h2>
            {/* <p className="SingleProduct--gram">
              
            </p> */}
            {single_product?.item?.code && (
              <p className="SingleProduct--product_code">
                <span>Код Продукта :</span>
                <span>{single_product?.item?.code}</span>
              </p>
            )}

            {single_product?.item?.manufacturer[i18next.language] && (
              <p className="SingleProduct--made_in">
                <span>Страна Производства :</span>
                <span>
                  {single_product?.item?.manufacturer[i18next.language]}
                </span>
              </p>
            )}
            <p className="SingleProduct--count">
              {t("SingleProduct.UnitOfMeasurement")}{" "}
              {single_product?.item?.measurement[i18next.language]}
              {single_product?.measurement}
            </p>
            {single_product?.item?.new_price > 0 && (
              <p className="SingleProduct--old__price">
                {useNumberWithDots(single_product?.item?.price)}
                {single_product?.item?.price ? "֏" : ""}
              </p>
            )}
            <p className="SingleProduct--price">
              {useNumberWithDots(
                single_product?.item?.new_price ||
                  (single_product?.item?.price &&
                    single_product?.item?.new_price)
                  ? single_product?.item?.new_price * count
                  : single_product?.item?.price
                  ? single_product?.item?.price * count
                  : 0
              )}
              <img src={Dram} alt="Dram" />
            </p>
            <div className="SingleProduct__change--count">
              <ChangeCountButton
                count={count}
                countMinus={() => count > 1 && setCount(count - 1)}
                disabled={count == single_product?.item?.count}
                countPlus={() =>
                  count < single_product?.item?.count && setCount(count + 1)
                }
                parentStyle={{
                  width: 150,
                }}
              />

              <img
                src={BasketIcon}
                alt="BasketIcon"
                style={{
                  marginLeft: 10,
                  cursor: "pointer",
                }}
                onClick={(event) => addToBasket(event, single_product?.item)}
              />
              <img
                src={
                  isFavorite?.includes(single_product?.item?.id)
                    ? HeartRed
                    : HeartBlack
                }
                alt="HeartBlack"
                style={{
                  marginLeft: 10,
                  width: 20,
                  cursor: "pointer",
                }}
                onClick={(event) => toggleFavorite(event, single_product?.item)}
              />
            </div>
            <p
              className="SingleProduct--description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  single_product?.item?.description[i18next.language],
                  {
                    ALLOWED_TAGS: ["p", "span", "strong", "em", "br"],
                  }
                ),
              }}
            />
            {single_product?.options?.length > 0 && (
              <>
                <p className="SingleProduct--the_nutritional_value">
                  Пищевая ценность на 100 г
                </p>
                <div className="SingleProduct__the_nutritional_value--parent">
                  {single_product.options?.map((option) => (
                    <span
                      key={option.id}
                      className="SingleProduct__the_nutritional_value--span">
                      <p className="SingleProduct__the_nutritional_value--p">
                        {option.name[i18next.language]}
                      </p>
                      <span className="SingleProduct__the_nutritional_value--span__span">
                        {option.value[i18next.language]}
                      </span>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="SingleProduct__recommendation">
          <h2 className="SingleProduct__recommendation__title">
            {t("SingleProduct.WeRecommend")}
          </h2>
          <ProductsInMainPage products={single_product?.category_items} />
        </section>
      </>

      <ChangeCountButtonFloating
        count={count}
        countMinus={() => count > 1 && setCount(count - 1)}
        countPlus={() =>
          count <= single_product?.item?.count && setCount(count + 1)
        }
        buyProduct={(event) => addToBasket(event, single_product?.item)}
      />
    </main>
  );
};

export default SingleProduct;
