import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const carListData = [
  {
    id: 1,
    car_name: "소나타",
    car_brand: "현대",
    car_maxnum: 5,
    car_drivdist: "5000km",
    car_cost: "10,000",
  },
  {
    id: 2,
    car_name: "아반떼",
    car_brand: "현대",
    car_maxnum: 4,
    car_drivdist: "3000km",
    car_cost: "12,000",
  },
];

const CarList = () => {
  const [carList, setCarList] = useState([]);

  return (
    <>
      <h3 className="text-lg w-full bg-yellow-200">차량 목록</h3>
      <ul>
        {carListData.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <li>{`${car.car_name} - ${car.car_brand} - 최대 탑승 인원: ${car.car_maxnum} - 주행 거리: ${car.car_drivdist} - 하루 대여 가격: ${car.car_cost}`}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default CarList;
