import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./pages/Header";
import CarList from "./pages/CarList";
import Main from "./pages/Main";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/carlist/*" element={<CarList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
