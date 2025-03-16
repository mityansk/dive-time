import React, { useEffect, useState } from 'react';
import { Avatar, Layout, Typography, Button, Dropdown } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { openModal } from '@/features/auth/slice/authModalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import AuthModal from '@/features/auth/ui/AuthModal/AuthModal';
import { signOutThunk } from '@/entities/user/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { Link, useNavigate } from 'react-router';
import styles from './Header.module.css';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';

const { Header } = Layout;
const { Title } = Typography;

export const AppHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector((state) => state.authModal.isOpen);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const signOutHandler = () => {
    dispatch(signOutThunk());
    alert('Вы успешно вышли из системы');
    navigate(CLIENT_ROUTES.MAIN);
  };

  const menuItems = [
    {
      key: '1',
      label: 'Места для погружений',
      onClick: () => navigate(CLIENT_ROUTES.LOCATIONS),
    },
    { key: '2', label: 'Туры', onClick: () => navigate(CLIENT_ROUTES.TOUR) },
    {
      key: '3',
      label: 'Снаряжение',
      onClick: () => navigate(CLIENT_ROUTES.EQUIPMENT),
    },
  ];

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

      {isMobile ? (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button
            className={styles.button}
            icon={<MenuOutlined />}
            size="large"
          />
        </Dropdown>
      ) : (
        <div className={styles.buttonsCenter}>
          <Button
            className={styles.button}
            size="large"
            onClick={() => navigate(CLIENT_ROUTES.LOCATIONS)}
          >
            Места для погружений
          </Button>
          <Button
            className={styles.button}
            size="large"
            onClick={() => navigate(CLIENT_ROUTES.TOUR)}
          >
            Туры
          </Button>
          <Button
            className={styles.button}
            size="large"
            onClick={() => navigate(CLIENT_ROUTES.EQUIPMENT)}
          >
            Снаряжение
          </Button>
        </div>
      )}

      {!user ? (
        <Link
          to=""
          className={styles.buttonReg}
          onClick={() => dispatch(openModal())}
        >
          Войти
        </Link>
      ) : (
        <div className={styles.rightContainer}>
          <Avatar
            shape="square"
            icon={<UserOutlined />}
            onClick={() => navigate(CLIENT_ROUTES.PROFILE)}
          />
          <Link to="" className={styles.buttonReg} onClick={signOutHandler}>
            Выйти
          </Link>
        </div>
      )}

      {isAuthModalOpen && <AuthModal />}
    </Header>
  );
};

export default AppHeader;
