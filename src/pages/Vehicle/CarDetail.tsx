import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, List, ListItem, Divider } from '@mui/material';
import { domain } from '../../domain/domain';

// 차량 유지보수 이력 인터페이스
interface Maintenance {
  id: number;
  maintenance_date: string;
  reason: string;
  cost: number;
}

// 차량 상세 정보 인터페이스
interface CarDetailData {
  id: number;
  car_type: {
    brand: string;
    size: 'small' | 'medium' | 'large';
    mileage: number;
    rental_price: number;
    availability: boolean;
    options: {
      airconditioner: boolean;
      heatedseat: boolean;
      sunroof: boolean;
      navigation: boolean;
      blackbox: boolean;
    };
  };
  branch_name: string;
  maintenances: Maintenance[];
}

const CarDetail = () => {
    const { car_id } = useParams<{ car_id: string }>(); // URL 파라미터에서 car_id를 추출
    const [carDetails, setCarDetails] = useState<CarDetailData | null>(null);
  
    useEffect(() => {
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get(`${domain}:8000/api/cars/${car_id}`); // API 호출
          setCarDetails(response.data);
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      };
  
      fetchCarDetails();
    }, [car_id]);

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4">{carDetails.car_type.brand}</Typography>
      <Typography variant="body1">Size: {carDetails.car_type.size}</Typography>
      <Typography variant="body1">Mileage: {carDetails.car_type.mileage} km</Typography>
      <Typography variant="body1">Rental Price: ${carDetails.car_type.rental_price}</Typography>
      <Typography variant="body1">Available: {carDetails.car_type.availability ? 'Yes' : 'No'}</Typography>
      
      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h5">Maintenance History</Typography>
      <List>
        {carDetails.maintenances.map(maintenance => (
          <ListItem key={maintenance.id}>
            Date: {maintenance.maintenance_date}, Reason: {maintenance.reason}, Cost: ${maintenance.cost}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CarDetail;
