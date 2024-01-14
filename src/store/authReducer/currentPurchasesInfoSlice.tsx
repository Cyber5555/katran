import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface currentPurchasesInfoDataState {
  current_purchases_info_data: any[];
}

interface currentPurchasesInfoData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const currentPurchasesInfoRequest = createAsyncThunk<
  any, // Adjust the type based on your API response structure
  currentPurchasesInfoData,
  { rejectValue: any }
>("current_purchases_info_data", async (_, { rejectWithValue }) => {
  const id = localStorage.getItem("cpID");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };
  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/profile/active/${id}`,
      headers
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const currentPurchasesInfoSlice = createSlice({
  name: "current_purchases_info_data",
  initialState: {
    current_purchases_info_data: [],
  } as currentPurchasesInfoDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(currentPurchasesInfoRequest.pending, (state) => {})
      .addCase(currentPurchasesInfoRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          const { payload } = action.payload;
          state.current_purchases_info_data = payload;
        }
      })

      .addCase(currentPurchasesInfoRequest.rejected, (state, action) => {
        // if (action.payload) {
        //   const { errors } = action.payload;
        //   if (errors) {
        //     state.name_error = errors.name?.[0] || "";
        //   }
        // } else {
        //   // Handle cases where action.payload is not defined
        //   console.error("Unexpected error structure:", action.payload);
        // }
      });

    // ... (remaining code)
  },
});

export default currentPurchasesInfoSlice.reducer;
