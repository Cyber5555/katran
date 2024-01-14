import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const removeFavoriteRequest = createAsyncThunk(
  "remove_auth_favorites",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/favorites/remove`,
        headers,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const removeFavoriteSlice = createSlice({
  name: "remove_auth_favorites",
  initialState: {},

  extraReducers: (builder) => {
    builder
      .addCase(removeFavoriteRequest.pending, () => {})
      .addCase(removeFavoriteRequest.fulfilled, (state, action) => {})
      .addCase(removeFavoriteRequest.rejected, () => {});
  },
});

export default removeFavoriteSlice.reducer;
