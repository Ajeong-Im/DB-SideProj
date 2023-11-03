import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { domain } from "../../domain/domain";

function EnrollPage() {
  const [guest_name, setName] = useState("");
  const [guest_phone, setPhone] = useState("");
  const [guest_email, setEmail] = useState("");
  const [guest_license, setlicense] = useState("");

  const user_uuid = localStorage.getItem("user_uuid");

  function sendDataToServer(): Promise<AxiosResponse> {
    const apiUrl = `${domain}:8000/api/v1/guests/add/${user_uuid}/`;

    const data = {
      guest_name,
      guest_phone,
      guest_email,
      guest_license,
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
          새 고객 등록
        </h2>
        <div className="mt-3 space-y-3">
          <div className="text-left">
            <label className="label text-[18px] font-medium">이름</label>
            <div className="flex space-x-3">
              <input
                type="name"
                className="w-80 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={guest_name}
                placeholder="홍길동"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">전화번호</label>
            <div className="flex space-x-3">
              <input
                type="string"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={guest_phone}
                placeholder="010-0000-0000"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">Email</label>
            <div className="flex space-x-3">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
                value={guest_email}
                placeholder="name@company.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="text-left">
            <label className="label text-[18px] font-medium">
              운전면허번호
            </label>
            <div className="flex space-x-3">
              <input
                type="string"
                className="w-full h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4 mb-4"
                value={guest_license}
                placeholder="00-00-000000-00"
                onChange={(event) => setlicense(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <Link to="/guest">
            <button
              type="submit"
              className="w-full bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmitModal}
            >
              고객 등록
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollPage;
