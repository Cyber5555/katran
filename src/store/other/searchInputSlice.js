import { createSlice } from "@reduxjs/toolkit";

const searchInputSlice = createSlice({
  name: "search_input_value",
  initialState: {
    searchValue: "",
  },
  reducers: {
    changeSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export default searchInputSlice.reducer;
export const { changeSearchValue } = searchInputSlice.actions;
