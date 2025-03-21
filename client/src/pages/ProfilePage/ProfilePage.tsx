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
import {
  getUserEquipmentThunk,
  deleteEquipmentThunk,
} from '@/entities/equipment/api';
import { IEquipmentData } from '@/entities/equipment/model';
import styles from './ProfilePage.module.css';

export default function ProfilePage(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.user?.id);
  const user = useAppSelector((state) => state.user.user);
  //для снаряжения
  const equipments = useAppSelector((state) => state.equipments.equipments);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentData | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) {
      navigate(CLIENT_ROUTES.MAIN);
    }
    if (!user) {
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
    setSelectedEquipment(null);
  };
  const handleEditEquipment = (equipment: IEquipmentData) => {
    console.log('Editing equipment:', equipment);
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

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

// if (user && user!.isEmailConfirmed === false) {
//   return (
//     <div className={styles.containerIsEmailConfirmed}>
//       <div className={styles.messageIsEmailConfirmed}>
//         Пожалуйста подтвердите вашу почту
//       </div>
//     </div>
//   );
// }
// console.log('User:', user);
// console.log('Is email confirmed:', user?.isEmailConfirmed);

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
                  <p className={styles.price}>
                    Цена: {equipment.price} ₽/сутки
                  </p>
                  <p className={styles.status}>
                    Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}
                  </p>

                  <div className={styles.menuContainer}>
                    <button
                      className={styles.menuButton}
                      onClick={() => toggleMenu(equipment.id)}
                    >
                      ⚙️
                    </button>
                    {openMenuId === equipment.id && (
                      <div className={styles.menu}>
                        <button
                          className={styles.menuItem}
                          onClick={() => handleEditEquipment(equipment)}
                        >
                          Редактировать
                        </button>
                        <button
                          className={styles.menuItem}
                          onClick={() => handleDeleteEquipment(equipment)}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
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
