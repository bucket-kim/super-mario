import { extend } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  OceanMaterial,
  WaterMaterial,
} from "./components/pages/R3FPage/Mario/Water/WaterMaterial/WaterMaterial.tsx";

extend({ WaterMaterial });
extend({ OceanMaterial });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
