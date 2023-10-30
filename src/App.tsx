import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Vehicle/Product";
import Header from "./pages/Header";
import CarList from "./pages/Vehicle/CarList";
import Main from "./pages/Main";
import RentalStatusPage from "./pages/RentalStatus/RentalStatusPage";
import GuestPage from "./pages/Guest/GuestPage";
import EmployeePage from "./pages/Employee/EmployeePage";
import OfficePage from "./pages/Office/OfficePage";
import RepairPage from "./pages/Repair/RepairPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/rentalstatus" element={<RentalStatusPage />}></Route>
          <Route path="/guest" element={<GuestPage />}></Route>
          <Route path="/employee" element={<EmployeePage />}></Route>
          <Route path="/office" element={<OfficePage />}></Route>
          <Route path="/repair" element={<RepairPage />}></Route>
          <Route path="/carlist/*" element={<CarList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
