import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const addFavoriteRequest = createAsyncThunk(
  "add_auth_favorites",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/favorites/add`,
        headers,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const addFavoriteSlice = createSlice({
  name: "add_auth_favorites",
  initialState: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteRequest.pending, () => {})
      .addCase(addFavoriteRequest.fulfilled, (state, action) => {})
      .addCase(addFavoriteRequest.rejected, () => {});
  },
});

export default addFavoriteSlice.reducer;
