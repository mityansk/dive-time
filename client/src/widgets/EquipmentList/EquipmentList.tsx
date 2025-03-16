import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import {
  getEquipmentThunk,
  deleteEquipmentThunk,
} from '@/entities/equipment/api/index';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';
import styles from './EquipmentList.module.css';
import { IEquipmentData } from '@/entities/equipment/model';

export default function EquipmentList() {
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.user.user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<
    IEquipmentData | null | undefined
  >(null);

  useEffect(() => {
    console.log('Dispatching getEquipmentThunk');
    dispatch(
      getEquipmentThunk(isAuthenticated ? (user_id as number | null) : null)
    );
  }, [dispatch, isAuthenticated, user_id]);

  const handleAdd = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (equipment: IEquipmentData) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleDelete = (equipment: IEquipmentData) => {
    dispatch(deleteEquipmentThunk(equipment)).then(() =>
      dispatch(
        getEquipmentThunk(isAuthenticated ? (user_id as number | null) : null)
      )
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className={styles.container}>
      <h1>{isAuthenticated ? 'Моё снаряжение' : 'Список снаряжения'}</h1>
      {isAuthenticated && (
        <button onClick={handleAdd} className={styles.addButton}>
          сдать в аренду
        </button>
      )}
      <div className={styles.grid}>
        {equipments?.map((equipment) => (
          <div key={equipment.id} className={styles.card}>
            <h2>{equipment.name}</h2>
            {equipment.image && (
              <img
                src={equipment.image}
                alt={equipment.name}
                className={styles.image}
              />
            )}
            <p>{equipment.description}</p>
            <p>Цена: {equipment.price} ₽</p>
            <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>

            {equipment.address && <p>Адрес: {equipment.address}</p>}

            {isAuthenticated && (
              <div className={styles.actions}>
                <button onClick={() => handleEdit(equipment)}>
                  Редактировать
                </button>
                <button onClick={() => handleDelete(equipment)}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <EquipmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
      />
    </div>
  );
}
