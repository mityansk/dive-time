import { Card } from 'antd';
import { useState } from 'react';
import { IEquipmentData } from '../../model';
import styles from './EquipmentCard.module.css';

interface EquipmentCardProps {
  equipment: IEquipmentData;
  onEdit: (equipment: IEquipmentData) => void;
  onDelete: (equipment: IEquipmentData) => void;
}

export function EquipmentCard({
  equipment,
  onEdit,
  onDelete,
}: EquipmentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Card
      key={equipment.id}
      cover={
        <div className={styles.imageContainer}>
          <img
            alt={equipment.name}
            src={equipment.image}
            className={styles.cardImage}
          />
        </div>
      }
      className={styles.card}
    >
      <p className={styles.name}>{equipment.name}</p>
      <p className={styles.price}>Цена: {equipment.price} ₽/сутки</p>
      <p className={styles.status}>
        Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}
      </p>

      <div className={styles.menuContainer}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ⚙️
        </button>
        {isMenuOpen && (
          <div className={styles.menu}>
            <button
              className={styles.menuItem}
              onClick={() => onEdit(equipment)}
            >
              Редактировать
            </button>
            <button
              className={styles.menuItem}
              onClick={() => onDelete(equipment)}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
