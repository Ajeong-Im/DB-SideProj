import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";
import { domain } from "../../domain/domain";
import { SelectChangeEvent } from "@mui/material";

interface CarId {
  car_id: number;
  brand: string;
}

interface RentalId {
  rental_id: number;
  start_date: string;
  end_date: string;
  total_amount: number;
  payment_method: string;
  status: string;
  car: CarId;
}

interface GuestDetailData {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  driver_license: string;
  join_date: string;
  rentals: RentalId[];
}

const GuestDetail = () => {
  const { guest_id } = useParams<{ guest_id: string }>();
  const [guestDetails, setGuestDetails] = useState<GuestDetailData | null>(
    null
  );
  const [statusUpdates, setStatusUpdates] = useState<{ [key: number]: string }>(
    {}
  );
  const navigate = useNavigate();

  const fetchGuestDetails = async () => {
    try {
      const response = await axios.get(
        `${domain}:8000/api/customers/detail/${guest_id}`
      );
      setGuestDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    fetchGuestDetails();
  }, [guest_id]);

  const handleDeleteGuest = async () => {
    try {
      await axios.delete(`${domain}:8000/api/customers/delete/${guest_id}`);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting guest:", error);
    }
  };

  const handleModifyGuest = () => {
    navigate(`/guest/modify/${guest_id}`);
  };

  const handleStatusChange = (
    event: SelectChangeEvent<string>,
    rentalId: number
  ) => {
    setStatusUpdates((prevUpdates) => ({
      ...prevUpdates,
      [rentalId]: event.target.value,
    }));
  };

  const handleUpdateStatus = async (rentalId: number) => {
    try {
      await axios.patch(`${domain}:8000/api/customers/rentals/${rentalId}`, {
        status: statusUpdates[rentalId],
      });
      await fetchGuestDetails();
    } catch (error) {
      console.error("Error updating rental status:", error);
    }
  };

  if (!guestDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <div className="grid grid-cols-3">
        <div className="col-span-1 ml-20">
          <div className="text-4xl font-semibold">{guestDetails.name}</div>
          <img
            src="https://i.ibb.co/zWggJNh/image.png"
            alt="office"
            style={{ width: "200px", height: "200px", margin: "20px 0" }}
          />
          <Typography variant="body1">고객 ID: {guestDetails.id}</Typography>
          <Typography variant="body1">
            전화번호: {guestDetails.phone_number}
          </Typography>
          <Typography variant="body1">Email: {guestDetails.email}</Typography>
          <Typography variant="body1">
            운전면허번호: {guestDetails.driver_license}
          </Typography>
          <Typography variant="body1">
            가입 날짜: {guestDetails.join_date}
          </Typography>
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleModifyGuest}
              style={{ marginBottom: "20px" }}
            >
              고객 정보 수정
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteGuest}
              style={{ marginBottom: "20px", marginLeft: "10px" }}
            >
              고객 삭제
            </Button>
          </div>
        </div>

        <div className="col-span-2">
          <div className="text-2xl font-medium">대여 기록</div>
          <List>
            {guestDetails.rentals &&
              guestDetails.rentals.map((rental) => (
                <ListItem key={rental.rental_id}>
                  <ListItemText>
                    <div className="text-xl">{rental.car.brand}</div>
                    <div>차량 ID: {rental.car.car_id}</div>
                    <div>대여 시작 일자: {rental.start_date.slice(0, 10)}</div>
                    <div>대여 종료 일자: {rental.end_date.slice(0, 10)}</div>
                    <div>가격: {rental.total_amount}</div>
                    <div>지불 방식: {rental.payment_method}</div>
                    <div>
                      상태:{" "}
                      <span
                        className={`${
                          rental.status === "in_progress"
                            ? "text-red-500 font-bold"
                            : rental.status === "reserved"
                            ? "text-blue-500 font-bold"
                            : rental.status === "returned"
                            ? "text-green-500 font-bold"
                            : ""
                        }`}
                      >
                        {rental.status === "in_progress"
                          ? "대여 중"
                          : rental.status === "reserved"
                          ? "예약"
                          : rental.status === "returned"
                          ? "반납 완료"
                          : rental.status}
                      </span>
                    </div>
                    <div>
                      <Select
                        value={statusUpdates[rental.rental_id] || rental.status}
                        onChange={(event) =>
                          handleStatusChange(event, rental.rental_id)
                        }
                        style={{ marginTop: "10px" }}
                      >
                        <MenuItem value="in_progress">대여 중</MenuItem>
                        <MenuItem value="reserved">예약</MenuItem>
                        <MenuItem value="returned">반납 완료</MenuItem>
                      </Select>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(rental.rental_id)}
                        style={{
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        상태 업데이트
                      </Button>
                    </div>
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    </Paper>
  );
};

export default GuestDetail;
