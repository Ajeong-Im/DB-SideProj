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
import { useNavigate, useParams } from "react-router-dom";

interface CarOptions {
  airconditioner: boolean;
  heatedseat: boolean;
  sunroof: boolean;
  navigation: boolean;
  blackbox: boolean;
}

interface CarType {
  brand: string;
  size: "small" | "medium" | "large";
}

interface CarData {
  car_type: CarType;
  branch: string;
  mileage: string;
  availability: boolean;
  rental_price: string;
  options: CarOptions;
}

const AddCar = () => {
  const navigate = useNavigate(); // React Router v6를 사용하는 경우
  const { office_id } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [carData, setCarData] = useState<CarData>({
    car_type: {
      brand: "",
      size: "small",
    },
    branch: "",
    mileage: "",
    availability: false,
    rental_price: "",
    options: {
      airconditioner: false,
      heatedseat: false,
      sunroof: false,
      navigation: false,
      blackbox: false,
    },
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const target = event.target;
    const name = target.name;
    let value: string | boolean;

    // 체크박스인 경우
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    setCarData((prevState) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        const [firstKey, secondKey] = keys as [keyof CarData, keyof CarOptions];
        const nestedObject = prevState[firstKey];
        if (nestedObject && typeof nestedObject === "object") {
          (nestedObject as any)[secondKey] = value;
          return {
            ...prevState,
            [firstKey]: { ...nestedObject },
          };
        }
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };

  const getOptionLabel = (option: string): string => {
    switch (option) {
      case "airconditioner":
        return "에어컨";
      case "heatedseat":
        return "온열 시트";
      case "sunroof":
        return "썬루프";
      case "navigation":
        return "네비게이션";
      case "blackbox":
        return "블랙박스";
      default:
        return option;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${domain}:8000/api/cars/create/${office_id}`,
        carData
      );
      console.log(response.data);
      // 메시지 설정 및 스낵바 오픈
      setSnackbarMessage("차량 등록이 완료되었습니다!");
      setOpenSnackbar(true);
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        navigate(`/office/${office_id}`);
      }, 500);
    } catch (error) {
      console.error("Error posting car data:", error);
      setSnackbarMessage("차량 등록에 실패했습니다.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4">차량 등록</Typography>
      <form onSubmit={handleSubmit}>
        {/* Brand TextField */}
        <TextField
          label="브랜드"
          name="car_type.brand"
          value={carData.car_type.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Size Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="car-size-label">크기</InputLabel>
          <Select
            labelId="car-size-label"
            name="car_type.size"
            value={carData.car_type.size}
            label="Size"
            onChange={handleChange}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>

        {/* Mileage TextField */}
        <TextField
          label="주행 거리"
          name="mileage"
          value={carData.mileage}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />

        {/* Rental Price TextField */}
        <TextField
          label="대여 가격"
          name="rental_price"
          value={carData.rental_price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />

        {/* Car Options Checkboxes */}
        <FormGroup>
          {(Object.keys(carData.options) as (keyof CarOptions)[]).map(
            (option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carData.options[option]}
                    onChange={handleChange}
                    name={`options.${option}`}
                  />
                }
                label={getOptionLabel(option)}
                key={option}
              />
            )
          )}
        </FormGroup>

        {/* Availability Switch */}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={carData.availability}
                onChange={handleChange}
                name="availability"
              />
            }
            label="사용 가능 여부"
          />
        </FormGroup>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          등록하기
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

export default AddCar;
