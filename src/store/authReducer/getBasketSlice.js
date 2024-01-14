import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

export const getBasketRequest = createAsyncThunk(
  "get_auth_basket",
  async ({ rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };

    try {
      let response = await Http.get(
        `${process.env.REACT_APP_URL}api/basket/list`,
        headers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const getBasketSlice = createSlice({
  name: "get_auth_basket",
  initialState: {
    auth_basket_data: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBasketRequest.pending, () => {})
      .addCase(getBasketRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          if (action.payload.payload.status === "Empty Cart") {
            state.auth_basket_data = [];
          } else {
            const itemsArray = action.payload.payload || [];
            const items = itemsArray.map((item) => {
              return {
                id: item.item.id,
                title: item.item.title,
                description: item.item.description,
                price: item.item.price,
                new_price: item.item.new_price,
                percent: item.item.percent,
                company_price: item.item.company_price,
                company_new_price: item.item.company_new_price,
                company_percent: item.item.company_percent,
                count_product: item.item.count,
                measurement: item.item.measurement,
                image: item.item.image,
                code: item.item.code,
                sort: item.item.sort,
                active: item.item.active,
                new: item.item.new,
                url: item.item.url,
                brands: item.item.brands,
                manufacturer: item.item.manufacturer,
                seo_keywords: item.item.seo_keywords,
                seo_description: item.item.seo_description,
                seo_title: item.item.seo_title,
                created_at: item.item.created_at,
                updated_at: item.item.updated_at,
                count: item.item.count,
                user_id: item.user_id,
                size_id: item.size_id,
                is_item: item.is_item,
                count_user_basket: item.item.count_user_basket,
              };
            });

            state.auth_basket_data = items;
          }
        }
      })
      .addCase(getBasketRequest.rejected, () => {});
  },
});

export default getBasketSlice.reducer;
