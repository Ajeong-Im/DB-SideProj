import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { domain } from "../../domain/domain";

interface ApiResponse {
  id: number;
  car_type: {
    brand: string;
    size: "small" | "medium" | "large";
    availability: boolean;
  };
  branch_name: string;
}

const CarList = () => {
  const [carList, setCarList] = useState<ApiResponse[]>([]); // 상태의 타입을 ApiResponse[]로 설정
  const [filterAvailable, setFilterAvailable] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Notice how we're not passing `carList` here anymore
        const response = await axios.get<ApiResponse[]>(
          `${domain}:8000/api/cars/`
        );
        console.log(response.data);
        setCarList(response.data); // API response is set to state
      } catch (error) {
        console.error("Error fetching cars", error);
      }
    };

    fetchCars();
  }, []); // The empty array ensures this effect runs once after initial render

  const filteredCars = carList.filter(
    (car) => !filterAvailable || car.car_type.availability
  );

  return (
    <Paper>
      <FormControlLabel
        control={
          <Switch
            checked={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.checked)}
          />
        }
        label="이용 가능한 차량만 보기"
      />
      <TableContainer component={Paper}>
        <Table aria-label="car list table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>브랜드</TableCell>
              <TableCell>크기</TableCell>
              <TableCell>지점</TableCell>
              <TableCell>이용 가능 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell component="th" scope="row">
                  {car.id}
                </TableCell>
                <TableCell>{car.car_type.brand}</TableCell>
                <TableCell>{car.car_type.size}</TableCell>
                <TableCell>{car.branch_name}</TableCell>
                <TableCell>
                  {car.car_type.availability ? "이용 가능" : "이용 불가능"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CarList;
