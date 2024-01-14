import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from "../../http";

interface GetProductsDataState {
  products_data: any[];
}

interface GetProductsData {
  formData: FormData;
  category_name: string;
  criteria: any[];
  priceRange: object;
  brand: any[];
  new_product: string;
  sortType: string;
  category: any[];
}

export const getProductsDataRequest = createAsyncThunk<
  any,
  GetProductsData,
  { rejectValue: any }
>("get_products_data", async (data, { rejectWithValue }) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let formData = {
    criteria: data.criteria,
    priceRange: data.priceRange,
    brand: data.brand,
    new: data.new_product,
    sortType: data.sortType,
    category: data.category,
  };

  try {
    const response = await Http.post(
      `${process.env.REACT_APP_URL}api/products/${data.category_name}`,
      headers,
      formData
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const getProductsDataSlice = createSlice({
  name: "get_products_data",
  initialState: {
    products_data: [],
  } as GetProductsDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProductsDataRequest.pending, () => {})

      .addCase(getProductsDataRequest.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { payload } = action.payload;
          state.products_data = payload;
        }
      })

      .addCase(getProductsDataRequest.rejected, (state, action) => {
        console.error("Error fetching products:", action.error);
        // Handle error state or show a notification to the user
      });
  },
});

export default getProductsDataSlice.reducer;
