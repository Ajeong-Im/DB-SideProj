import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const officeListData = [
  {
    id: 1,
    office_name: "강남점",
    office_tel: "010-1234-5678",
    office_addr: "서울시 강남구",
  },
  {
    id: 2,
    office_name: "역삼점",
    office_tel: "010-8765-4321",
    office_addr: "서울시 역삼동",
  },
];

const OfficePage = () => {
  const [officeList, setOfficeList] = useState([]);

  return (
    <>
      <Link to={"/addoffice"}>
        <button className="bg-orange-200 mb-3 mt-3">지점 추가</button>
      </Link>
      <h3 className="text-lg w-full bg-yellow-200">지점 목록</h3>
      <ul>
        {officeListData.map((office) => (
          <Link key={office.id} to={`/office/${office.id}`}>
            <li>{`${office.office_name} : ${office.office_tel} 주소: ${office.office_addr}`}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default OfficePage;
