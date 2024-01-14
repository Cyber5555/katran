import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface PromoDataState {
  promo_data: any[];
}

interface PromoData {
  formData: FormData;
}

export const promoRequest = createAsyncThunk<
  any,
  PromoData,
  { rejectValue: any }
>("promo", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/akcii`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const promoSlice = createSlice({
  name: "promo",
  initialState: {
    promo_data: [],
  } as PromoDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(promoRequest.pending, () => {})

      .addCase(promoRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.promo_data = payload;
        }
      })

      .addCase(promoRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default promoSlice.reducer;
