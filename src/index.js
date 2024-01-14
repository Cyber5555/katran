import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import reportWebVitals from "./reportWebVitals.js";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import i18next from "i18next";
import global_hy from "./translations/hy/global.json";
import global_en from "./translations/en/global.json";
import global_ru from "./translations/ru/global.json";

// detection: {
//   order: ['path', ...otherMethods],
//   // lookupFromPathIndex: 0,
//   checkWhitelist: true
// },

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  fallbackLng: "hy",
  detection: {
    lookupFromPathIndex: 0,
    checkWhitelist: true,
  },
  resources: {
    hy: {
      global: global_hy,
    },
    en: {
      global: global_en,
    },
    ru: {
      global: global_ru,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
