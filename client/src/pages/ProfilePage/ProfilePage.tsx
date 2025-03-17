import { ReactElement } from 'react';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import {
  getUserEquipmentThunk,
  deleteEquipmentThunk,
} from '@/entities/equipment/api/index';
import { IEquipmentData } from '@/entities/equipment/model';
import styles from './ProfilePage.module.css';

export default function ProfilePage(): ReactElement {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);

  useEffect(() => {
    dispatch(getUserEquipmentThunk());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (equipment: IEquipmentData) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };
  const handleDelete = (equipment: IEquipmentData) => {
    dispatch(deleteEquipmentThunk(equipment)).then(() => {
      dispatch(getUserEquipmentThunk());
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className={styles.container}>
      <h1>Моё снаряжение</h1>

      <button onClick={handleAdd} className={styles.addButton}>
        Добавить снаряжение
      </button>

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

            <div className={styles.actions}>
              <button onClick={() => handleEdit(equipment)}>
                Редактировать
              </button>
              <button onClick={() => handleDelete(equipment)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      <EquipmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
      />
    </div>

    // <div>
    //   Здесь компонент, выводящий кнопку "Добавить тур" и список добавленных мной
    //   туров
    // </div>
  );
}
