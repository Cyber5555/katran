import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface SearchDataState {
  search_data: any[];
}

interface SearchData {
  formData: FormData;
}

export const searchRequest = createAsyncThunk<
  any,
  SearchData,
  { rejectValue: any }
>("search", async (value, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/search`,
      headers,
      { search: value }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search_data: [],
  } as SearchDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchRequest.pending, () => {})

      .addCase(searchRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.search_data = payload;
        }
      })

      .addCase(searchRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default searchSlice.reducer;
