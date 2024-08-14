import { extend } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { WaterMaterial } from "./components/R3F/Mario/Water/WaterMaterial/WaterMaterial.tsx";

extend({ WaterMaterial });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
