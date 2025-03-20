import TourForm from '@/widgets/TourForm/TourForm';
import TourList from '@/widgets/TourList/TourList';
import { Button, message, Popconfirm } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import type { PopconfirmProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { deleteUserThunk } from '@/entities/user';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import EquipmentModal from '@/widgets/EquipmentModal/EquipmentModal';
import {
  getUserEquipmentThunk,
  deleteEquipmentThunk,
} from '@/entities/equipment/api';
import { IEquipmentData } from '@/entities/equipment/model';
import { EquipmentCard } from '@/entities/equipment/ui/EquipmentCard/EquipmentCard';
import styles from './ProfilePage.module.css';

export default function ProfilePage(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.user?.id);
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);

  useEffect(() => {
    if (!id) {
      navigate(CLIENT_ROUTES.MAIN);
    }
  }, []);

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
    setSelectedEquipment(null);
  };

  const handleEditEquipment = (equipment: IEquipmentData) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleDeleteEquipment = async (equipment: IEquipmentData) => {
    try {
      await dispatch(deleteEquipmentThunk(equipment)).unwrap();
      message.success('Снаряжение удалено');
      if (id) {
        dispatch(getUserEquipmentThunk(id));
      }
    } catch {
      message.error('Ошибка при удалении');
    }
  };

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

  return (
    <div className={styles.pageContainer}>
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

      <div className={styles.contentContainer}>
        <div
          style={{ flex: 1, maxWidth: '48%' }}
          className={styles.sectionContainer}
        >
          <TourForm />
          <div className={styles.scrollableContainer}>
            <TourList isProfile={true} />
          </div>
        </div>

        <div
          style={{ flex: 1, maxWidth: '48%' }}
          className={styles.sectionContainer}
        >
          <h1>Список моего снаряжения</h1>
          <Button
            type="primary"
            onClick={handleAddEquipment}
            className={styles.addButton}
          >
            Добавить снаряжение
          </Button>

          <div
            className={`${styles.cardContainer} ${styles.scrollableContainer}`}
          >
            {equipments
              ?.filter((equipment) => equipment.user_id === id)
              .map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  onEdit={handleEditEquipment}
                  onDelete={handleDeleteEquipment}
                />
              ))}
          </div>
        </div>
      </div>

      <EquipmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
      />
    </div>
  );
}
