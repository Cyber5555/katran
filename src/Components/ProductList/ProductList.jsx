import CreatableSelect from "react-select/creatable";
import "../../Css/ProductList.css";
import ProductsInMainPage from "../Others/ProductsInMainPage";
import ProductsInMainPageFavorite from "../Others/ProductsInMainPageFavorite";
import { useEffect, useState } from "react";
import ProductListFilterBg from "../../Assets/images/ProductList__filter__bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductsDataRequest } from "../../store/reducer/getProductsDataSlice.tsx";
import Filter from "./Filter";
import useWindowSize from "../useWindowSize";
import FilterIcon from "../../Assets/icons/filter.svg";
import { toggleBottomSheet } from "../../store/other/bottomSheetSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Pagination } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const [sortType, setSortType] = useState(0);
  const { url } = useParams();
  const [t, i18next] = useTranslation("global");
  const { criteria, priceRange, brand, new_product, category } = useSelector(
    (state) => state.filterDataSlice
  );
  useEffect(() => {
    dispatch(
      getProductsDataRequest({
        category_name: url,
        criteria,
        priceRange,
        brand,
        new_product,
        sortType,
        category,
      })
    );
  }, [
    brand,
    criteria,
    dispatch,
    new_product,
    priceRange,
    url,
    sortType,
    category,
  ]);

  const { products_data } = useSelector((state) => state.getProductsDataSlice);

  const options = [
    { value: "0", label: t("ProductList.ByPopularity") },
    { value: "1", label: t("ProductList.CheapFirst") },
    { value: "2", label: t("ProductList.ExpensiveFirst") },
  ];

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 20;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products_data?.items?.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products_data?.items?.data.length / 20);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % products_data?.items?.data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <section className="ProductList_section">
      <div className="ProductList__filter--parent">
        <article>
          {windowSize.width <= 1024 && (
            <div>
              <h2 className="ProductList__main__container--title">
                {products_data?.category?.name[i18next.language]}
              </h2>
              {products_data?.items?.length && (
                <p className="ProductList__main__container--count">
                  {products_data?.items?.length}{" "}
                  {t("ProductList.productsCount")}
                </p>
              )}
            </div>
          )}
          <div className="ProductList__filterIcon__select--parent">
            <div className="ProductList__filter_select--parent">
              <CreatableSelect
                options={options}
                placeholder={t("ProductList.select")}
                className="ProductList__filter_select"
                isSearchable={false}
                onChange={(event) => setSortType(event.value)}
              />
            </div>

            <img
              src={FilterIcon}
              alt="FilterIcon"
              className="ProductList__FilterIcon"
              onClick={() =>
                dispatch(
                  toggleBottomSheet({
                    render: <Filter />,
                    search: false,
                    isOpen: true,
                  })
                )
              }
            />
          </div>
          {windowSize.width > 1024 && <Filter />}
        </article>
        <div className="ProductList__filter__text--parent">
          <p className="ProductList__filter--first">место для</p>
          <p className="ProductList__filter--second">баннера</p>
          <img
            src={ProductListFilterBg}
            alt="ProductListFilterBg"
            className="ProductList__filter--image"
          />
        </div>
      </div>

      <div className="ProductList__main__container">
        {windowSize.width > 1024 && (
          <>
            <h2 className="ProductList__main__container--title">
              {products_data?.category?.name[i18next.language]}
            </h2>
            <p className="ProductList__main__container--count">
              {products_data?.items?.total} {t("ProductList.productsCount")}
            </p>
          </>
        )}
        <div>
          {/* <ProductsInMainPage /> */}

          {windowSize.width > 1024 ? (
            <ProductsInMainPageFavorite
              style={{ marginTop: 9 }}
              products={currentItems}
            />
          ) : (
            <ProductsInMainPage
              style={{ marginTop: 9 }}
              products={currentItems}
            />
          )}
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
      </div>
    </section>
  );
};

export default ProductList;
