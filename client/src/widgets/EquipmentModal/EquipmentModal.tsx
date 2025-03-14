import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import {
  addEquipmentThunk,
  updateEquipmentThunk,
} from '@/entities/equipment/api';
import styles from './EquipmentModal.module.css';
import { IAddEquipmentData, IEquipmentData } from '@/entities/equipment/model';
import { getLocation } from '@/entities/location';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: IEquipmentData | null | undefined;
}

export default function EquipmentModal({
  isOpen,
  onClose,
  equipment,
}: EquipmentModalProps) {
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.location.locations);
  const [formData, setFormData] = useState<IEquipmentData>({
    name: '',
    price: 0,
    description: '',
    image: '',
    isRented: false,
    diveLocation_id: 0,
  });

  // Загружаем локации, когда окно открывается и локации еще не загружены
  useEffect(() => {
    if (isOpen) {
      dispatch(getLocation()); // Запрос для получения всех локаций
    }

    if (equipment) {
      setFormData({
        ...equipment,
        diveLocation_id: equipment.diveLocation_id || 0,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        isRented: false,
        diveLocation_id: 0,
      });
    }
  }, [isOpen, dispatch, equipment]);

  if (equipment) {
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : value,
      }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (equipment) {
        dispatch(updateEquipmentThunk({ ...formData, id: equipment.id }));
      } else {
        dispatch(addEquipmentThunk(formData as IAddEquipmentData));
      }
      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Модальное окно снаряжения"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>
          {equipment ? 'Редактировать снаряжение' : 'Добавить снаряжение'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Цена:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Изображение (URL):</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Статус аренды:</label>
            <input
              type="checkbox"
              name="isRented"
              checked={formData.isRented}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isRented: e.target.checked }))
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>Локация дайвинга:</label>
            <select
              name="diveLocation_id"
              value={formData.diveLocation_id}
              onChange={handleChange}
              required
            >
              <option value={0}>Выберите локацию</option>
              {locations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">{equipment ? 'Сохранить' : 'Добавить'}</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </Modal>
    );
  }
}
