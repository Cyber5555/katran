import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getHeaderDataRequest = createAsyncThunk(
  "get_header_data",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/header`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getHeaderDataSlice = createSlice({
  name: "get_header_data",
  initialState: {
    header_footer_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getHeaderDataRequest.pending, () => {})

      .addCase(getHeaderDataRequest.fulfilled, (state, action) => {
        if (action.payload.success)
          state.header_footer_data = action.payload?.payload;
      })

      .addCase(getHeaderDataRequest.rejected, () => {});
  },
});

export default getHeaderDataSlice.reducer;
