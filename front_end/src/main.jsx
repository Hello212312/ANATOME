// ANATOME - Sidharth Mantri, Pranav Arun Pillai, Rishi Tadi
// Note: this code was generated with AI assistance (Claude). See README.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { wakeBackend } from "./utils/wakeBackend";

// start booting the API while the patient is still on the landing page
wakeBackend().catch(() => {});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);