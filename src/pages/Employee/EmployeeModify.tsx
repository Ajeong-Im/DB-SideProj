import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { domain } from "../../domain/domain";

const EmployeeModify = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    phone_number: "",
    email: "",
    wage: {
      amount: "",
    },
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/employees/detail/${employee_id}`
        );
        console.log(response.data);
        const { name, position, phone_number, email } = response.data;
        const { amount } = response.data.wage;

        setEmployeeData({
          name,
          position,
          phone_number,
          email,
          wage: { amount },
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchEmployeeData();
  }, [employee_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployeeData((prevData) => {
      if (name === "position" || name === "phone_number" || name === "email") {
        return {
          ...prevData,
          [name]: value,
        };
      } else if (name === "bank_account" || name === "amount") {
        return {
          ...prevData,
          wage: {
            ...prevData.wage,
            [name]: value,
          },
        };
      }

      return prevData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${domain}:8000/api/employees/update/${employee_id}`,
        employeeData
      );
      console.log("Response:", response.data);
      navigate(-1); // 성공 후 이전 페이지로 이동
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">직원 수정</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="직급"
          name="position"
          value={employeeData.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="전화번호"
          name="phone_number"
          value={employeeData.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="월급"
          name="amount"
          value={employeeData.wage.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          직원 수정
        </Button>
      </form>
    </Paper>
  );
};

export default EmployeeModify;
