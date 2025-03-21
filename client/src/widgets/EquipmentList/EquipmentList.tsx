import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import {
  getEquipmentThunk,
  getUserEquipmentThunk,
  deleteEquipmentThunk,
} from '@/entities/equipment/api';
import { IEquipmentData } from '@/entities/equipment/model';
import { Card, Button, Modal } from 'antd';
import styles from './EquipmentList.module.css';
import { EquipmentCard } from '@/entities/equipment/ui/EquipmentCard/EquipmentCard';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';

interface EquipmentListProps {
  isProfile?: boolean;
  filteredEquipments?: IEquipmentData[];
  className?: string;
}

export default function EquipmentList({
  isProfile = false,
  filteredEquipments,
  className,
}: EquipmentListProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookedItems, setBookedItems] = useState<number[]>([]);

  useEffect(() => {
    if (isProfile && user?.id) {
      dispatch(getUserEquipmentThunk(user.id));
    } else {
      dispatch(getEquipmentThunk());
    }
  }, [dispatch, isProfile, user?.id]);

  const displayEquipments =
    filteredEquipments ||
    (isProfile
      ? equipments?.filter((equipment) => equipment.user_id === user?.id)
      : equipments);

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

  const handleEdit = (equipment: IEquipmentData) => {
    setSelectedEquipment(equipment);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (equipment: IEquipmentData) => {
    try {
      await dispatch(deleteEquipmentThunk(equipment)).unwrap();
      if (user?.id) {
        dispatch(getUserEquipmentThunk(user.id));
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div>
      {displayEquipments?.length === 0 ? (
        <p>Нет оборудования в вашем радиусе</p>
      ) : (
        displayEquipments?.map((equipment: IEquipmentData) =>
          isProfile ? (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              className={className}
            />
          ) : (
            <Card
              key={equipment.id}
              cover={
                <div className={styles.imageContainer}>
                  <img
                    className={styles.cardImage}
                    title={equipment.name}
                    alt={equipment.name}
                    src={equipment.image}
                  />
                </div>
              }
              onClick={() => handleViewDetails(equipment)}
              className={`${styles.card} ${className || ''}`}
            >
              <p>{equipment.name}</p>
              <p>Цена: {equipment.price} ₽/сутки</p>
              <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>

              <Button
                key="book"
                type="primary"
                onClick={() => handleBook(equipment.id)}
                disabled={
                  equipment.isRented || bookedItems.includes(equipment.id)
                }
                className={
                  bookedItems.includes(equipment.id)
                    ? styles.bookedButton
                    : styles.bookButton
                }
              >
                {bookedItems.includes(equipment.id)
                  ? 'Забронировано'
                  : 'Забронировать'}
              </Button>
            </Card>
          )
        )
      )}

      <EquipmentModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        equipment={selectedEquipment}
      />

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
