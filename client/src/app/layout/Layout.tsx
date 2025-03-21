import { refreshTokensThunk } from '@/entities/user/api';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import Footer from '@/widgets/Footer/Footer';
import Header from '@/widgets/Header/Header';
import { ReactElement, useEffect } from 'react';
import { Outlet } from 'react-router';
import styles from './Layout.module.css'

export default function Layout(): ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
