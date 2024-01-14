import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const addBasketRequest = createAsyncThunk(
  "add_auth_basket",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/basket/add`,
        headers,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const addBasketSlice = createSlice({
  name: "add_auth_basket",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBasketRequest.pending, () => {})
      .addCase(addBasketRequest.fulfilled, (state, action) => {})
      .addCase(addBasketRequest.rejected, () => {});
  },
});

export default addBasketSlice.reducer;
