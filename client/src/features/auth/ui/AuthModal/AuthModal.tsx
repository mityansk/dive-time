import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { closeModal } from '@/features/auth/slice/authModalSlice';
import {
  signInThunk,
  signUpThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
} from '@/entities/user/api';
import styles from './AuthModal.module.css';
import { Link, useLocation, useNavigate } from 'react-router';
import { message } from 'antd';

const AuthModal: React.FC = () => {
  const INITIAL_INPUTS_DATA = {
    username: '',
    email: '',
    password: '',
    newPassword: '',
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.authModal.isOpen);
  const { isLoading, error, user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const token = location.pathname.slice(15);

  const [isRegister, setIsRegister] = useState(false);
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const [errorRed, setErrorRed] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword] = useState(!!token); // Если есть токен, показываем форму сброса пароля
  console.log(token);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { username, email, password, newPassword } = inputs;

    if (isRegister) {
      dispatch(signUpThunk({ username, email, password }));
    } else if (isForgotPassword) {
      dispatch(forgotPasswordThunk(email));
      message.success('Перейдите в почту что бы подтвердить аккаунт.');
      dispatch(closeModal());
      navigate('/');
    } else if (isResetPassword) {
      dispatch(resetPasswordThunk({ token, newPassword }));
      message.success('Пароль успешно заменен.');
      dispatch(closeModal());
      navigate('/');
    } else {
      dispatch(signInThunk({ email, password }));
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (error) setErrorRed(error);
  }, [error]);

  useEffect(() => {
    if (user) {
      setInputs(INITIAL_INPUTS_DATA);
      dispatch(closeModal());
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch, navigate]);

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
        <h2>
          {isRegister
            ? 'Регистрация'
            : isForgotPassword
            ? 'Восстановление пароля'
            : isResetPassword
            ? 'Сброс пароля'
            : 'Вход'}
        </h2>
        {errorRed && <p style={{ color: '' }}>{errorRed}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <input
                type="text"
                placeholder="Имя пользователя"
                name="username"
                value={inputs.username}
                onChange={onChangeHandler}
                className={styles.inputField}
                required
              />
            </div>
          )}
          {!isResetPassword && (
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={onChangeHandler}
                className={styles.inputField}
                required
              />
            </div>
          )}
          {isResetPassword && (
            <div>
              <input
                type="password"
                placeholder="Новый пароль"
                name="newPassword"
                value={inputs.newPassword}
                onChange={onChangeHandler}
                className={styles.inputField}
                required
              />
            </div>
          )}
          {!isForgotPassword && !isResetPassword && (
            <>
              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  autoComplete="off"
                  value={inputs.password}
                  onChange={onChangeHandler}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}
          <button
            className={styles.actionButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? 'Загрузка...'
              : isRegister
              ? 'Зарегистрироваться'
              : isForgotPassword
              ? 'Отправить письмо'
              : isResetPassword
              ? 'Сбросить пароль'
              : 'Войти'}
          </button>
        </form>
        <div className={styles.linkContainer}>
          {!isRegister && !isForgotPassword && !isResetPassword && (
            <Link
              to=""
              className={styles.linkPasswordRecovery}
              onClick={() => setIsForgotPassword(true)}
            >
              Забыли пароль?
            </Link>
          )}
          {!isResetPassword && (
            <Link
              to=""
              className={styles.linkButton}
              onClick={() => {
                return setIsRegister(!isRegister), setIsForgotPassword(false);
              }}
            >
              {isRegister
                ? 'Уже есть аккаунт? Войти'
                : 'Нет аккаунта? Зарегистрироваться'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
