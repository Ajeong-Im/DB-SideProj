import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Snackbar } from '@mui/material';
import { domain } from '../../domain/domain';

const AddEmployee = () => {
  const { office_id } = useParams<{ office_id: string }>();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    phone_number: '',
    email: '',
    bank_account: {
      bank_account: '',
      amount: ''
    }
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('bank_account.')) {
      // 'bank_account' 객체 내부의 속성을 업데이트합니다.
      const fieldName = name.split('.')[1];
      setEmployeeData(prevState => ({
        ...prevState,
        bank_account: {
          ...prevState.bank_account,
          [fieldName]: value
        }
      }));
    } else {
      // 다른 필드를 업데이트합니다.
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post(`${domain}:8000/api/employees/add/${office_id}`, employeeData);
      setOpenSnackbar(true);
      setTimeout(() => navigate(`/office/${office_id}`), 2000);
    } catch (error) {
      console.error('Error posting employee data:', error);
    }
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4">직원 등록</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={employeeData.name} onChange={handleChange} />
        <TextField label="Position" name="position" value={employeeData.position} onChange={handleChange} />
        <TextField label="Phone Number" name="phone_number" value={employeeData.phone_number} onChange={handleChange} />
        <TextField label="Email" name="email" value={employeeData.email} onChange={handleChange} />
        <TextField label="Bank Account" name="bank_account.bank_account" value={employeeData.bank_account.bank_account} onChange={handleChange} />
        <TextField label="Amount" name="bank_account.amount" value={employeeData.bank_account.amount} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="등록이 완료되었습니다!"
      />
    </Paper>
  );
};

export default AddEmployee;
