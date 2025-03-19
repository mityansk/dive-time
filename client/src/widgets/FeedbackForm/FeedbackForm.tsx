import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';

const FeedbackFormModal: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Отправлено:', values);

      // Отправка данных на сервер
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(
          'Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.'
        );
        form.resetFields();
        setVisible(false);
      } else {
        message.error(
          'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.'
        );
      }
    } catch (errorInfo) {
      console.log('Ошибка:', errorInfo);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        style={{ backgroundColor: 'rgba(8, 27, 78, 0.602)' }}
        type="primary"
        onClick={showModal}
      >
        Есть правки или предложения
      </Button>
      <Modal
        title="Обратная связь"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваше имя!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Электронная почта"
            rules={[
              {
                required: true,
                type: 'email',
                message:
                  'Пожалуйста, введите корректный адрес электронной почты!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите Описание!',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FeedbackFormModal;
