import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface FaqDataState {
  faq_data: any[];
}

interface FaqData {
  formData: FormData;
}

export const faqRequest = createAsyncThunk<any, FaqData, { rejectValue: any }>(
  "get_faq",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await Http.get(
        `${process.env.REACT_APP_URL}api/hth`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const faqSlice = createSlice({
  name: "get_faq",
  initialState: {
    faq_data: [],
  } as FaqDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(faqRequest.pending, () => {})

      .addCase(faqRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.faq_data = payload;
        }
      })

      .addCase(faqRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default faqSlice.reducer;
