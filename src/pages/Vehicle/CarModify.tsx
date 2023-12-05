import React, { useEffect, useState, ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { domain } from "../../domain/domain";

const CarModify = () => {
  const { car_id } = useParams<{ car_id: string }>();
  const navigate = useNavigate();

  const [carData, setCarData] = useState({
    car_type: {
      brand: "",
      size: "small",
    },
    rental_price: "",
    availability: false,
    branch: "",
    mileage: "",
    options: {
      airconditioner: false,
      heatedseat: false,
      sunroof: false,
      navigation: false,
      blackbox: false,
    },
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${domain}:8000/api/cars/${car_id}`);
        console.log(response.data);
        const {
          brand,
          size,
          rental_price,
          availability,
          options,
          mileage,
          branch,
        } = response.data.car_type;

        setCarData({
          car_type: { brand, size },
          rental_price,
          availability,
          options,
          mileage,
          branch,
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [car_id]);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, type, checked, value } = e.target as HTMLInputElement;

    setCarData((prevData) => {
      if (name === "availability") {
        return {
          ...prevData,
          availability: checked,
        };
      } else if (name === "rental_price") {
        return {
          ...prevData,
          rental_price: type === "number" ? value : value,
        };
      } else if (name === "brand" || name === "size") {
        return {
          ...prevData,
          car_type: {
            ...prevData.car_type,
            [name]: value,
          },
        };
      } else if (name === "branch") {
        return {
          ...prevData,
          branch: value,
        };
      } else if (name === "mileage") {
        return {
          ...prevData,
          mileage: value,
        };
      } else if (name in prevData.options) {
        return {
          ...prevData,
          options: {
            ...prevData.options,
            [name]: checked,
          },
        };
      }

      return prevData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${domain}:8000/api/cars/update/${car_id}`,
        carData
      );
      console.log("Response:", response.data);
      navigate(-1); // 성공 후 이전 페이지로 이동
    } catch (error) {
      console.error("Error updating car data:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">차량 수정</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="브랜드명"
          name="brand"
          value={carData.car_type.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Select
          label="차량 사이즈"
          name="size"
          value={carData.car_type.size}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
        <TextField
          label="대여 가격"
          name="rental_price"
          value={carData.rental_price}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="소속 지점"
          name="branch"
          value={carData.branch}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="주행 거리"
          name="mileage"
          value={carData.mileage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={carData.availability}
                onChange={handleChange}
                name="availability"
              />
            }
            label="Availability"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={carData.options.airconditioner}
                onChange={handleChange}
                name="airconditioner"
              />
            }
            label="Air Conditioner"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={carData.options.heatedseat}
                onChange={handleChange}
                name="heatedseat"
              />
            }
            label="Heated Seat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={carData.options.sunroof}
                onChange={handleChange}
                name="sunroof"
              />
            }
            label="Sunroof"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={carData.options.navigation}
                onChange={handleChange}
                name="navigation"
              />
            }
            label="Navigation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={carData.options.blackbox}
                onChange={handleChange}
                name="blackbox"
              />
            }
            label="Blackbox"
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Update Car
        </Button>
      </form>
    </Paper>
  );
};

export default CarModify;
