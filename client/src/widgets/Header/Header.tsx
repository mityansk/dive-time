import React from 'react';
import { Layout, Space, Button, Typography } from 'antd';
import { openModal } from '@/features/auth/slice/authModalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import AuthModal from '@/features/auth/ui/AuthModal/AuthModal';
import { signOutThunk } from '@/entities/user/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useNavigate } from 'react-router';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector((state) => state.authModal.isOpen);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const signOutHandler = () => {
    dispatch(signOutThunk());
    alert('Вы успешно вышли из системы');
    navigate(CLIENT_ROUTES.MAIN);
  };

  return (
<Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#001529', padding: '0 20px' }}>

      <Title 
        level={3} 
        style={{ color: 'white', margin: '0', cursor: 'pointer' }}
        onClick={() => navigate(CLIENT_ROUTES.MAIN)}
      >
        DIVE TIME
      </Title>

      <Space size="large">
        <Button type="text" style={{ color: 'white' }} onClick={() => navigate(CLIENT_ROUTES.LOCATIONS)}>
          Места для погружений
        </Button>
        <Button type="text" style={{ color: 'white' }} onClick={() => navigate(CLIENT_ROUTES.TOUR)}>
          Туры
        </Button>
        <Button type="text" style={{ color: 'white' }} onClick={() => navigate(CLIENT_ROUTES.EQUIPMENT)}>
          Снаряжение
        </Button>
      </Space>

      {!user ? (
        <Button type="primary" onClick={() => dispatch(openModal())}>
          Войти
        </Button>
      ) : (
        <Button type="primary" danger onClick={signOutHandler}>
          Выйти
        </Button>
      )}

      {isAuthModalOpen && <AuthModal />}
    </Header>
  );
};

export default AppHeader;
