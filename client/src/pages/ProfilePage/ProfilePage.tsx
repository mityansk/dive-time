import TourForm from '@/widgets/TourForm/TourForm';
import TourList from '@/widgets/TourList/TourList';
import { Card, Button, message, Popconfirm } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import type { PopconfirmProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { deleteUserThunk } from '@/entities/user';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';
import { getUserEquipmentThunk } from '@/entities/equipment/api';
import { IEquipmentData } from '@/entities/equipment/model';
import styles from './ProfilePage.module.css';

export default function ProfilePage(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.user?.id);

  //для снаряжения
  const equipments = useAppSelector((state) => state.equipments.equipments);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);

  useEffect(() => {
    if (!id) {
      navigate(CLIENT_ROUTES.MAIN);
    }
  }, []);

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    try {
      await dispatch(deleteUserThunk(id!))
        .unwrap()
        .then(() => {
          message.success('Профиль пользователя удален');
          navigate('/');
        })
        .catch(() => {
          message.error('Ошибка при удалении профиля');
        });
    } catch {
      message.error('Ошибка при удалении профиля');
    }
  };

  const cancel: PopconfirmProps['onCancel'] = () => {};

  useEffect(() => {
    if (id) {
      dispatch(getUserEquipmentThunk(id));
    }
  }, [dispatch, id]);

  const handleAddEquipment = () => {
    setSelectedEquipment(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Popconfirm
          title="Удалить профиль"
          description="Вы уверены? Удалятся все туры и снаряжение!"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Да, удалить"
          cancelText="Отмена"
        >
          <Button>Удалить профиль</Button>
        </Popconfirm>
      </div>

      <div>
        <TourForm />
        <TourList isProfile={true} />
      </div>

      <div className={styles.profileContainer}>
        <h1>Мое снаряжение</h1>
        <Button
          type="primary"
          onClick={handleAddEquipment}
          className={styles.addButton}
        >
          Добавить снаряжение
        </Button>

        <div className={styles.cardContainer}>
          {equipments
            ?.filter((equipment) => equipment.user_id === id)
            .map((equipment) => (
              <Card
                key={equipment.id}
                cover={
                  <img
                    alt={equipment.name}
                    src={equipment.image}
                    className={styles.cardImage}
                  />
                }
                className={styles.card}
              >
                <p>{equipment.name}</p>
                <p>Цена: {equipment.price} руб./сутки</p>
                <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>
              </Card>
            ))}
        </div>

        <EquipmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          equipment={selectedEquipment}
        />
      </div>
    </div>
  );
}
