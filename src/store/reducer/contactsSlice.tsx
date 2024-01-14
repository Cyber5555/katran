import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface ContactsDataState {
  contact_data: any[];
  longitude: number;
  latitude: number;
  get_address: string;
  get_phone: string;
  get_email: string;
}

interface ContactsData {
  formData: FormData;
}

export const contactsRequest = createAsyncThunk<
  any,
  ContactsData,
  { rejectValue: any }
>("contacts", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/kontaktner`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contact_data: [],
    longitude: Number(),
    latitude: Number(),
    get_address: "",
    get_phone: "",
    get_email: "",
  } as ContactsDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(contactsRequest.pending, () => {})

      .addCase(contactsRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          const pickupPoint = payload?.pickupPoint[0];
          state.longitude = pickupPoint?.lng;
          state.latitude = pickupPoint?.lat;
          state.get_address = pickupPoint?.address;
          state.get_phone = pickupPoint?.phone;
          state.get_email = pickupPoint?.email;

          state.contact_data = payload;
        }
      })

      .addCase(contactsRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default contactSlice.reducer;
