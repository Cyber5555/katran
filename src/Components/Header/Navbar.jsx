import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cart from "../../Assets/icons/Cart.svg";
import TreeDots from "../../Assets/icons/tree_dots.svg";
import DefaultAvatar from "../../Assets/icons/DefaultAvatar.svg";
import Heart from "../../Assets/icons/Heart.svg";
import Remove from "../../Assets/icons/remove.svg";
import KatranWhiteNav from "../../Assets/icons/katranWhiteNav.svg";
import Subcategory from "./Subcategory";
import BasketPopup from "../BasketPopup/BasketPopup";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderDataRequest } from "../../store/reducer/getHeaderDataSlice";
import useWindowSize from "../useWindowSize";
import { ReactComponent as Burger } from "../../Assets/icons/Burger.svg";
import Language from "../Others/Language.jsx";
import "../../Css/Navbar.css";
// import { getBasketRequest } from "../../store/authReducer/getBasketSlice";
import { getFavoriteRequest } from "../../store/authReducer/getFavoriteSlice.js";
import {
  basketCount,
  favoriteCount,
} from "../../store/other/updateCountsSlice.js";
import { useTranslation } from "react-i18next";
import { setIsOpenBurgerMenu } from "../../store/other/openBurgerMenuSlice.js";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const [isActiveSub, setIsActiveSub] = useState("");
  const [isOpenBasketPopup, setIsOpenBasketPopup] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  const [lasts, setLasts] = useState([]);
  const [showCount, setShowCount] = useState(0);
  const storedFavorites = localStorage.getItem("favorites") || "[]";
  const storedBasket = localStorage.getItem("baskets") || "[]";
  const userToken = localStorage.getItem("userToken");
  const { pathname } = location;

  const { favorite_count, basket_count, count_every_item } = useSelector(
    (state) => state.updateCountsSlice
  );

  const { auth_favorites_data } = useSelector(
    (state) => state.getFavoriteSlice
  );
  // const { auth_basket_data } = useSelector((state) => state.getBasketSlice);
  const { header_footer_data } = useSelector(
    (state) => state.getHeaderDataSlice
  );

  const handleParentClick = (event, subName) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      subName.static === isActiveSub &&
      event.target.className !== "Navbar__subcategory__product" &&
      event.target.className !== "Navbar__subcategory__product--items"
    ) {
      setIsActiveSub("");
    } else if (subName.static === "seafood" || subName.static === "readyfood") {
      setIsActiveSub(subName.static);
    } else if (subName.static === "home") {
      navigate(`/${i18next.language}`);
      setIsActiveSub("");
    } else if (subName.static === "brand") {
      navigate(`/${i18next.language}/brand`);
      setIsActiveSub("");
    } else if (subName.static === "works") {
      navigate(`/${i18next.language}/works`);
      setIsActiveSub("");
    } else if (subName.static === "faq") {
      navigate(`/${i18next.language}/faq`);
      setIsActiveSub("");
    } else if (subName.static === "contact") {
      navigate(`/${i18next.language}/contact`);
      setIsActiveSub("");
    } else if (subName.static === "blog") {
      navigate(`/${i18next.language}/blog`);
      setIsActiveSub("");
    } else if (subName.static === "promo") {
      navigate(`/${i18next.language}/promo`);
      setIsActiveSub("");
    } else {
      if (!subName.static && subName.url) {
        navigate(`/${i18next.language}/pages/${subName.url}`);
      }
      setIsActiveSub("");
    }
  };

  useEffect(() => {
    const count =
      windowSize.width <= 1555 && windowSize.width > 1500
        ? 1
        : windowSize.width <= 1500 && windowSize.width > 1355
        ? 2
        : windowSize.width <= 1355 && windowSize.width > 1250
        ? 3
        : windowSize.width <= 1250 && windowSize.width > 1115
        ? 4
        : windowSize.width <= 1115 && windowSize.width > 1024
        ? 5
        : 0;

    setShowCount(count);
    setLasts(header_footer_data?.static_pages);
  }, [windowSize.width, pathname, header_footer_data]);

  useEffect(() => {
    dispatch(getHeaderDataRequest({}));
    if (userToken) {
      dispatch(getFavoriteRequest({}));
      // dispatch(getBasketRequest({}));
    }
  }, [dispatch, userToken, count_every_item]);

  useEffect(() => {
    const navbar = document.querySelector("nav");

    if (pathname === "/hy") {
      navigate("/");
    }

    if (pathname === "/" || pathname === `/${i18next.language}`) {
      navbar.classList.remove("active");
    } else if (
      (pathname === "/" && window.pageYOffset == 0) ||
      (pathname === `/${i18next.language}` && window.pageYOffset == 0)
    ) {
      navbar.classList.add("active");
    } else {
      setScrollOffset(0);
      navbar.classList.add("active");
    }

    if (pathname === `/${i18next.language}` || pathname === `/`) {
      const handleScroll = () => {
        if (window.pageYOffset > 85) {
          setIsActiveSub("");
          setScrollOffset(85);
          navbar.classList.add("active");
        } else {
          setScrollOffset(window.pageYOffset);
          navbar.classList.remove("active");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollOffset, pathname, i18next.language, navigate]);

  const handleProfileAuth = () => {
    if (userToken) {
      navigate(`/${i18next.language}/profile/personal-data`);
    } else {
      document.querySelector(".LoginPopup").classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    const handleBodyClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        e.target.className !== "Navbar__menu__dropdown" &&
        e.target.className !== "Navbar__menu__dropdown--child"
      ) {
        setIsOpenedDropdown(false);
      }
      if (
        e.target.className !== "Navbar__subcategory" &&
        e.target.className !== "Navbar__subcategory__product--items" &&
        e.target.className !== "Subcategory__rendered--title"
      ) {
        setIsActiveSub("");
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

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

  return (
    <React.Fragment>
      <nav
        style={
          pathname === `/${i18next.language}` || pathname === `/`
            ? { top: `calc(85px - ${scrollOffset}px)` }
            : {}
        }>
        <div className="Navbar__container">
          <ul className="Navbar__menu--parent">
            <img
              src={KatranWhiteNav}
              alt="KatranWhiteNav"
              className="Navbar__katran--logo"
              onClick={() => navigate(`/${i18next.language}`)}
            />

            {header_footer_data?.static_pages?.map((page, index) => (
              <li
                key={index}
                className={
                  page.static === isActiveSub
                    ? "Navbar__menu--items--active"
                    : "Navbar__menu--items"
                }
                onClick={(event) => handleParentClick(event, page)}>
                {page.static === isActiveSub && (
                  <img
                    src={Remove}
                    alt="Remove"
                    id="Remove"
                    style={{ marginRight: 10 }}
                  />
                )}
                {page?.title[i18next.language]}
                {page?.static === isActiveSub && (
                  <Subcategory
                    handleParentClick={(event) =>
                      handleParentClick(event, page)
                    }
                    staticPage={isActiveSub}
                  />
                )}
              </li>
            ))}
            <div
              className="Navbar__menu__dropdown"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsOpenedDropdown(!isOpenedDropdown);
              }}>
              <img src={TreeDots} alt="TreeDots" />
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className={`Navbar__menu__dropdown--child ${
                  isOpenedDropdown ? "opened" : ""
                }`}>
                {lasts
                  ?.slice(Math.max(lasts.length - showCount, 0))
                  .map((last) => (
                    <li
                      className={"Navbar__menu--items--lasts"}
                      key={last.id}
                      onClick={(event) => {
                        handleParentClick(event, last);
                        setIsOpenedDropdown(!isOpenedDropdown);
                      }}>
                      {last.title[i18next.language]}
                    </li>
                  ))}
              </div>
            </div>
          </ul>
          <div className="Navbar__right_side">
            {windowSize.width > 1024 ? (
              <>
                <img
                  src={DefaultAvatar}
                  alt="DefaultAvatar"
                  onClick={handleProfileAuth}
                />
                <div className="Navbar__right__side__heart__basket">
                  <img
                    src={Heart}
                    alt="Heart"
                    onClick={() => {
                      navigate(`/${i18next.language}/profile/favorites`);
                    }}
                    className="Navbar__right__side__favorite"
                  />
                  {favorite_count > 0 && (
                    <span className="Navbar__basket__heart__count">
                      {favorite_count}
                    </span>
                  )}
                </div>
                <div className="Navbar__right__side__heart__basket">
                  <img
                    src={Cart}
                    alt="Cart"
                    className="Navbar__right__side__basket"
                    onClick={() => {
                      if (userToken) {
                        // dispatch(getBasketRequest({}));
                      }

                      setIsOpenBasketPopup(true);
                      document.body.style.overflow = "hidden";
                    }}
                  />
                  {basket_count > 0 && (
                    <span className="Navbar__basket__heart__count">
                      {basket_count}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href={`tel:${header_footer_data.contact}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ whiteSpace: "pre" }}
                  className="Number">
                  {header_footer_data?.contact}
                </a>
                <Language />
                <Burger onClick={() => dispatch(setIsOpenBurgerMenu())} />
              </>
            )}
          </div>
        </div>
      </nav>
      <BasketPopup isOpen={isOpenBasketPopup} onClose={setIsOpenBasketPopup} />
    </React.Fragment>
  );
};

export default Navbar;

// const useNavigationLinks = (links, threshold) => {
//   const numNavLinks = Math.min(links.length, threshold);
//   const numDropdownLinks = links.length - numNavLinks;

//   return [links.slice(0, numNavLinks), links.slice(numNavLinks, numDropdownLinks)];
// };

// const MyComponent = () => {
//   const [navLinks, dropdownLinks] = useNavigationLinks(links, 20);

//   return (
//     <nav>
//       {navLinks.map((link) => (
//         <Link key={link.id}>{link.text}</Link>
//       ))}
//       {dropdownLinks.length > 0 && (
//         <DropdownMenu links={dropdownLinks} />
//       )}
//     </nav>
//   );
// };
