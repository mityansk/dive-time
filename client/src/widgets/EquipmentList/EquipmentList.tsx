import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { getEquipmentThunk } from '@/entities/equipment/api/index';
import styles from './EquipmentList.module.css';
import { IEquipmentData } from '@/entities/equipment/model';
import { Card, Button, Modal } from 'antd';

export default function EquipmentList() {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const { user } = useAppSelector((state) => state.user);
  const [selectedEquipment, setSelectedEquipment] = useState<
    IEquipmentData | null | undefined
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookedItems, setBookedItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getEquipmentThunk());
  }, [dispatch]);

  const handleBook = (id: number) => {
    if (user) {
      setBookedItems((prev) => [...prev, id]);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = (equipment: IEquipmentData) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.cardContainer}>
      {equipments?.map((equipment: IEquipmentData) => (
        <Card
          key={equipment.id}
          cover={
            <img
              alt={equipment.name}
              src={equipment.image}
              className={styles.cardImage}
              title={equipment.name}
            />
          }
          actions={[
            <Button
              key="book"
              type="primary"
              onClick={() => handleBook(equipment.id!)}
              disabled={
                equipment.isRented || bookedItems.includes(equipment.id!)
              }
              className={
                bookedItems.includes(equipment.id!)
                  ? styles.bookedButton
                  : styles.bookButton
              }
            >
              {bookedItems.includes(equipment.id!)
                ? 'Забронировано'
                : 'Забронировать'}
            </Button>,
          ]}
          onClick={() => handleViewDetails(equipment)} // Открытие модального окна с подробной информацией
          className={styles.card}
        >
          <p>Цена: {equipment.price} руб./сутки</p>
          <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>
        </Card>
      ))}

      <Modal
        title={selectedEquipment?.name}
        open={isModalOpen && selectedEquipment !== null}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedEquipment && (
          <>
            <img
              src={selectedEquipment.image}
              alt={selectedEquipment.name}
              className={styles.modalImage}
            />
            <p>{selectedEquipment.description}</p>
            <p>Цена: {selectedEquipment.price} руб.</p>
            <p>Адрес: {selectedEquipment.address}</p>
            <p>
              Статус: {selectedEquipment.isRented ? 'В аренде' : 'Доступно'}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
