import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, List, ListItem, Divider } from "@mui/material";
import { domain } from "../../domain/domain";

// 직원 상세 정보 인터페이스
interface EmployeeDetailData {
  id: number;
  name: string;
  position: string;
  phone_number: string;
  email: string;
  bank_account: {
    bank_account: string;
    amount: string;
  };
}

const EmployeeDetail = () => {
  const { employee_id } = useParams<{ employee_id: string }>(); // URL 파라미터에서 employee_id를 추출
  const [employeeDetails, setEmployeeDetails] =
    useState<EmployeeDetailData | null>(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/employees/${employee_id}`
        ); // API 호출
        setEmployeeDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [employee_id]);

  if (!employeeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">{employeeDetails.name}</Typography>
      <Typography variant="body1">
        Position: {employeeDetails.position}
      </Typography>
      <Typography variant="body1">
        Phone Number: {employeeDetails.phone_number}
      </Typography>
      <Typography variant="body1">Email: {employeeDetails.email}</Typography>
      <Typography variant="body1">
        Bank Account: {employeeDetails.bank_account.bank_account}
      </Typography>
      <Typography variant="body1">
        Salary: ${employeeDetails.bank_account.amount}
      </Typography>

      {/* 추가적인 정보가 있다면 여기에 계속해서 출력할 수 있습니다. */}

      {/* 예시로 Divider를 추가하였습니다. */}
      <Divider style={{ margin: "20px 0" }} />

      {/* 추가적인 정보가 있다면 여기에 계속해서 출력할 수 있습니다. */}
    </Paper>
  );
};

export default EmployeeDetail;
