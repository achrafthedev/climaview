import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import store from "./redux/store"; // ✅ Ensure correct path to store.js
import App from "./App";
import ThemeContextProvider from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>  {/* ✅ Wrap App with Redux Provider */}
        <App />
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);
