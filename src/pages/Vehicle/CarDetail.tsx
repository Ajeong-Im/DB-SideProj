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
import CarMaint from "./CarMaint";

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
  const { office_id } = useParams<{ office_id: string }>();
  const [carDetails, setCarDetails] = useState<CarDetailData | null>(null);
  const [isMaintModalOpen, setIsMaintModalOpen] = useState(false);
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
      navigate(-1);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleOpenMaintModal = () => {
    setIsMaintModalOpen(true);
  };

  const handleCloseMaintModal = () => {
    setIsMaintModalOpen(false);
  };

  const handleAddMaintenance = async () => {
    // 정비 이력이 추가된 후에 정비 이력 목록을 다시 불러와서 상태를 업데이트
    try {
      const response = await axios.get(`${domain}:8000/api/cars/${car_id}`);
      setCarDetails(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const handleDeleteMaintenance = async (maintenanceId: number) => {
    try {
      await axios.delete(
        `${domain}:8000/api/cars/maintenance/delete/${maintenanceId}`
      );
      // 정비 이력 삭제 후 화면 갱신을 위해 차량 상세 정보를 다시 불러옴
      const response = await axios.get(`${domain}:8000/api/cars/${car_id}`);
      setCarDetails(response.data);
    } catch (error) {
      console.error("Error deleting maintenance record:", error);
    }
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img
            src="https://i.ibb.co/C83wCc5/1.png"
            alt="office"
            style={{ width: "600px", height: "400px", margin: "20px 0" }}
          />
        </div>
        <div className="col-span-1 ml-10">
          <h1 className="text-3xl mb-3">{carDetails.car_type.brand}</h1>
          <Typography variant="body1">
            크기: {carDetails.car_type.size}
          </Typography>
          <Typography variant="body1">
            주행 거리: {carDetails.car_type.mileage} km
          </Typography>
          <Typography variant="body1">
            대여 가격: ${carDetails.car_type.rental_price}
          </Typography>
          <Typography variant="body1">
            사용 가능 여부: {carDetails.car_type.availability ? "O" : "X"}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <h1 className="text-2xl mb-3">옵션</h1>
          <Typography variant="body1">
            에어컨: {carDetails.car_type.options.airconditioner ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            온열 시트: {carDetails.car_type.options.heatedseat ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            썬루프: {carDetails.car_type.options.sunroof ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            네비게이션: {carDetails.car_type.options.navigation ? "O" : "X"}
          </Typography>
          <Typography variant="body1">
            블랙박스: {carDetails.car_type.options.blackbox ? "O" : "X"}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <div className="flex items-center">
            <h1 className="text-2xl">정비 이력</h1>
            <button
              type="button"
              onClick={handleOpenMaintModal}
              className="bg-sky-500 text-white ml-3 px-1 text-xs font-bold border border-gray-400"
            >
              +
            </button>
          </div>

          <List>
            {carDetails.maintenances.map((maintenance) => (
              <ListItem key={maintenance.id}>
                <button
                  type="button"
                  onClick={() => handleDeleteMaintenance(maintenance.id)}
                  className="bg-red-500 text-white mr-3 px-1 text-xs font-bold border border-gray-400"
                >
                  X
                </button>
                일자: {maintenance.maintenance_date}, 사유: {maintenance.reason}
                , 금액: ${maintenance.cost}
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
      <CarMaint
        carId={carDetails.id}
        isOpen={isMaintModalOpen}
        onClose={handleCloseMaintModal}
        onAddMaintenance={handleAddMaintenance} // 수정된 부분
      />
    </Paper>
  );
};

export default CarDetail;
