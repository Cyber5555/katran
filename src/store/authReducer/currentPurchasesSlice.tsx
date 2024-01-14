import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface CreateOrderDataState {
  current_purchases_data: any[]; // Replace 'any' with the actual type of your data
}

interface CreateOrderData {
  formData: FormData;
}

export const currentPurchasesRequest = createAsyncThunk<
  any, // Replace 'any' with the actual return type of your API call
  CreateOrderData,
  { rejectValue: any }
>("current_purchases", async (data, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/profile/current-purchases`,
      headers
      // Remove the 'data' parameter for a GET request
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const currentPurchasesSlice = createSlice({
  name: "current_purchases",
  initialState: {
    current_purchases_data: [],
  } as CreateOrderDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(currentPurchasesRequest.pending, (state) => {})
      .addCase(currentPurchasesRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { actives } = action.payload?.payload;
          state.current_purchases_data = actives;
        }
      })
      .addCase(currentPurchasesRequest.rejected, (state, action) => {
        if (action.payload) {
          const { errors } = action.payload;

          if (errors) {
            // Handle errors if needed
          }
        } else {
          console.error("Unexpected error structure:", action.payload);
        }
      });
  },
});

export default currentPurchasesSlice.reducer;
