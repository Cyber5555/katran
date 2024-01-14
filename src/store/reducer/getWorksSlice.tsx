import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface GetWorksDataState {
  works_data: any[];
}

interface GetWorksData {
  formData: FormData;
}

export const getWorksRequest = createAsyncThunk<
  any,
  GetWorksData,
  { rejectValue: any }
>("get_works", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/ashkhatanq`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const getWorksSlice = createSlice({
  name: "get_works",
  initialState: {
    works_data: [],
  } as GetWorksDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getWorksRequest.pending, () => {})

      .addCase(getWorksRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.works_data = payload;
        }
      })

      .addCase(getWorksRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default getWorksSlice.reducer;
