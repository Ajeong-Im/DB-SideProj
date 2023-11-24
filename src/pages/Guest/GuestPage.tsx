import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { domain } from "../../domain/domain";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface Guest {
  id: number;
  name: string;
  phone_number: string;
  email: string;
}

const GuestPage = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${domain}:8000/api/customers/`);
        setGuests(response.data);
      } catch (error) {
        console.error("Error fetching office data:", error);
      }
    };

    fetchGuests();
  }, []);

  const handleRowClick = (GuestId: number) => {
    navigate(`/guest/${GuestId}`);
  };

  const handleAddGuest = () => {
    navigate("/guest/add");
  };

  return (
    <Paper style={{ width: "100%", overflowX: "auto" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddGuest}
        style={{ margin: "20px" }}
      >
        고객 추가
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guests.map((guest) => (
            // Add onClick event to the TableRow
            <TableRow
              key={guest.id}
              onClick={() => handleRowClick(guest.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{guest.id}</TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.phone_number}</TableCell>
              <TableCell>{guest.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default GuestPage;
