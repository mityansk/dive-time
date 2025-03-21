import { Button } from 'antd';
import { useState } from 'react';
import { IEquipmentData } from '@/entities/equipment/model';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';
import styles from './EquipmentForm.module.css';

export default function EquipmentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);

  const handleAddEquipment = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        onClick={handleAddEquipment}
        className={styles.addButton}
      >
        Добавить снаряжение
      </Button>

      <EquipmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
      />
    </div>
  );
}
