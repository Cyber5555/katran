import { createSlice } from "@reduxjs/toolkit";

const openBurgerMenuSlice = createSlice({
  name: "burger-menu",
  initialState: {
    isOpenBurgerMenu: false,
  },
  reducers: {
    setIsOpenBurgerMenu(state) {
      state.isOpenBurgerMenu = !state.isOpenBurgerMenu;
    },
  },
});

export default openBurgerMenuSlice.reducer;
export const { setIsOpenBurgerMenu } = openBurgerMenuSlice.actions;
