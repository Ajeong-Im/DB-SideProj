import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import { domain } from "../../domain/domain";

interface Employee {
  employee_id: number;
  name: string;
  position: string;
}

interface Car {
  car_id: number;
  brand: string;
  size: "small" | "medium" | "large";
  availability: boolean;
}

interface OfficeDetails {
  branch_id: number;
  name: string;
  branch_phone_number: string;
  address: string;
  employees: Employee[];
  cars: Car[];
}

const OfficeDetail = () => {
  const { office_id } = useParams<{ office_id: string }>();
  const navigate = useNavigate();
  const [officeDetails, setOfficeDetails] = useState<OfficeDetails | null>(
    null
  );

  useEffect(() => {
    const fetchOfficeDetails = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/employees/branch/${office_id}`
        );
        setOfficeDetails(response.data);
      } catch (error) {
        console.error("Error fetching office details:", error);
      }
    };

    fetchOfficeDetails();
  }, [office_id]);

  const handleAddEmployee = () => {
    navigate(`/employee/register/${office_id}`);
  };

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  const handleModifyOffice = () => {
    navigate(`/office/modify/${office_id}`);
  };

  if (!officeDetails) {
    return <div>Loading...</div>;
  }
  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <img
        src="https://i.ibb.co/RPQz6xN/image.png"
        alt="office"
        style={{ width: "200px", height: "200px", margin: "20px 0" }}
      />
      <Typography variant="h4">{officeDetails.name}</Typography>
      <Typography variant="body1">
        전화번호: {officeDetails.branch_phone_number}
      </Typography>
      <Typography variant="body1">주소: {officeDetails.address}</Typography>

      <Divider style={{ margin: "20px 0" }} />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleModifyOffice}
          style={{ marginBottom: "20px" }}
        >
          지점 수정
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEmployee}
          style={{ marginBottom: "20px" }}
        >
          직원 등록
        </Button>
      </div>
      <Typography variant="h5">직원 목록</Typography>
      <List>
        {officeDetails.employees.map((employee) => (
          <ListItem key={employee.employee_id}>
            {employee.name} - {employee.position}
          </ListItem>
        ))}
      </List>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5">차량 목록</Typography>
      <List>
        {officeDetails.cars.map((car) => (
          <ListItem
            key={car.car_id}
            onClick={() => handleCarClick(car.car_id)}
            style={{ cursor: "pointer" }}
          >
            {car.brand} ({car.size}) -{" "}
            {car.availability ? "이용 가능" : "이용 불가"}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default OfficeDetail;
