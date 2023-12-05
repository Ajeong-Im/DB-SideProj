import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import axios from "axios";
import { domain } from "../../domain/domain";

interface CarMaintProps {
  carId: number;
  isOpen: boolean;
  onClose: () => void;
  onAddMaintenance: () => void; // 새로운 정비 이력이 추가되었을 때 호출할 콜백 함수
}

const CarMaint: React.FC<CarMaintProps> = ({
  carId,
  isOpen,
  onClose,
  onAddMaintenance,
}) => {
  const [maintenanceDate, setMaintenanceDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [cost, setCost] = useState<number | string>("");

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${domain}:8000/api/cars/maintenance/create/${carId}`,
        {
          maintenance_date: maintenanceDate,
          reason: reason,
          cost: Number(cost),
        }
      );

      console.log("Maintenance record added successfully:", response.data);
      onClose(); // 모달 닫기
      onAddMaintenance(); // 새로운 정비 이력이 추가되었음을 부모 컴포넌트에 알리기
    } catch (error) {
      console.error("Error adding maintenance record:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          padding: "20px",
          width: "300px",
          margin: "auto",
          marginTop: "100px",
          background: "white",
        }}
      >
        <h2 className="text-xl mb-3 font-semibold">차량 정비 이력 추가</h2>
        <TextField
          type="date"
          fullWidth
          value={maintenanceDate}
          onChange={(e) => setMaintenanceDate(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Reason"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Cost"
          type="number"
          fullWidth
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default CarMaint;
