import "../../Css/BottomSheet.css";
import BottomSheetClose from "../../Assets/icons/BottomSheetClose.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleBottomSheet } from "../../store/other/bottomSheetSlice";
import DarkSearch from "../../Assets/icons/DarkSearch.svg";
import Sheet from "react-modal-sheet";
import { changeSearchValue } from "../../store/other/searchInputSlice";
import { searchRequest } from "../../store/reducer/searchSlice.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BottomSheet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");

  const { bottomSheetPage, isOpenBottomSheet, isSearchable } = useSelector(
    (state) => state.bottomSheetSlice
  );

  const handleSheetClose = (e) => {
    console.log(e);
    dispatch(
      toggleBottomSheet({
        search: false,
        isOpen: false,
      })
    );
  };

  const SearchBottomSheet = () => {
    const [search, setSearch] = useState("");
    const handleChangeSearchValue = (event) => {
      const { value } = event.target;
      setSearch(value);
    };

    return (
      <div className="SearchBottomSheet">
        <input
          type="search"
          value={search}
          className="SearchBottomSheet--Input"
          onChange={handleChangeSearchValue}
          placeholder={t("Search.SiteSearch")}
        />
        <img
          src={DarkSearch}
          alt="DarkSearch"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(changeSearchValue(search));
            navigate("/search");
            dispatch(searchRequest(search));
            dispatch(
              toggleBottomSheet({
                search: false,
                isOpen: false,
              })
            );
          }}
        />
      </div>
    );
  };

  const Renderer = () => {
    return (
      <div className="BottomSheet__renderer--parent">
        <div className="BottomSheet__close--parent">
          <img
            src={BottomSheetClose}
            alt="BottomSheetClose"
            className="BottomSheet__close--icon"
            onClick={() =>
              dispatch(
                toggleBottomSheet({
                  search: false,
                  isOpen: false,
                })
              )
            }
          />
        </div>
        {isSearchable && <SearchBottomSheet />}
        {bottomSheetPage}
      </div>
    );
  };

  return (
    <Sheet
      isOpen={isOpenBottomSheet}
      onClose={handleSheetClose}
      animate
      detent="full-height"
      initialSnap={0}
      snapPoints={[0.8]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller draggableAt="bottom">
            <Renderer />
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSheetClose();
        }}
      />
    </Sheet>
  );
};

export default BottomSheet;
