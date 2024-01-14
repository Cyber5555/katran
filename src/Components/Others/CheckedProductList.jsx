/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import "../../Css/CheckedProductList.css";
import Dram1 from "../../Assets/icons/Dram1.svg";
import Dram from "../../Assets/icons/Dram.svg";
import Cross from "../../Assets/icons/Cross.svg";
import ChangeCountButton from "../Others/ChangeCountButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addBasketRequest } from "../../store/authReducer/addBasketSlice.js";
import { useNumberWithDots } from "../useNumberWithDot.js";
import { removeBasketRequest } from "../../store/authReducer/removeBasketSlice.js";
import useWindowSize from "../useWindowSize.js";
import { changeCountEveryProduct } from "../../store/other/updateCountsSlice.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CheckedProductList = ({
  count = true,
  title,
  totalPrice,
  setTotalPrice,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [basketData, setBasketData] = useState([]);
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
  const userToken = localStorage.getItem("userToken") || null;
  const { basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const [t, i18next] = useTranslation("global");

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
  }, [basketData, setTotalPrice]);

  const handleCountMinus = async (item) => {
    const new_basket_data = basketData.map((product) =>
      product.id === item.id && product.count_user_basket > 1
        ? { ...product, count_user_basket: product.count_user_basket - 1 }
        : product
    );
    setBasketData(new_basket_data);
    localStorage.setItem("baskets", JSON.stringify(new_basket_data));
    handleChangeEveryProductCount();
    // if (item.count_user_basket > 1 && userToken) {
    //   dispatch(
    //     addBasketRequest({
    //       itemId: item.id,
    //       count: item.count_user_basket - 1,
    //     })
    //   );
    // }
  };

  const handleCountPlus = async (item) => {
    const new_basket_data = basketData.map((product) =>
      product.id === item.id && product.count_user_basket < item.count
        ? { ...product, count_user_basket: product.count_user_basket + 1 }
        : product
    );
    setBasketData(new_basket_data);
    localStorage.setItem("baskets", JSON.stringify(new_basket_data));
    handleChangeEveryProductCount();
    // if (item.count_user_basket < item.count && userToken) {
    //   dispatch(
    //     addBasketRequest({
    //       itemId: item.id,
    //       count: item.count_user_basket + 1,
    //     })
    //   );
    // }
  };

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

  const removeBasketItem = async (event, itemId) => {
    event.stopPropagation();
    const basket = basketData.filter((item) => item.id !== itemId);

    try {
      // Dispatch remove and get actions
      await dispatch(removeBasketRequest({ item_id: itemId }));
    } catch (error) {
      // Handle errors if needed
      console.error("Error removing or fetching basket:", error);
    }

    localStorage.setItem("baskets", JSON.stringify(basket));

    handleChangeEveryProductCount();

    setBasketData(basket);
  };

  const navigateToSingle = (e, item) => {
    navigate(`/${i18next.language}/product/${item.url}`);
  };

  return (
    <div className="CheckedProductList">
      <h2 className="CheckedProductList--title">{title}</h2>
      <div className="CheckedProductList__parent">
        <p className="CheckedProductList__parent--elements name">
          {t("CheckedProductList.Name")}
        </p>
        <p className="CheckedProductList__parent--elements price">
          {t("CheckedProductList.Price")}
        </p>
        <p className="CheckedProductList__parent--elements sale">
          {t("CheckedProductList.Discount")}
        </p>
        <p className="CheckedProductList__parent--elements count">
          {t("CheckedProductList.Quantity")}
        </p>
        <p className="CheckedProductList__parent--elements total__price">
          {t("CheckedProductList.Sum")}
        </p>
      </div>

      <div className="CheckedProductList__rendered--parent">
        {basketData?.map((item, index) => (
          <div key={index} className="CheckedProductList__rendered--items">
            <p
              className="CheckedProductList__rendered--name"
              onClick={(e) => navigateToSingle(e, item)}>
              {windowSize.width <= 620 && (
                <p className="CheckedProductList__parent--elements name">
                  {t("CheckedProductList.Name")}
                </p>
              )}
              {item.title[i18next.language]}
            </p>
            <p className="CheckedProductList__rendered--price">
              {windowSize.width <= 620 && (
                <p className="CheckedProductList__parent--elements name">
                  {t("CheckedProductList.Price")}
                </p>
              )}

              {useNumberWithDots(item?.price)}
              <img src={Dram1} alt="Dram" />
            </p>
            <p className="CheckedProductList__rendered--sale">
              {windowSize.width <= 620 && (
                <p className="CheckedProductList__parent--elements name">
                  {t("CheckedProductList.Discount")}
                </p>
              )}
              {item.percent > 0 ? "-" + item.percent : 0}%
            </p>

            {count ? (
              <div>
                {windowSize.width <= 620 && (
                  <p className="CheckedProductList__parent--elements name">
                    {t("CheckedProductList.Quantity")}
                  </p>
                )}
                <ChangeCountButton
                  count={item.count_user_basket}
                  countMinus={() => handleCountMinus(item)}
                  countPlus={() => handleCountPlus(item)}
                  disabled={item.count_user_basket == item.count}
                  parentStyle={{
                    gridTemplateColumns:
                      windowSize.width <= 768 && "25px auto 25px",
                    width: windowSize.width <= 620 && "150px",
                  }}
                  plusStyle={{
                    height: windowSize.width <= 768 && 25,
                  }}
                  minusStyle={{
                    height: windowSize.width <= 768 && 25,
                  }}
                  countStyle={{
                    height: windowSize.width <= 768 && 25,
                  }}
                />
              </div>
            ) : (
              <div>
                {windowSize.width <= 620 && (
                  <p className="CheckedProductList__parent--elements name">
                    {t("CheckedProductList.Quantity")}
                  </p>
                )}
                <p className="CheckedProductList__rendered--count">
                  {item.count_user_basket}
                </p>
              </div>
            )}

            <p className="CheckedProductList__rendered--total__price">
              {windowSize.width <= 620 && (
                <p className="CheckedProductList__parent--elements name">
                  {t("CheckedProductList.Sum")}
                </p>
              )}
              {useNumberWithDots(
                item?.new_price
                  ? item.new_price * item.count_user_basket
                  : item.price * item.count_user_basket
              )}
              <img src={Dram1} alt="Dram" />
            </p>

            <img
              src={Cross}
              alt="Cross"
              className="CheckedProductList__parent--elements--cross"
              onClick={(event) => removeBasketItem(event, item.id)}
            />
          </div>
        ))}
      </div>
      <p className="CheckedProductList--full__total">
        {t("Basket.Total")} {useNumberWithDots(totalPrice)}{" "}
        <img src={Dram} alt="Dram" />
      </p>
    </div>
  );
};

export default CheckedProductList;
