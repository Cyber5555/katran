import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface ContactSendDataState {
  phone_error: string;
  email_error: string;
  message_error: string;
}

interface ContactSendData {
  formData: FormData;
}

export const contactSendRequest = createAsyncThunk<
  any,
  ContactSendData,
  { rejectValue: any }
>("contact_send", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/contacts_application`,
      headers,
      data
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const contactSendSlice = createSlice({
  name: "contact_send",
  initialState: {
    phone_error: "",
  } as ContactSendDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(contactSendRequest.pending, () => {})

      .addCase(contactSendRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          // const { payload } = action.payload;
        }
      })

      .addCase(contactSendRequest.rejected, (state, action) => {
        if (action.payload) {
          const { errors } = action.payload?.data;

          if (errors) {
            state.phone_error = errors?.phone?.[0] || "";
            state.email_error = errors?.phone?.[0] || "";
            state.message_error = errors?.phone?.[0] || "";
          }
        } else {
          // Handle cases where action.payload is not defined
          console.error("Unexpected error structure:", action.payload);
        }
      });
  },
});

export default contactSendSlice.reducer;
