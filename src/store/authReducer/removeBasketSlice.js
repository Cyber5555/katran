import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const removeBasketRequest = createAsyncThunk(
  "remove_auth_basket",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/basket/remove`,
        headers,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const removeBasketSlice = createSlice({
  name: "remove_auth_basket",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeBasketRequest.pending, () => {})
      .addCase(removeBasketRequest.fulfilled, (state, action) => {})
      .addCase(removeBasketRequest.rejected, () => {});
  },
});

export default removeBasketSlice.reducer;
