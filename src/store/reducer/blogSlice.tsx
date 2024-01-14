import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface BlogDataState {
  blog_data: any[];
}

interface BlogData {
  formData: FormData;
}

export const blogRequest = createAsyncThunk<
  any,
  BlogData,
  { rejectValue: any }
>("blog", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/blog`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog_data: [],
  } as BlogDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(blogRequest.pending, () => {})

      .addCase(blogRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;

          state.blog_data = payload;
        }
      })

      .addCase(blogRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default blogSlice.reducer;
