import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface BlogSingleDataState {
  blog_single_data: any[];
}

interface BlogSingleData {
  formData: FormData;
}

export const blogSingleRequest = createAsyncThunk<
  any,
  BlogSingleData,
  { rejectValue: any }
>("blog_single", async (url, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await Http.get(
      `${process.env.REACT_APP_URL}api/blog/${url}`,
      headers
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const blogSingleSlice = createSlice({
  name: "blog_single",
  initialState: {
    blog_single_data: [],
  } as BlogSingleDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(blogSingleRequest.pending, () => {})

      .addCase(blogSingleRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;

          state.blog_single_data = payload;
        }
      })

      .addCase(blogSingleRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default blogSingleSlice.reducer;
