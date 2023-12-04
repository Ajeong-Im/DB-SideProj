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

// 차량 유지보수 이력 인터페이스
interface Maintenance {
  id: number;
  maintenance_date: string;
  reason: string;
  cost: number;
}

// 차량 상세 정보 인터페이스
interface CarDetailData {
  id: number;
  car_type: {
    brand: string;
    size: "small" | "medium" | "large";
    mileage: number;
    rental_price: number;
    availability: boolean;
    options: {
      airconditioner: boolean;
      heatedseat: boolean;
      sunroof: boolean;
      navigation: boolean;
      blackbox: boolean;
    };
  };
  branch_name: string;
  maintenances: Maintenance[];
}

const CarDetail = () => {
  const { car_id } = useParams<{ car_id: string }>();
  const [carDetails, setCarDetails] = useState<CarDetailData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${domain}:8000/api/cars/${car_id}`);
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [car_id]);

  const handleModifyCar = () => {
    navigate(`/car/modify/${car_id}`);
  };

  const handleDeleteCar = async () => {
    try {
      await axios.delete(`${domain}:8000/api/cars/delete/${car_id}`);
      navigate("/"); // 차량 삭제 후 홈페이지 또는 다른 페이지로 이동
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <div className="grid grid-cols-2">
        <div className="col-span-1 ">
          <img
            src="https://i.ibb.co/C83wCc5/1.png"
            alt="office"
            style={{ width: "600px", height: "400px", margin: "20px 0" }}
          />
        </div>
        <div className="col-span-1 ml-10">
          <h1 className="text-3xl mb-3">{carDetails.car_type.brand}</h1>
          <Typography variant="body1">
            Size: {carDetails.car_type.size}
          </Typography>
          <Typography variant="body1">
            Mileage: {carDetails.car_type.mileage} km
          </Typography>
          <Typography variant="body1">
            Rental Price: ${carDetails.car_type.rental_price}
          </Typography>
          <Typography variant="body1">
            Available: {carDetails.car_type.availability ? "O" : "X"}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <h1 className="text-2xl mb-3">옵션</h1>
          <Typography variant="body1">
            Air Conditioner:{" "}
            {carDetails.car_type.options.airconditioner ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            Heated Seat: {carDetails.car_type.options.heatedseat ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            Sunroof: {carDetails.car_type.options.sunroof ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            Navigation: {carDetails.car_type.options.navigation ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            Blackbox: {carDetails.car_type.options.blackbox ? "O" : "X"}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h5">수리 이력</Typography>
          <List>
            {carDetails.maintenances.map((maintenance) => (
              <ListItem key={maintenance.id}>
                Date: {maintenance.maintenance_date}, Reason:{" "}
                {maintenance.reason}, Cost: ${maintenance.cost}
              </ListItem>
            ))}
          </List>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModifyCar}
              style={{ marginBottom: "20px", marginRight: "10px" }}
            >
              차량 수정
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCar}
              style={{ marginBottom: "20px" }}
            >
              차량 삭제
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CarDetail;
