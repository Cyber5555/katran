import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface ArchiveInfoDataState {
  archive_info_data: any[];
}

interface ArchiveInfoData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const archiveInfoRequest = createAsyncThunk<
  any, // Adjust the type based on your API response structure
  ArchiveInfoData,
  { rejectValue: any }
>("archive_info_data", async (_, { rejectWithValue }) => {
  const id = localStorage.getItem("cpID");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };
  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/profile/archive/${id}`,
      headers
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const archiveInfoSlice = createSlice({
  name: "archive_info_data",
  initialState: {
    archive_info_data: [],
  } as ArchiveInfoDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(archiveInfoRequest.pending, (state) => {})
      .addCase(archiveInfoRequest.fulfilled, (state, action) => {
        if (action.payload?.success) {
          const { payload } = action.payload;
          state.archive_info_data = payload;
        }
      })

      .addCase(archiveInfoRequest.rejected, (state, action) => {
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

export default archiveInfoSlice.reducer;
