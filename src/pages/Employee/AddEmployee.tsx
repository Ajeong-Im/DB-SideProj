import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Snackbar } from "@mui/material";
import { domain } from "../../domain/domain";

const AddEmployee = () => {
  const { office_id } = useParams<{ office_id: string }>();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    phone_number: "",
    email: "",
    bank_account: {
      bank_account: "",
      amount: "",
    },
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("bank_account.")) {
      // 'bank_account' 객체 내부의 속성을 업데이트합니다.
      const fieldName = name.split(".")[1];
      setEmployeeData((prevState) => ({
        ...prevState,
        bank_account: {
          ...prevState.bank_account,
          [fieldName]: value,
        },
      }));
    } else {
      // 다른 필드를 업데이트합니다.
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(
        `${domain}:8000/api/employees/add/${office_id}`,
        employeeData
      );
      setOpenSnackbar(true);
      setTimeout(() => navigate(`/office/${office_id}`), 2000);
    } catch (error) {
      console.error("Error posting employee data:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <h2 className="font-bold text-[30px] mb-4">직원 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">이름</label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
            />
          </div>
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">직급</label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="position"
              value={employeeData.position}
              onChange={handleChange}
            />
          </div>
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">전화번호</label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="phone_number"
              value={employeeData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">Email</label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
            />
          </div>
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">
              은행 계좌번호
            </label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="bank_account.bank_account"
              value={employeeData.bank_account.bank_account}
              onChange={handleChange}
            />
          </div>
          <div className=" text-left mb-3">
            <label className="text-[18px] font-medium mr-4">월급</label>
            <br />
            <input
              type="Name"
              className=" w-60 h-10 border border-gray-300 shadow-md rounded-md text-sm pl-4"
              name="bank_account.amount"
              value={employeeData.bank_account.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          등록하기
        </button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="등록이 완료되었습니다!"
      />
    </Paper>
  );
};

export default AddEmployee;
