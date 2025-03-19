import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './Footer.module.css';
import FeedbackFormModal from '../FeedbackForm/FeedbackForm';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Typography.Text style={{ color: 'white' }}>
        © 2025 DIVE TIME. Все права защищены.
      </Typography.Text>
      <FeedbackFormModal />
    </Footer>
  );
};

export default AppFooter;