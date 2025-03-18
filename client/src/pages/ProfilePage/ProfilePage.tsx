import TourForm from '@/widgets/TourForm/TourForm';
import TourList from '@/widgets/TourList/TourList';
import { Button, message, Popconfirm } from 'antd';
import { ReactElement, useEffect } from 'react';
import type { PopconfirmProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { deleteUserThunk } from '@/entities/user';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';

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
    <div style={{paddingTop: '80px'}}>
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
        Здесь компонент, выводящий кнопку "Добавить снаряжение" и список моего
        снаряжения с кнопками "редактировать/удалить"
      </div>
      <div>
        <TourForm />
        <TourList isProfile={true} />
      </div>
    </div>
  );
}
