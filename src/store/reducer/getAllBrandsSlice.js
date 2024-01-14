import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getAllBrandsRequest = createAsyncThunk(
  "get_all_brands",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/brend`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getAllBrandsSlice = createSlice({
  name: "get_all_brands",
  initialState: {
    all_brands_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBrandsRequest.pending, () => {})

      .addCase(getAllBrandsRequest.fulfilled, (state, action) => {
        if (action.payload.success)
          state.all_brands_data = action.payload?.payload;
      })

      .addCase(getAllBrandsRequest.rejected, () => {});
  },
});

export default getAllBrandsSlice.reducer;
