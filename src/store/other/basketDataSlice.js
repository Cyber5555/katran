import { createSlice } from "@reduxjs/toolkit";

const basketDataSlice = createSlice({
  name: "basket_input_data",
  initialState: {
    user_name: "",
    phone: "",
    deliver_type: "",
    city_id: "",
    address: "",
    payment_method: "",
    description: "",
    entrance: "",
    floor: "",
    intercom: "",
    sum: "",
    real_sum: "",
    pickup_point_id: "",
    date_id: "",
  },
  reducers: {
    basketInputData(state, action) {
      const basketData = action.payload;
      state.user_name = basketData.user_name;
      state.phone = basketData.phone;
      state.deliver_type = basketData.deliver_type;
      state.city_id = basketData.city_id;
      state.address = basketData.address;
      state.payment_method = basketData.payment_method;
      state.description = basketData.description;
      state.entrance = basketData.entrance;
      state.floor = basketData.floor;
      state.intercom = basketData.intercom;
      state.sum = basketData.sum;
      state.real_sum = basketData.real_sum;
      state.pickup_point_id = basketData.pickup_point_id;
      state.date_id = basketData.date_id;
    },
  },
});

export default basketDataSlice.reducer;
export const { basketInputData } = basketDataSlice.actions;
