import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { domain } from "../../domain/domain";

const GuestModify = () => {
  const { guest_id } = useParams<{ guest_id: string }>();
  const navigate = useNavigate();

  const [guestData, setGuestData] = useState({
    name: "",
    phone_number: "",
    email: "",
    driver_license_number: "",
    join_date: "",
  });

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await axios.get(
          `${domain}:8000/api/customers/detail/${guest_id}`
        );
        console.log("Response data:", response.data);

        const { name, phone_number, email, driver_license, join_date } =
          response.data;

        setGuestData({
          name,
          phone_number,
          email,
          driver_license_number: driver_license,
          join_date,
        });
      } catch (error) {
        console.error("Error fetching guest data:", error);
      }
    };

    fetchGuestData();
  }, [guest_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${domain}:8000/api/customers/${guest_id}`,
        guestData
      );
      console.log("여기서 Response:", response.data);
      navigate(-1); // 성공 후 이전 페이지로 이동
    } catch (error) {
      console.error("Error updating car data:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">고객 수정</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="고객명"
          name="name"
          value={guestData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="전화번호"
          name="phone_number"
          value={guestData.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="이메일"
          name="email"
          value={guestData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="운전 면허 번호"
          name="driver_license_number"
          value={guestData.driver_license_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="가입 날짜"
          name="join_date"
          value={guestData.join_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Car
        </Button>
      </form>
    </Paper>
  );
};

export default GuestModify;
