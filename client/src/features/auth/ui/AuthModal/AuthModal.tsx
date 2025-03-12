import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { closeModal } from '@/features/auth/slice/authModalSlice';
import { signInThunk, signUpThunk } from '@/entities/user/api';
import styles from './AuthModal.module.css';

const AuthModal: React.FC = () => {
  const INITIAL_INPUTS_DATA = {
    username: '',
    email: '',
    password: '',
  };

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.authModal.isOpen);
  const { isLoading, error } = useAppSelector((state) => state.user);

  const [isRegister, setIsRegister] = useState(false);
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = inputs;

    if (isRegister) {
      dispatch(signUpThunk({ username, email, password }));
    } else {
      dispatch(signInThunk({ email, password }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => dispatch(closeModal())}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalCloseButton}
          onClick={() => dispatch(closeModal())}
        >
          ✖
        </button>
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <input
                type='text'
                placeholder='Имя пользователя'
                name='username'
                value={inputs.username}
                onChange={onChangeHandler}
                className={styles.inputField}
                required
              />
            </div>
          )}
          <div>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={inputs.email}
              onChange={onChangeHandler}
              className={styles.inputField}
              required
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Пароль'
              name='password'
              autoComplete='off'
              value={inputs.password}
              onChange={onChangeHandler}
              className={styles.inputField}
              required
            />
          </div>
          <button
            className={styles.actionButton}
            type='submit'
            disabled={isLoading}
          >
            {isLoading
              ? 'Загрузка...'
              : isRegister
              ? 'Зарегистрироваться'
              : 'Войти'}
          </button>
        </form>

        <button
          className={styles.linkButton}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? 'Уже есть аккаунт? Войти'
            : 'Нет аккаунта? Зарегистрироваться'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
