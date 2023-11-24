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
  ListItemText,
} from "@mui/material";
import { domain } from "../../domain/domain";

interface RentalId {
  id: number;
  start_date: string;
  end_date: string;
  total_amount: number;
  payment_method: string;
  status: string;
}
interface GuestDetailData {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  driver_license: string;
  join_date: string;
  rental_id: RentalId[];
}

const GuestDetail = () => {
  const { guest_id } = useParams<{ guest_id: string }>(); // URL 파라미터에서 customer_id를 추출
  const [guestDetails, setGuestDetails] = useState<GuestDetailData | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuestDetails = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/customers/detail/${guest_id}`
        ); // API 호출
        setGuestDetails(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchGuestDetails();
  }, [guest_id]);

  if (!guestDetails) {
    return <div>Loading...</div>;
  }

  const handleModifyCar = () => {
    navigate(`/guest/modify/${guest_id}`);
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">{guestDetails.name}</Typography>
      <img
        src="https://i.ibb.co/zWggJNh/image.png"
        alt="office"
        style={{ width: "200px", height: "200px", margin: "20px 0" }}
      />
      <Typography variant="body1">ID: {guestDetails.id}</Typography>
      <Typography variant="body1">
        Phone Number: {guestDetails.phone_number}
      </Typography>
      <Typography variant="body1">Email: {guestDetails.email}</Typography>
      <Typography variant="body1">
        Driver License: {guestDetails.driver_license}
      </Typography>
      <Typography variant="body1">
        Join Date: {guestDetails.join_date}
      </Typography>
      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5">Rentals</Typography>
      <List>
        {guestDetails.rental_id && guestDetails.rental_id.length > 0 ? (
          guestDetails.rental_id.map((RentalId) => (
            <ListItem key={RentalId.id}>
              {RentalId.status === "in_progress" ? (
                <ListItemText>
                  {/* 여기에 출력하고자 하는 정보를 추가 */}
                  <div>Start Date: {RentalId.start_date}</div>
                  <div>End Date: {RentalId.end_date}</div>
                  <div>Total Amount: {RentalId.total_amount}</div>
                  <div>Payment Method: {RentalId.payment_method}</div>
                  <div>Status: {RentalId.status}</div>
                </ListItemText>
              ) : null}
            </ListItem>
          ))
        ) : (
          <Typography>이용 정보가 없습니다.</Typography>
        )}
      </List>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleModifyCar}
          style={{ marginBottom: "20px" }}
        >
          차량 수정
        </Button>
      </div>
    </Paper>
  );
};

export default GuestDetail;
