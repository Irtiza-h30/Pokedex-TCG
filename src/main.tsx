import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "styles/index.scss";
import ColorThemeProvider from "contexts/ColorThemeProvider/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorThemeProvider>
      <App />
    </ColorThemeProvider>
  </React.StrictMode>
);
