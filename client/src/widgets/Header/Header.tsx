import React from 'react';
import { openModal } from '@/features/auth/slice/authModalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import Button from '@/shared/ui/Button/Button';
import AuthModal from '@/features/auth/ui/AuthModal/AuthModal';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector((state) => state.authModal.isOpen);

  return (
    <header className='header'>
      <nav>
        {/* Другие элементы навбара */}
        <Button onClick={() => dispatch(openModal())}>Войти</Button>
      </nav>

      {isAuthModalOpen && <AuthModal />}
    </header>
  );
};

export default Header;
