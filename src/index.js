import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import ThemeContextProvider from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <LanguageProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LanguageProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
