import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const loginRequest = createAsyncThunk(
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
      favorite_list: newFavorites,
      basket_list: newBaskets,
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/login`,
        headers,
        new_data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "register",
  initialState: {
    email_error: "",
    password_error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, () => {})

      .addCase(loginRequest.fulfilled, () => {})

      .addCase(loginRequest.rejected, (state, action) => {
        const { errors } = action.payload;
        if (errors?.email || errors?.password) {
          state.email_error = errors?.email;
          state.password_error = errors?.password;
        } else {
          state.email_error = errors;
          state.password_error = errors;
        }
      });
  },
});

export default loginSlice.reducer;
