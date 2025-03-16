import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './Footer.module.css';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Typography.Text style={{ color: 'white', backgroundColor: 'black' }}>© 2025 DIVE TIME. Все права защищены.</Typography.Text>
    </Footer>
  );
};

export default AppFooter;