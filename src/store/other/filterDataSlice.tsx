import { createSlice } from "@reduxjs/toolkit";

interface FilterDataState {
  criteria: any[];
  priceRange: object;
  brand: any[];
  new_product: string;
  category: [];
}

const filterDataSlice = createSlice({
  name: "filter_input_data",
  initialState: {
    criteria: [],
    priceRange: {},
    brand: [],
    new_product: "",
    category: [],
  } as FilterDataState,
  reducers: {
    filterDataChange(state, action) {
      const { criteria, priceRange, brand, new_product, category } =
        action.payload;
      state.criteria = criteria;
      state.priceRange = priceRange;
      state.brand = brand;
      state.new_product = new_product;
      state.category = category;
    },
  },
});

export default filterDataSlice.reducer;
export const { filterDataChange } = filterDataSlice.actions;
