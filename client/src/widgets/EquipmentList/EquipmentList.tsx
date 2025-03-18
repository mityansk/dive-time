import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { getEquipmentThunk } from '@/entities/equipment/api/index';
import styles from './EquipmentList.module.css';
import { IEquipmentData } from '@/entities/equipment/model';
import { Card, Button, Modal } from 'antd';

interface EquipmentListProps {
  filteredEquipments: IEquipmentData[];
}

export default function EquipmentList({
  filteredEquipments,
}: EquipmentListProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);
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
      {filteredEquipments?.length === 0 ? (
        <p>Нет оборудования в вашем радиусе</p>
      ) : (
        filteredEquipments.map((equipment: IEquipmentData) => (
          <Card
            key={equipment.id}
            cover={
              <img
                title={equipment.name}
                alt={equipment.name}
                src={equipment.image}
                className={styles.cardImage}
              />
            }
            onClick={() => handleViewDetails(equipment)}
            className={styles.card}
          >
            <p>{equipment.name}</p>
            <p>Цена: {equipment.price} ₽/сутки</p>
            <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>

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
            </Button>
          </Card>
        ))
      )}
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
            <p>Цена: {selectedEquipment.price} ₽/сутки</p>
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
