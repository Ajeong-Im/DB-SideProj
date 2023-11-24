import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Vehicle/Product";
import Header from "./pages/Header";
import CarList from "./pages/Vehicle/CarList";
import Main from "./pages/Main";
import RentalStatusPage from "./pages/RentalStatus/RentalStatusPage";
import GuestPage from "./pages/Guest/GuestPage";
import OfficePage from "./pages/Office/OfficePage";
import RepairPage from "./pages/Repair/RepairPage";
import AddCar from "./pages/Vehicle/AddCar";
import AddEmployee from "./pages/Employee/AddEmployee";
import OfficeAdd from "./pages/Office/OfficeAdd";
import OfficeDetail from "./pages/Office/OfficeDetail";
import CarDetail from "./pages/Vehicle/CarDetail";
import OfficeModify from "./pages/Office/OfficeModify";
import EmployeeDetail from "./pages/Employee/EmployeeDetail";
import CarModify from "./pages/Vehicle/CarModify";
import AddGuest from "./pages/Guest/AddGuest";
import GuestDetail from "./pages/Guest/GuestDetail";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/rentalstatus" element={<RentalStatusPage />}></Route>
          <Route path="/guest" element={<GuestPage />}></Route>
          <Route path="/office" element={<OfficePage />}></Route>
          <Route path="/repair" element={<RepairPage />}></Route>
          <Route path="/carlist" element={<CarList />}></Route>
          <Route path="/product/*" element={<Product />}></Route>
          <Route path="/car/add" element={<AddCar />}></Route>
          <Route path="/office/add" element={<OfficeAdd />}></Route>
          <Route path="/guest/add" element={<AddGuest />}></Route>
          <Route path="/office/:office_id" element={<OfficeDetail />}></Route>
          <Route path="guest/:guest_id" element={<GuestDetail />}></Route>
          <Route
            path="/employee/register/:office_id"
            element={<AddEmployee />}
          />
          <Route path="/car/:car_id" element={<CarDetail />} />
          <Route path="employee/:employee_id" element={<EmployeeDetail />} />
          <Route path="/office/modify/:office_id" element={<OfficeModify />} />
          <Route path="/car/modify/:car_id/*" element={<CarModify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
