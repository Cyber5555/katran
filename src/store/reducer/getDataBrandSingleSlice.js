import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getDataBrandSingleRequest = createAsyncThunk(
  "get_single_brand_data",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/products/brand/${data.brand_url}`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getDataBrandSingleSlice = createSlice({
  name: "get_single_brand_data",
  initialState: {
    single_brand_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDataBrandSingleRequest.pending, () => {})

      .addCase(getDataBrandSingleRequest.fulfilled, (state, action) => {
        if (action.payload.success)
          state.single_brand_data = action.payload?.payload;
      })

      .addCase(getDataBrandSingleRequest.rejected, () => {});
  },
});

export default getDataBrandSingleSlice.reducer;
