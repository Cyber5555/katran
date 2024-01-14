import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getFavoriteRequest = createAsyncThunk(
  "get_auth_favorites",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/favorites/list`,
        headers,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const getFavoriteSlice = createSlice({
  name: "get_auth_favorites",
  initialState: {
    auth_favorites_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteRequest.pending, () => {})
      .addCase(getFavoriteRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.payload.status === "Empty Cart") {
            state.auth_favorites_data = [];
          } else {
            const itemsArray = action.payload.payload || [];

            const items = itemsArray.map((item) => {
              return {
                title: item.items[0].title,
                description: item.items[0].description,
                price: item.items[0].price,
                active: item.items[0].active,
                brands: item.items[0].brands,
                code: item.items[0].code,
                company_new_price: item.items[0].company_new_price,
                company_percent: item.items[0].company_percent,
                company_price: item.items[0].company_price,
                count: item.items[0].count,
                created_at: item.items[0].created_at,
                id: item.items[0].id,
                image: item.items[0].image,
                manufacturer: item.items[0].manufacturer,
                measurement: item.items[0].measurement,
                new_price: item.items[0].new_price,
                percent: item.items[0].percent,
                seo_description: item.items[0].seo_description,
                seo_keywords: item.items[0].seo_keywords,
                seo_title: item.items[0].seo_title,
                sort: item.items[0].sort,
                updated_at: item.items[0].updated_at,
                url: item.items[0].url,
                user_id: item.user_id,
                count_user_basket: item.items[0].count_user_basket,
              };
            });

            state.auth_favorites_data = items;
          }
        }
      })
      .addCase(getFavoriteRequest.rejected, () => {});
  },
});
export default getFavoriteSlice.reducer;
