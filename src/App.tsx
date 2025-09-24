import React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Manager from "./pages/manager/Manager";
import Driver from "./pages/Driver";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/driver" element={<Driver />} />
        {/* <Route path="/about" element={<h1>О нас</h1>} />
        <Route path="*" element={<h1>Страница не найдена</h1>} /> */}
      </Routes>
    </>
  );
}

export default App;
