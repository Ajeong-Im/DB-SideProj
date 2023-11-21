import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { domain } from '../../domain/domain';

const OfficeModify = () => {
  const { office_id } = useParams<{ office_id: string }>();
  const navigate = useNavigate();
  const [officeData, setOfficeData] = useState({
    name: '',
    branch_phone_number: '',
    address: ''
  });

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        const response = await axios.get(`${domain}:8000/api/employees/branch/${office_id}`);
        const { name, branch_phone_number, address } = response.data;
        setOfficeData({ name, branch_phone_number, address });
      } catch (error) {
        console.error('Error fetching office data:', error);
      }
    };
  
    fetchOfficeData();
  }, [office_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfficeData({
      ...officeData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${domain}:8000/api/employees/branch/update/${office_id}`, officeData);
      console.log('Response:', response.data);
      navigate(-1); // 성공 후 이전 페이지로 이동
    } catch (error) {
      console.error('Error updating office data:', error);
    }
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4">지점 수정</Typography>
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
          Update Office
        </Button>
      </form>
    </Paper>
  );
};

export default OfficeModify;
