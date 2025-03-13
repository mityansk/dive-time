import React from 'react';
import { openModal } from '@/features/auth/slice/authModalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import Button from '@/shared/ui/Button/Button';
import AuthModal from '@/features/auth/ui/AuthModal/AuthModal';
import { signOutThunk } from '@/entities/user/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useNavigate } from 'react-router';

export const Header: React.FC = () => {
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
    <header className='header'>
      <nav>
        ТУРЫ, И ДРУГОЕ
        {!user && <Button onClick={() => dispatch(openModal())}>Войти</Button>}
        {user && <Button onClick={signOutHandler}>Выйти</Button>}
      </nav>

      {isAuthModalOpen && <AuthModal />}
    </header>
  );
};

export default Header;
