import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const orderInfoRequest = createAsyncThunk(
  "order_info",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/orderInfo`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const orderInfoSlice = createSlice({
  name: "order_info",
  initialState: {
    longitude: Number(),
    latitude: Number(),
    takeAddress: "",
    marketPhone: "",
    regions: [],
    delivery_date: [],
    pickupPoint_id: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderInfoRequest.pending, () => {})
      .addCase(orderInfoRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const pickupPoint = action.payload?.payload?.pickupPoint[0];
          state.longitude = pickupPoint.lng;
          state.latitude = pickupPoint.lat;
          state.takeAddress = pickupPoint.address;
          state.marketPhone = pickupPoint.phone;
          state.pickupPoint_id = pickupPoint.id;
          state.regions = action.payload?.payload?.regions;
          state.delivery_date = action.payload?.payload?.delivery_date;
        }
      })
      .addCase(orderInfoRequest.rejected, () => {});
  },
});

export default orderInfoSlice.reducer;
