import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { domain } from "../../domain/domain";
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface Office {
  id: number;
  name: string;
  branch_phone_number: string;
  address: string;
}

const OfficePage = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get(`${domain}:8000/api/employees/branch`);
        setOffices(response.data);
      } catch (error) {
        console.error('Error fetching office data:', error);
      }
    };

    fetchOffices();
  }, []);

  const handleRowClick = (officeId: number) => {
    navigate(`/office/${officeId}`);
  };

  const handleAddOffice = () => {
    navigate("/office/add");
  }

  return (
    <Paper style={{ width: '100%', overflowX: 'auto' }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddOffice}
        style={{ margin: '20px' }}
      >
        지점 추가
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>지점 이름</TableCell>
            <TableCell>지점 전화번호</TableCell>
            <TableCell>지점 주소</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offices.map((office) => (
            // Add onClick event to the TableRow
            <TableRow key={office.id} onClick={() => handleRowClick(office.id)} style={{ cursor: 'pointer' }}>
              <TableCell>{office.id}</TableCell>
              <TableCell>{office.name}</TableCell>
              <TableCell>{office.branch_phone_number}</TableCell>
              <TableCell>{office.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default OfficePage;
