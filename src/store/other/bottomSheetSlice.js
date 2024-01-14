import { createSlice } from "@reduxjs/toolkit";

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState: {
    isOpenBottomSheet: false,
    bottomSheetPage: null,
    isSearchable: false,
  },
  reducers: {
    toggleBottomSheet(state, action) {
      state.isOpenBottomSheet = action.payload.isOpen;
      state.bottomSheetPage = action.payload.render;
      state.isSearchable = action.payload.search;
    },
  },
});

export default bottomSheetSlice.reducer;
export const { toggleBottomSheet } = bottomSheetSlice.actions;
