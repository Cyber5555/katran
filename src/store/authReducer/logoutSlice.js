import { createAsyncThunk } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const logoutRequest = createAsyncThunk(
  "logout",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    try {
      let response = await Http.post(
        `${process.env.REACT_APP_URL}api/logout`,
        headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
