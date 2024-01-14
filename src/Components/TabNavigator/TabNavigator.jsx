import "../../Css/TabNavigator.css";
import BottomHome from "../../Assets/icons/BottomHome.svg";
import BottomUser from "../../Assets/icons/BottomUser.svg";
import BottomMenu from "../../Assets/icons/BottomMenu.svg";
import BottomBasket from "../../Assets/icons/BottomBasket.svg";
import BottomHeart from "../../Assets/icons/BottomHeart.svg";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useEffect, useState } from "react";
import BasketPopup from "../BasketPopup/BasketPopup";
import { useNavigate } from "react-router-dom";
import { toggleBottomSheet } from "../../store/other/bottomSheetSlice";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice";
import useWindowSize from "../useWindowSize";
import { toggleControllerPage } from "../../store/other/controllerPageSlice";
import {
  basketCount,
  favoriteCount,
} from "../../store/other/updateCountsSlice";
import { getHomeDataRequest } from "../../store/reducer/getHomeDataSlice";
import { useTranslation } from "react-i18next";
import ProductCatalog from "../Others/ProductCatalog";

const TabNavigator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const userToken = localStorage.getItem("userToken");
  const [isOpenBasketPopup, setIsOpenBasketPopup] = useState(false);
  const windowSize = useWindowSize();
  const storedFavorites = localStorage.getItem("favorites") || "[]";
  const storedBasket = localStorage.getItem("baskets") || "[]";

  const { favorite_count, basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);

  const handleProfileAuth = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (userToken && windowSize.width > 1024) {
      navigate(`/${i18next.language}/profile/personal-data`);
    } else if (userToken && windowSize.width <= 1024) {
      navigate(`/${i18next.language}/profile/personal-data`);
      dispatch(toggleControllerPage());
    } else if (!userToken) {
      document.querySelector(".LoginPopup").classList.add("open");
      document.body.style.overflow = "hidden";
    }
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
    favorite_count,
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

  const NavBarListForBottomSheet = () => {
    return <div></div>;
  };

  const BottomSheetRenderer = () => {
    return (
      <>
        <h2 className="BottomSheet--seafood">{t("TabNavigator.Seafood")}</h2>
        <ProductCatalog style={{ paddingTop: 20 }} />
        <NavBarListForBottomSheet />
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="TabNavigator">
        <div className="TabNavigator--container">
          <div className="TabNavigator__right__side__heart__basket">
            <img
              src={BottomHome}
              alt="BottomHome"
              onClick={() => navigate(`/${i18next.language}`)}
            />
          </div>
          <div className="TabNavigator__right__side__heart__basket">
            <img
              src={BottomUser}
              alt="BottomUser"
              onClick={handleProfileAuth}
            />
          </div>

          <img
            src={BottomMenu}
            alt="BottomMenu"
            onClick={() => {
              dispatch(getHomeDataRequest({}));
              dispatch(
                toggleBottomSheet({
                  render: <BottomSheetRenderer />,
                  search: true,
                  isOpen: true,
                })
              );
            }}
          />

          <div className="TabNavigator__right__side__heart__basket">
            <img
              src={BottomBasket}
              alt="BottomBasket"
              className="TabNavigator__right__side__basket"
              onClick={() => {
                // if (localStorage.getItem("userToken")) {
                //   dispatch(getBasketRequest({}));
                // }
                setIsOpenBasketPopup(true);
              }}
            />
            {basket_count > 0 && (
              <span className="TabNavigator__basket__heart__count">
                {basket_count}
              </span>
            )}
          </div>
          <div className="TabNavigator__right__side__heart__basket">
            <img
              src={BottomHeart}
              alt="BottomHeart"
              className="TabNavigator__right__side__favorite"
              onClick={() => {
                navigate(`/${i18next.language}/profile/favorites`);
              }}
            />
            {favorite_count > 0 && (
              <span className="TabNavigator__basket__heart__count">
                {favorite_count}
              </span>
            )}
          </div>
        </div>
      </div>
      <BasketPopup isOpen={isOpenBasketPopup} onClose={setIsOpenBasketPopup} />
    </React.Fragment>
  );
};

export default TabNavigator;
