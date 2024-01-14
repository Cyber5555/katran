import React from "react";
import { ReactComponent as CloseIcon } from "../../Assets/icons/CloseIcon.svg";
import { useTranslation } from "react-i18next";
import "../../Css/BurgerMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenBurgerMenu } from "../../store/other/openBurgerMenuSlice";
import KatranBlack from "../../Assets/icons/KatranBlack.svg";
import { useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [t, i18next] = useTranslation("global");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpenBurgerMenu } = useSelector(
    (state) => state.openBurgerMenuSlice
  );
  const { header_footer_data } = useSelector(
    (state) => state.getHeaderDataSlice
  );

  const handleParentClick = (event, subName) => {
    event.preventDefault();
    event.stopPropagation();

    if (subName.static === "home") {
      navigate(`/${i18next.language}`);
    } else if (subName.static === "brand") {
      navigate(`/${i18next.language}/brand`);
    } else if (subName.static === "works") {
      navigate(`/${i18next.language}/works`);
    } else if (subName.static === "faq") {
      navigate(`/${i18next.language}/faq`);
    } else if (subName.static === "contact") {
      navigate(`/${i18next.language}/contact`);
    } else if (subName.static === "blog") {
      navigate(`/${i18next.language}/blog`);
    } else {
      if (!subName.static && subName.url) {
        navigate(`/${i18next.language}/pages/${subName.url}`);
      }
    }
    dispatch(setIsOpenBurgerMenu());
    document.body.style.overflow = "auto";
  };

  if (isOpenBurgerMenu) {
    document.body.style.overflow = "hidden";
  }
  return (
    <div className={`BurgerMenu ${isOpenBurgerMenu ? "open" : ""}`}>
      <aside className="BurgerMenu--aside" onClick={(e) => e.stopPropagation()}>
        <div className="BurgerMenu__header">
          <img
            src={KatranBlack}
            alt="KatranWhiteNav"
            onClick={() => navigate(`/${i18next.language}`)}
          />
          <button
            className="BurgerMenu__close--button"
            onClick={() => {
              document.body.style.overflow = "auto";
              dispatch(setIsOpenBurgerMenu());
            }}>
            <CloseIcon />
          </button>
        </div>

        <div className="BurgerMenu__items--parent">
          {header_footer_data?.pages_for_mobile?.map((page, index) => (
            <p
              className="BurgerMenu__items"
              key={index}
              onClick={(event) => handleParentClick(event, page)}>
              {page.title[i18next.language]}
            </p>
          ))}

          {/* <p className="BurgerMenu__start__price">
            {useNumberWithDots(totalPrice)} <img src={Dram} alt="Dram" />
          </p> */}
        </div>
      </aside>
    </div>
  );
};

export default BurgerMenu;
