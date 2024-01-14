import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getSingleProductRequest = createAsyncThunk(
  "get_single_products",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/product/${data.product_url}`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getSingleProductSlice = createSlice({
  name: "get_single_products",
  initialState: {
    single_product: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingleProductRequest.pending, () => {})

      .addCase(getSingleProductRequest.fulfilled, (state, action) => {
        if (action.payload.success)
          state.single_product = action.payload?.payload;
      })

      .addCase(getSingleProductRequest.rejected, () => {});
  },
});

export default getSingleProductSlice.reducer;
