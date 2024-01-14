import { createSlice } from "@reduxjs/toolkit";

const updateCountsSlice = createSlice({
  name: "controller_page",
  initialState: {
    favorite_count: 0,
    basket_count: 0,
    count_every_item: 0,
  },
  reducers: {
    favoriteCount(state, action) {
      state.favorite_count = action.payload.favorite;
    },
    basketCount(state, action) {
      state.basket_count = action.payload.baskets;
    },

    changeCountEveryProduct(state, action) {
      state.count_every_item = action.payload;
    },
  },
});

export default updateCountsSlice.reducer;
export const { favoriteCount, basketCount, changeCountEveryProduct } =
  updateCountsSlice.actions;
