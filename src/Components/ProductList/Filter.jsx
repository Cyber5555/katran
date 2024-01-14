import { useEffect, useState } from "react";
import Switch from "react-switch";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterDataChange } from "../../store/other/filterDataSlice.tsx";
import { useTranslation } from "react-i18next";
import _ from "lodash";
function valueText(value) {
  return `${value}`;
}

const Filter = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { products_data } = useSelector((state) => state.getProductsDataSlice);
  const [value, setValue] = useState([products_data?.min, products_data?.max]);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [t, i18next] = useTranslation("global");
  const minPrice = products_data?.min;
  const maxPrice = products_data?.max;

  const handleCriteriaChange = (id) => {
    const isSelected = selectedCriteria.includes(id);

    if (!isSelected) {
      setSelectedCriteria([...selectedCriteria, id]);
    } else {
      setSelectedCriteria(
        selectedCriteria.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleBrandChange = (id) => {
    const isSelected = selectedBrands.includes(id);

    if (!isSelected) {
      setSelectedBrands([...selectedBrands, id]);
    } else {
      setSelectedBrands(
        selectedBrands.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleCategoryChange = (id) => {
    const isSelected = selectedCategory.includes(id);
    if (!isSelected) {
      setSelectedCategory([...selectedCategory, id]);
    } else {
      setSelectedCategory(
        selectedCategory.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleChange = () => {
    setChecked(!checked);
    setSelectedCriteria([]);
    setSelectedBrands([]);
    setSelectedCategory([]);
    setValue([minPrice, maxPrice]);
  };

  useEffect(() => {
    dispatch(
      filterDataChange({
        criteria: selectedCriteria,
        brand: selectedBrands,
        new_product: checked ? 1 : 0,
        priceRange: { from: value[0], to: value[1] },
        category: selectedCategory,
      })
    );
  }, [
    checked,
    dispatch,
    selectedBrands,
    selectedCriteria,
    selectedCategory,
    value,
  ]);

  const handleChangePrice = (event) => {
    const { name, value: inputValue } = event.target;
    const updatedValue = [...value];

    if (name === "price1") {
      const parsedValue = Number(inputValue);

      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100000) {
        updatedValue[0] = parsedValue;
      } else if (parsedValue === 0) {
        updatedValue[0] = "";
      }
    } else if (name === "price2") {
      const parsedValue = Number(inputValue);

      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100000) {
        updatedValue[1] = parsedValue;
      } else if (parsedValue === 0) {
        updatedValue[1] = "";
      }
    }

    setValue(updatedValue);
  };

  const handleChangeRangeInput = _.debounce((event, newValue) => {
    setValue(newValue);
  }, 300); // Adjust the debounce delay as needed

  return (
    <div className="ProductList__filter">
      <p className="ProductList__filter--count">
        {products_data?.items?.total} {t("ProductList.productsCount")}
      </p>
      <div className="ProductList__filter--switch">
        <Switch
          onChange={handleChange}
          checked={checked}
          checkedIcon
          uncheckedIcon
          onColor="#06364B"
          offColor="#E2EAF0"
          size={"10"}
          id="Switch"
        />
        <label
          htmlFor="Switch"
          style={{ cursor: "pointer" }}
          className="ProductList--labels">
          {t("ProductList.newProduct")}
        </label>
      </div>

      <div className="ProductList__filter__brands--parent">
        {products_data?.category?.children?.length > 0 && (
          <h2 className="ProductList__filter__massa--title">
            {products_data?.category?.name[i18next.language]}
          </h2>
        )}
        {products_data?.category?.children?.map((sub) => (
          <div key={sub.url} className="ProductList__filter__brands">
            <input
              type="checkbox"
              id={sub.url}
              className="ProductList__checkbox"
              checked={selectedCategory.includes(sub.url)}
              onChange={() => handleCategoryChange(sub.url)}
            />
            <label
              htmlFor={sub.url}
              className="ProductList--labels"
              onClick={(e) => e.stopPropagation()}>
              {sub?.name[i18next.language]}
            </label>
          </div>
        ))}
      </div>

      <div className="ProductList__filter__brands--parent">
        {products_data?.brands?.length > 0 && (
          <h2 className="ProductList__filter__brand--title">
            {products_data?.brand_title &&
              products_data?.brand_title[i18next.language]}
          </h2>
        )}
        {products_data?.brands?.map((brand) => (
          <div key={brand.id} className="ProductList__filter__brands">
            <input
              type="checkbox"
              id={brand.id}
              className="ProductList__checkbox"
              checked={selectedBrands.includes(brand.id)}
              onChange={() => handleBrandChange(brand.id)}
            />
            <label
              htmlFor={brand.id}
              className="ProductList--labels"
              onClick={(e) => e.stopPropagation()}>
              {brand?.title[i18next.language]}
            </label>
          </div>
        ))}
      </div>

      {products_data?.filters?.map((filter) => (
        <div className="ProductList__filter__massas--parent" key={filter.id}>
          <h2 className="ProductList__filter__massa--title">
            {filter?.name[i18next.language]}
          </h2>
          {filter?.criteria?.map((massa) => (
            <div key={massa.id} className="ProductList__filter__massas">
              <input
                type="checkbox"
                id={`${filter.id}-${massa.id}`}
                className="ProductList__checkbox"
                checked={selectedCriteria.includes(massa.id)}
                onChange={() => handleCriteriaChange(massa.id)}
              />
              <label
                htmlFor={`${filter.id}-${massa.id}`}
                className="ProductList--labels"
                onClick={(e) => e.stopPropagation()}>
                {massa.name[i18next.language]}
              </label>
            </div>
          ))}
        </div>
      ))}

      {/* {products_data?.min && products_data?.max && ( */}
      <>
        <Slider
          value={value}
          onChange={handleChangeRangeInput}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={minPrice}
          max={maxPrice}
        />
        <div className="ProductList__filter__price__input--parent">
          <input
            type="number"
            name="price1"
            id="ProductList__filter__price__input"
            value={value[0]}
            onChange={handleChangePrice}
            placeholder={products_data?.min}
            min={minPrice}
            max={maxPrice}
            step={1}
          />
          <input
            type="number"
            name="price2"
            id="ProductList__filter__price__input"
            value={value[1]}
            onChange={handleChangePrice}
            min={minPrice}
            max={maxPrice}
            placeholder={products_data?.max}
            step={1}
          />
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Filter;
