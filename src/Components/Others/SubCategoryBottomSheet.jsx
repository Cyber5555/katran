import React from "react";
import { useTranslation } from "react-i18next";
import "../../Css/SubCategoryBottomSheet.css";
import { ReactComponent as ArrowBack } from "../../Assets/icons/arrowBack.svg";
import { toggleBottomSheet } from "../../store/other/bottomSheetSlice";
import ProductCatalog from "./ProductCatalog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SubCategoryBottomSheet = ({ title, children }) => {
  const [t, i18next] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NavBarListForBottomSheet = () => {
    return <div></div>;
  };

  const changeLocation = (e, item) => {
    e.stopPropagation();
    console.log(item);
    navigate(`/${i18next.language}/product-list/${item.url}`);
    dispatch(
      toggleBottomSheet({
        search: false,
        isOpen: false,
      })
    );
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
    <div className="SubCategoryBottomSheet">
      <div className="SubCategoryBottomSheet--header">
        <ArrowBack
          onClick={() => {
            dispatch(
              toggleBottomSheet({
                render: <BottomSheetRenderer />,
                search: true,
                isOpen: true,
              })
            );
          }}
        />
        <h2>{title}</h2>
      </div>
      <div>
        {children?.map((item, index) => (
          <p
            key={index}
            className="SubCategoryBottomSheet--item__text"
            onClick={(e) => changeLocation(e, item)}>
            {item.name[i18next.language]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryBottomSheet;
