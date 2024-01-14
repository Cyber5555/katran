import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import getHeaderDataSlice from "./reducer/getHeaderDataSlice";
import getHomeDataSlice from "./reducer/getHomeDataSlice";
import getSingleProductSlice from "./reducer/getSingleProductSlice";
import getAllBrandsSlice from "./reducer/getAllBrandsSlice";
import getDataBrandSingleSlice from "./reducer/getDataBrandSingleSlice";
import registerSlice from "./reducer/registerSlice";
import loginSlice from "./reducer/loginSlice";
import bottomSheetSlice from "./other/bottomSheetSlice";
import getBasketSlice from "./authReducer/getBasketSlice";
import controllerPageSlice from "./other/controllerPageSlice";
import getFavoriteSlice from "./authReducer/getFavoriteSlice.js";
import addBasketSlice from "./authReducer/addBasketSlice.js";
import updateCountsSlice from "./other/updateCountsSlice.js";
import updatePasswordSlice from "./authReducer/updatePasswordSlice.tsx";
import addPersonalDataSlice from "./authReducer/addPersonalDataSlice.tsx";
import getPersonalDataSlice from "./authReducer/getPersonalDataSlice.tsx";
import orderInfoSlice from "./reducer/orderInfoSlice.js";
import basketDataSlice from "./other/basketDataSlice.js";
import currentPurchasesSlice from "./authReducer/currentPurchasesSlice.tsx";
import filterDataSlice from "./other/filterDataSlice.tsx";
import archiveSlice from "./authReducer/archiveSlice.tsx";
import getWorksSlice from "./reducer/getWorksSlice.tsx";
import getWorksSingleSlice from "./reducer/getWorksSingleSlice.tsx";
import getProductsDataSlice from "./reducer/getProductsDataSlice.tsx";
import faqSlice from "./reducer/faqSlice.tsx";
import contactsSlice from "./reducer/contactsSlice.tsx";
import blogSlice from "./reducer/blogSlice.tsx";
import blogSingleSlice from "./reducer/blogSingleSlice.tsx";
import dynamicPagesSlice from "./reducer/dynamicPagesSlice.tsx";
import archiveInfoSlice, {
  archiveInfoRequest,
} from "./authReducer/archiveInfoSlice.tsx";
import searchSlice from "./reducer/searchSlice.tsx";
import searchInputSlice from "./other/searchInputSlice.js";
import currentPurchasesInfoSlice from "./authReducer/currentPurchasesInfoSlice.tsx";
import openBurgerMenuSlice from "./other/openBurgerMenuSlice.js";
import promoSlice from "./reducer/promoSlice.tsx";
import contactSendSlice from "./reducer/contactSendSlice.tsx";

const rootReducer = combineReducers({
  getHeaderDataSlice: getHeaderDataSlice,
  getHomeDataSlice: getHomeDataSlice,
  getProductsDataSlice: getProductsDataSlice,
  getSingleProductSlice: getSingleProductSlice,
  getAllBrandsSlice: getAllBrandsSlice,
  getDataBrandSingleSlice: getDataBrandSingleSlice,
  registerSlice: registerSlice,
  loginSlice: loginSlice,
  getBasketSlice: getBasketSlice,
  bottomSheetSlice: bottomSheetSlice,
  controllerPageSlice: controllerPageSlice,
  getFavoriteSlice: getFavoriteSlice,
  addBasketSlice: addBasketSlice,
  orderInfoSlice: orderInfoSlice,
  updateCountsSlice: updateCountsSlice,
  updatePasswordSlice: updatePasswordSlice,
  addPersonalDataSlice: addPersonalDataSlice,
  getPersonalDataSlice: getPersonalDataSlice,
  basketDataSlice: basketDataSlice,
  currentPurchasesSlice: currentPurchasesSlice,
  filterDataSlice: filterDataSlice,
  archiveSlice: archiveSlice,
  getWorksSlice: getWorksSlice,
  getWorksSingleSlice: getWorksSingleSlice,
  faqSlice: faqSlice,
  contactSlice: contactsSlice,
  blogSlice: blogSlice,
  blogSingleSlice: blogSingleSlice,
  dynamicPagesSlice: dynamicPagesSlice,
  archiveInfoSlice: archiveInfoSlice,
  searchSlice: searchSlice,
  searchInputSlice: searchInputSlice,
  currentPurchasesInfoSlice: currentPurchasesInfoSlice,
  openBurgerMenuSlice: openBurgerMenuSlice,
  promoSlice: promoSlice,
  contactSendSlice: contactSendSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
