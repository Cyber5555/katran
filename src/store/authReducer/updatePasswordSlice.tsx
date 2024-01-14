import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface UpdatePasswordState {
  current_password_error: string;
  password_error: string;
  confirm_password_error: string;
}

interface UpdatePasswordData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const updatePasswordRequest = createAsyncThunk<
  any, // Adjust the type based on your API response structure
  UpdatePasswordData,
  { rejectValue: any }
>("update_password", async (data, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };
  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/profile/settings/password-update`,
      headers,
      data
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const updatePasswordSlice = createSlice({
  name: "update_password",
  initialState: {
    current_password_error: "",
    password_error: "",
    confirm_password_error: "",
  } as UpdatePasswordState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordRequest.pending, (state) => {})
      .addCase(updatePasswordRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.confirm_password_error = "";
          state.current_password_error = "";
          state.password_error = "";
        }
      })

      .addCase(updatePasswordRequest.rejected, (state, action) => {
        if (action.payload) {
          const { errors } = action.payload;

          if (errors) {
            state.current_password_error = errors.current_password?.[0] || "";
            state.password_error = errors.password?.[0] || "";
            state.confirm_password_error = errors.confirm_password?.[0] || "";
          }
        } else {
          // Handle cases where action.payload is not defined
          console.error("Unexpected error structure:", action.payload);
        }
      });

    // ... (remaining code)
  },
});

export default updatePasswordSlice.reducer;
