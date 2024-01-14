import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../Css/LeftBar.css";
import {
  LeftBarArchive,
  LeftBarBasket,
  LeftBarBuy,
  LeftBarHeart,
  LeftBarNew,
  LeftBarProfileIcon,
  LeftBarSettings,
} from "../Others/SvgRenderer.jsx";
import LeftBarExit from "../../Assets/icons/LeftBarExit.svg";
import { logoutRequest } from "../../store/authReducer/logoutSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { toggleControllerPage } from "../../store/other/controllerPageSlice";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import { useTranslation } from "react-i18next";

const LeftBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState();
  const [t, i18next] = useTranslation("global");
  const { isLeftBarOpen } = useSelector((state) => state.controllerPageSlice);
  const { basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );
  const navLinks = [
    {
      name: t("Profile.NewProducts"),
      to: "new-goods",
      image: <LeftBarNew />,
    },
    {
      name: t("Profile.PersonalInformation"),
      to: "personal-data",
      image: <LeftBarProfileIcon />,
    },
    {
      name: t("Profile.Favorites"),
      to: "favorites",
      image: <LeftBarHeart />,
    },
    {
      name: t("Profile.Baskets"),
      to: "basket",
      image: <LeftBarBasket />,
    },
    {
      name: t("Profile.CurrentPurchases"),
      to: "current-purchases",
      image: <LeftBarBuy />,
    },
    {
      name: t("Profile.Archive"),
      to: "archive",
      image: <LeftBarArchive />,
    },
    {
      name: t("Profile.Settings"),
      to: "settings",
      image: <LeftBarSettings />,
    },
  ];

  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  const { current_purchases_data } = useSelector(
    (state) => state.currentPurchasesSlice
  );
  const { archive_data } = useSelector((state) => state.archiveSlice);

  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);

  // let basketItems = localStorage.getItem("userToken")
  //   ? auth_basket_data
  //   : localStorage.getItem("baskets");
  // let basketItems = localStorage.getItem("baskets");

  useEffect(() => {
    let storedBaskets = localStorage.getItem("baskets");

    try {
      storedBaskets = JSON.parse(storedBaskets) || [];
    } catch (error) {
      console.error("Error parsing baskets from localStorage:", error);
      storedBaskets = [];
    }

    // let bas = userToken ? auth_basket_data : storedBaskets;

    setBasketItems(storedBaskets);
  }, [
    // auth_basket_data,
    basket_count,
    count_every_item,
  ]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      dispatch(getFavoriteRequest({}));
    }
  }, [dispatch]);

  return (
    <div
      className={`LeftBar--for__popup ${isLeftBarOpen ? "open" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (isLeftBarOpen) {
          e.target.className != "LeftBar" &&
            e.target.className != "LeftBar--links" &&
            dispatch(toggleControllerPage());
          navigate(-1);
        }
      }}>
      <div className="LeftBar">
        {navLinks.map((links) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? "LeftBar--links active" : "LeftBar--links"
            }
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleControllerPage());
            }}
            to={links.to}
            key={links.name}>
            <span>
              {React.cloneElement(links.image, {
                fill:
                  location.pathname.split(`/${i18next.language}`)[2] == links.to
                    ? "#1e4353"
                    : "#1e435399",
              })}
            </span>
            {links.name}
            {links.to == "favorites"
              ? ` (${auth_favorites_data?.length})`
              : links.to == "basket"
              ? ` (${basketItems?.length})`
              : links.to == "current-purchases"
              ? ` (${current_purchases_data?.length})`
              : links.to == "archive"
              ? ` (${archive_data?.length})`
              : ""}
          </NavLink>
        ))}
        <p
          className={"LeftBar--links"}
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch(logoutRequest({})).then((result) => {
              if (result?.payload?.success) {
                localStorage.removeItem("userToken");
                navigate(`/${i18next.language}`);
              }
            })
          }>
          <span>
            <img src={LeftBarExit} alt="LeftBarExit" />
          </span>
          {t("Profile.Exit")}
        </p>
      </div>
    </div>
  );
};

export default LeftBar;
