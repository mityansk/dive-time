import TourForm from '@/widgets/TourForm/TourForm';
import TourList from '@/widgets/TourList/TourList';
import { Button, message, Popconfirm } from 'antd';
import { ReactElement, useEffect } from 'react';
import type { PopconfirmProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { deleteUserThunk } from '@/entities/user';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import EquipmentForm from '@/widgets/EquipmentForm/EquipmentForm';
import EquipmentList from '@/widgets/EquipmentList/EquipmentList';
import styles from './ProfilePage.module.css';

export default function ProfilePage(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.user?.id);

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
          className={styles.sectionContainerLeft}
        >
          <TourForm />
          <div className={styles.scrollableContainer}>
            <TourList isProfile={true} />
          </div>
        </div>

        <div
          style={{ flex: 1, maxWidth: '48%' }}
          className={styles.sectionContainerRight}
        >
          <p>Список моего снаряжения</p>
          <EquipmentForm />
          <div className={styles.scrollableContainer}>
            <div className={styles.equipmentList}>
              <EquipmentList
                isProfile={true}
                className={styles.equipmentPageCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
