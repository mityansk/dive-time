import { confirmEmailThunk, refreshTokensThunk } from '@/entities/user/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function ConfirmationEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        await dispatch(confirmEmailThunk(token));
        await dispatch(refreshTokensThunk());
        messageApi.success('Почта подтверждена! Вам доступен полный функционал сайта');
        setTimeout(() => {
          navigate(CLIENT_ROUTES.PROFILE);
        }, 5000);
      } catch (error) {
        console.error('Ошибка при подтверждении почты', error);
        messageApi.error('Ошибка подтверждения почты');
      }
    };

    fetchFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <div>{contextHolder}</div>;
}
