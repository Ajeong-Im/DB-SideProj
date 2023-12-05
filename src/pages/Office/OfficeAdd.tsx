import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { domain } from "../../domain/domain";
import { Alert, Button, Snackbar, TextField } from "@mui/material";

const OfficeAdd = () => {
  const [officeData, setOfficeData] = useState({
    name: "",
    branch_phone_number: "",
    address: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfficeData({
      ...officeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${domain}:8000/api/employees/branch/add`,
        officeData
      );
      console.log("Response:", response.data);
      setOpenSnackbar(true);
      setTimeout(() => navigate(-1), 500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="지점 이름"
          name="name"
          value={officeData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="지점 전화번호"
          name="branch_phone_number"
          value={officeData.branch_phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="지점 주소"
          name="address"
          value={officeData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Office
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          정상적으로 등록되었습니다!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OfficeAdd;
