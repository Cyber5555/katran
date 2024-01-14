import { createSlice } from "@reduxjs/toolkit";

const controllerPageSlice = createSlice({
  name: "controller_page",
  initialState: {
    isLeftBarOpen: false,
  },
  reducers: {
    toggleControllerPage(state) {
      state.isLeftBarOpen = !state.isLeftBarOpen;
    },
  },
});

export default controllerPageSlice.reducer;
export const { toggleControllerPage } = controllerPageSlice.actions;
