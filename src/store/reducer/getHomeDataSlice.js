import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getHomeDataRequest = createAsyncThunk(
  "get_home_data",
  async ({ rejectWithValue }) => {
    const isAuth = localStorage.getItem("userToken")
      ? `${process.env.REACT_APP_URL}api/home/authenticated`
      : `${process.env.REACT_APP_URL}api/home`;

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:  "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.get(isAuth, headers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getHomeDataSlice = createSlice({
  name: "get_home_data",
  initialState: {
    home_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getHomeDataRequest.pending, () => {})
      .addCase(getHomeDataRequest.fulfilled, (state, action) => {
        if (action.payload.success) state.home_data = action.payload?.payload;
      })
      .addCase(getHomeDataRequest.rejected, () => {});
  },
});

export default getHomeDataSlice.reducer;
