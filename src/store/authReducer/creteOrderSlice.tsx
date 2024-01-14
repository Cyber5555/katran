import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface CreateOrderDataState {}

interface CreateOrderData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const createOrderRequest = createAsyncThunk<
  any, // Adjust the type based on your API response structure
  CreateOrderData,
  { rejectValue: any }
>("create_order", async (data, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/orders/create`,
      headers,
      data
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const createOrderSlice = createSlice({
  name: "create_order",
  initialState: {} as CreateOrderDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(createOrderRequest.pending, (state) => {})
      .addCase(createOrderRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
        }
      })

      .addCase(createOrderRequest.rejected, (state, action) => {
        if (action.payload) {
          const { errors } = action.payload;

          if (errors) {
            // state.name_error = errors.name?.[0] || "";
            // state.phone_error = errors.phone?.[0] || "";
            // state.address_error = errors.address?.[0] || "";
            // state.email_error = errors.email?.[0] || "";
          }
        } else {
          console.error("Unexpected error structure:", action.payload);
        }
      });

    // ... (remaining code)
  },
});

export default createOrderSlice.reducer;
