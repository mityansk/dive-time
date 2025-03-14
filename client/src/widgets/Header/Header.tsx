import React from 'react';
import { Avatar, Layout, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { openModal } from '@/features/auth/slice/authModalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import AuthModal from '@/features/auth/ui/AuthModal/AuthModal';
import { signOutThunk } from '@/entities/user/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useNavigate } from 'react-router';
import styles from './Header.module.css';

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
    <Header className={styles.header}>
      <Title
        level={3}
        style={{
          color: 'white',
          margin: '0',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
        onClick={() => navigate(CLIENT_ROUTES.MAIN)}
      >
        DIVE TIME
      </Title>

      <div className={styles.buttonsCenter}>
        <Button
          className={styles.button}
          onClick={() => navigate(CLIENT_ROUTES.LOCATIONS)}
        >
          Места для погружений
        </Button>
        <Button
          className={styles.button}
          onClick={() => navigate(CLIENT_ROUTES.TOUR)}
        >
          Туры
        </Button>
        <Button
          className={styles.button}
          onClick={() => navigate(CLIENT_ROUTES.EQUIPMENT)}
        >
          Снаряжение
        </Button>
      </div>

      {!user ? (
        <Button onClick={() => dispatch(openModal())}>Войти</Button>
      ) : (
        <div className={styles.rightContainer}>
          <Avatar shape="square" icon={<UserOutlined />} />
          <span className={styles.buttonReg} onClick={signOutHandler}>
            Выйти
          </span>
        </div>
      )}

      {isAuthModalOpen && <AuthModal />}
    </Header>
  );
};

export default AppHeader;
