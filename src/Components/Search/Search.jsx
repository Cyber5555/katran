import React, { useEffect } from "react";
import "../../Css/Search.css";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchValue } from "../../store/other/searchInputSlice";
import { searchRequest } from "../../store/reducer/searchSlice.tsx";
// import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../Assets/icons/SearchIcon.svg";
import { useTranslation } from "react-i18next";

const Search = () => {
  const [t, i18next] = useTranslation("global");
  const { search_data } = useSelector((state) => state.searchSlice);
  const { searchValue } = useSelector((state) => state.searchInputSlice);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const { value } = event.target;

    dispatch(changeSearchValue(value));
    if (value.trim().length >= 3) {
      dispatch(searchRequest(value));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(changeSearchValue(""));
      dispatch(searchRequest(""));
    };
  }, [dispatch]);

  return (
    <div className="Search">
      <h2 className="Search--title">
        {/* {search_data?.title[i18next.language]} */}
        {t("Search.Result")}{" "}
        {search_data?.items?.length > 0 ? search_data?.items?.length : 0}
      </h2>

      <div className="Search__input--parent">
        <input
          type="search"
          value={searchValue}
          onChange={handleSearch}
          className="Search__input"
        />
        <div className="Search__icon--parent">
          <SearchIcon />
        </div>
      </div>
      <ProductsInMainPage products={search_data.items} />
    </div>
  );
};

export default Search;
