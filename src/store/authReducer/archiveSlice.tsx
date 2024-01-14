import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface ArchiveDataState {
  archive_data: any[]; // Replace 'any' with the actual type of your data
}

interface ArchiveData {
  formData: FormData;
}

export const archiveRequest = createAsyncThunk<
  any, // Replace 'any' with the actual return type of your API call
  ArchiveData,
  { rejectValue: any }
>("archive", async (data, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/profile/archive`,
      headers
      // Remove the 'data' parameter for a GET request
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    archive_data: [],
  } as ArchiveDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(archiveRequest.pending, (state) => {})
      .addCase(archiveRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { archive } = action.payload?.payload;
          state.archive_data = archive;
        }
      })
      .addCase(archiveRequest.rejected, (state, action) => {
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

export default archiveSlice.reducer;
