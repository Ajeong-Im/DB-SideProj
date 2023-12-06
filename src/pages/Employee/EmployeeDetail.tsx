import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Button, Divider } from "@mui/material";
import { domain } from "../../domain/domain";

// 직원 상세 정보 인터페이스
interface EmployeeDetailData {
  id: number;
  name: string;
  position: string;
  phone_number: string;
  email: string;
  wage: {
    bank_account: string;
    amount: string;
  };
}

const EmployeeDetail = () => {
  const { employee_id } = useParams<{ employee_id: string }>();
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeDetailData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/employees/detail/${employee_id}`
        );
        setEmployeeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [employee_id]);

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`${domain}:8000/api/employees/delete/${employee_id}`);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleModifyEmployee = () => {
    navigate(`/employees/modify/${employee_id}`);
  };

  if (!employeeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <img
        src="https://i.ibb.co/xGMVkyk/image.png"
        style={{ width: "300px", height: "300px", margin: "20px 0" }}
      />
      <Typography variant="h4">{employeeDetails.name}</Typography>
      <Typography variant="body1">직급: {employeeDetails.position}</Typography>
      <Typography variant="body1">
        전화번호: {employeeDetails.phone_number}
      </Typography>
      <Typography variant="body1">Email: {employeeDetails.email}</Typography>
      <Typography variant="body1">
        계좌: {employeeDetails.wage.bank_account}
      </Typography>
      <Typography variant="body1">
        월급: ${employeeDetails.wage.amount}
      </Typography>

      {/* 추가적인 정보가 있다면 여기에 계속해서 출력할 수 있습니다. */}

      <Divider style={{ margin: "20px 0" }} />

      {/* 삭제 버튼 추가 */}
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleModifyEmployee}
          style={{ marginBottom: "20px", marginRight: "10px" }}
        >
          직원 수정
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteEmployee}
          style={{ marginBottom: "20px" }}
        >
          직원 삭제
        </Button>
      </div>
    </Paper>
  );
};

export default EmployeeDetail;
