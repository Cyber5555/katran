import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const registerRequest = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const oldFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const oldBaskets = JSON.parse(localStorage.getItem("baskets")) || [];

    const newFavorites = oldFavorites
      .filter((item) => item.id !== null && item.id !== undefined)
      .map((item) => item.id.toString());

    const newBaskets = oldBaskets
      .filter((item) => item.id !== null && item.id !== undefined)
      .map((item) => ({
        product_id: item.id.toString(),
        count: item.count_user_basket,
      }));

    let new_data = {
      email: data.formData.email,
      password: data.formData.password,
      password_confirmation: data.formData.password_confirmation,
      company_name: data.formData.company_name,
      bank: data.formData.bank,
      bank_account: data.formData.bank_account,
      legal_address: data.formData.legal_address,
      type: data.formData.type,
      phone: data.formData.phone,
      code: data.formData.code,
      agree: data.agree,
      favorite_list: newFavorites,
      basket_list: newBaskets,
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/register`,
        headers,
        new_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    success_register: false,
    email_error: "",
    phone_error: "",
    password_error: "",
    password_confirmation_error: "",
    company_name_error: "",
    code_error: "",
    bank_error: "",
    bank_account_error: "",
    legal_address_error: "",
    agree_error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerRequest.pending, () => {})

      .addCase(registerRequest.fulfilled, () => {})

      .addCase(registerRequest.rejected, (state, action) => {
        const { errors } = action.payload;
        state.email_error = errors?.email;
        state.phone_error = errors?.phone;
        state.password_error = errors?.password;
        state.password_confirmation_error = errors?.password_confirmation;
        state.company_name_error = errors?.company_name;
        state.code_error = errors?.code;
        state.bank_error = errors?.bank;
        state.bank_account_error = errors?.bank_account;
        state.legal_address_error = errors?.legal_address;
        state.agree_error = errors?.agree;
      });
  },
});

export default registerSlice.reducer;
