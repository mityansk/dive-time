import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './Footer.module.css';
import { Facebook, Instagram, Twitter, Send } from 'lucide-react';
import FeedbackFormModal from '../FeedbackForm/FeedbackForm';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Typography.Text style={{ color: 'white' }}>
        © 2025 DIVE TIME. Все права защищены.
      </Typography.Text>
      <FeedbackFormModal />
      <div className={styles.socialIcons}>
        <a
          href="https://t.me/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send size={24} />
        </a>
        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={24} />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={24} />
        </a>
      </div>
    </Footer>
  );
};

export default AppFooter;
