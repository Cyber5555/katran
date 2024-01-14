import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface GetPersonalDataState {
  name: string;
  phone_: string;
  address: string;
  email: string;
}

interface GetPersonalData {
  formData: FormData; // Adjust the type based on your actual FormData structure
}

export const getPersonalDataRequest = createAsyncThunk<
  any,
  GetPersonalData, // Adjust the type based on your API response structure
  { rejectValue: any }
>("add_personal_data", async (arg, { rejectWithValue }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/profile/personal-data`,
      headers
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getPersonalDataSlice = createSlice({
  name: "add_personal_data",
  initialState: {
    name: "",
    phone_: "",
    address: "",
    email: "",
  } as GetPersonalDataState,

  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(getPersonalDataRequest.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(getPersonalDataRequest.fulfilled, (state, action) => {
        // Assuming action.payload has properties like name, phone, address, email
        // Please verify the actual structure of your API response

        state.name = action.payload?.payload?.user?.name ?? "";
        state.phone_ = action.payload?.payload?.user?.phone ?? "";
        state.address = action.payload?.payload?.user?.address ?? "";
        state.email = action.payload?.payload?.user?.email ?? "";
      })
      .addCase(getPersonalDataRequest.rejected, (state, action) => {
        // Handle rejection if needed
        console.error("API request rejected:", action.error);
      });
  },
});

export default getPersonalDataSlice.reducer;
