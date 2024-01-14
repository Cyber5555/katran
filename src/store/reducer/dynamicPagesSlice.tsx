import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface DynamicPagesDataState {
  dynamic_data: any[];
}

interface DynamicPagesData {
  formData: FormData;
}

export const dynamicPagesRequest = createAsyncThunk<
  any,
  DynamicPagesData,
  { rejectValue: any }
>("dynamic_pages", async (url, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  console.log(url);

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/${url}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const dynamicPagesSlice = createSlice({
  name: "dynamic_pages",
  initialState: {
    dynamic_data: [],
  } as DynamicPagesDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(dynamicPagesRequest.pending, () => {})

      .addCase(dynamicPagesRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;

          state.dynamic_data = payload;
        }
      })

      .addCase(dynamicPagesRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default dynamicPagesSlice.reducer;
