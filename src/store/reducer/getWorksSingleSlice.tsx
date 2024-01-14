import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface GetWorksSingleDataState {
  works_single: any[];
}

interface GetWorksSingleData {
  formData: FormData;
}

export const getWorksSingleRequest = createAsyncThunk<
  any,
  GetWorksSingleData,
  { rejectValue: any }
>("get_works_single", async (url, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/works/${url}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const getWorksSingleSlice = createSlice({
  name: "get_works_single",
  initialState: {
    works_single: [],
  } as GetWorksSingleDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getWorksSingleRequest.pending, () => {})

      .addCase(getWorksSingleRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.works_single = payload;
        }
      })

      .addCase(getWorksSingleRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default getWorksSingleSlice.reducer;
