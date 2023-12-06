import React, { useState } from "react";
import axios from "axios";
import { domain } from "../../domain/domain";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  Paper,
  Typography,
  SelectChangeEvent,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface GuestData {
  name: string;
  phone_number: string;
  email: string;
  driver_license_number: string;
  join_date: string;
}

const AddGuest = () => {
  const navigate = useNavigate(); // React Router v6를 사용하는 경우
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [guestData, setGuestData] = useState<GuestData>({
    name: "",
    phone_number: "",
    email: "",
    driver_license_number: "",
    join_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(`${domain}:8000/api/customers/add`, guestData);
      setOpenSnackbar(true);
      setTimeout(() => navigate(-1), 500);
    } catch (error) {
      console.error("Error posting employee data:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">Guest Registration</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="이름"
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
          label="Email"
          name="email"
          value={guestData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="운전면허번호"
          name="driver_license_number"
          value={guestData.driver_license_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          고객 등록
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddGuest;
