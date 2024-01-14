import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdatePersonalDataState {
  name_error: string;
  phone_error: string;
  address_error: string;
  email_error: string;
}

interface UpdatePersonalData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const addPersonalDataRequest = createAsyncThunk<
  any, // Adjust the type based on your API response structure
  UpdatePersonalData,
  { rejectValue: any }
>("add_personal_data", async (data, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };
  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/profile/personal-data/update`,
      headers,
      data
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addPersonalDataSlice = createSlice({
  name: "add_personal_data",
  initialState: {
    name_error: "",
    phone_error: "",
    address_error: "",
    email_error: "",
  } as UpdatePersonalDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(addPersonalDataRequest.pending, (state) => {})
      .addCase(addPersonalDataRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.address_error = "";
          state.email_error = "";
          state.name_error = "";
          state.phone_error = "";
        }
      })

      .addCase(addPersonalDataRequest.rejected, (state, action) => {
        if (action.payload) {
          const { errors } = action.payload;

          if (errors) {
            state.name_error = errors.name?.[0] || "";
            state.phone_error = errors.phone?.[0] || "";
            state.address_error = errors.address?.[0] || "";
            state.email_error = errors.email?.[0] || "";
          }
        } else {
          // Handle cases where action.payload is not defined
          console.error("Unexpected error structure:", action.payload);
        }
      });

    // ... (remaining code)
  },
});

export default addPersonalDataSlice.reducer;
