import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { domain } from "../../domain/domain";

function AddCar() {
  const [car_name, setName] = useState(""); // 차량명
  const [car_brand, setBrand] = useState(""); // 브랜드
  const [car_maxnum, setMaxnum] = useState(""); // 최대 탑승 인원
  const [car_drivdist, setDrivdist] = useState(""); // 주행거리
  const [car_cost, setCost] = useState(""); // 하루 대여 가격

  const user_uuid = localStorage.getItem("user_uuid");

  function sendDataToServer(): Promise<AxiosResponse> {
    const apiUrl = `${domain}:8000/api/v1/cars/add/${user_uuid}/`;

    const data = {
      car_name,
      car_brand,
      car_maxnum,
      car_drivdist,
      car_cost,
    };

    return axios.post(apiUrl, data);
  }

  const handleSubmitModal = () => {
    sendDataToServer()
      .then((response: AxiosResponse) => {
        console.log("데이터 전송에 성공했습니다!", response.data);
      })
      .catch((error) => {
        console.error("데이터 전송 실패", error);
      });
  };

  return (
    <div className="flex justify-center items-center ml-10px h-60px">
      <div>
        <h2 className="font-bold text-center text-[40px] mb-6 mt-20">
          새 차량 등록
        </h2>
        <div className="mt-3 space-y-3">
          <div className="text-left">
            <label className="label text-[18px] font-medium">차량 종류</label>
            <div className="flex space-x-3">
              <input
                type="text"
                className="w-80 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={car_name}
                placeholder="소나타"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">차량 브랜드</label>
            <div className="flex space-x-3">
              <input
                type="text"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={car_brand}
                placeholder="현대"
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">
              최대 탑승 인원
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={car_maxnum}
                onChange={(event) => setMaxnum(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">주행 거리</label>
            <div className="flex space-x-3">
              <input
                type="text"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={car_drivdist}
                placeholder="5000km"
                onChange={(event) => setDrivdist(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">
              하루 대여 가격
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={car_cost}
                placeholder="10,000"
                onChange={(event) => setCost(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <Link to="/car">
            <button
              type="submit"
              className="w-full mt-4 bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmitModal}
            >
              차량 등록
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
