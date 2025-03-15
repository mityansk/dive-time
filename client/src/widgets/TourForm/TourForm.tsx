import { addTourThunk } from '@/entities/tour/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import TourFormModal from '@/components/TourFormModal/TourFormModal';
import { Button, Form, Input, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IAddTourData } from '@/entities/tour';

const { TextArea } = Input;

export default function TourForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [fileList, setFileList] = useState<File[]>([]);

  const onFinish = async (values: IAddTourData) => {
    try {
      const formData = new FormData();
      formData.append('location_name', values.location_name);
      formData.append('description', values.description);
      formData.append('start_date', values.start_date.format('DD-MM-YYYY'));
      formData.append('end_date', values.end_date.format('DD-MM-YYYY'));
      formData.append('author_id', user!.id.toString());
      //! if (fileList.length > 0) {
      //!   formData.append('image', fileList[0].originFileObj);
      //! } ЗАГРУЗКА ФОТО

      await dispatch(addTourThunk(values)).unwrap();
      message.success('Тур успешно создан!');
      navigate(CLIENT_ROUTES.TOUR);
      setIsModalOpen(false);
    } catch (error: unknown) {
      message.error(`Ошибка при создании тура: ${error}`);
    }
  };

  //! const onFileChange = ({ fileList }: any) => {
  //!   setFileList(fileList);
  //! };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: '16px' }}
      >
        Создать тур
      </Button>

      <TourFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Название локации"
            name="location_name"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите название локации',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="description"
            rules={[
              { required: true, message: 'Пожалуйста, введите описание' },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Дата начала"
            name="start_date"
            rules={[
              { required: true, message: 'Пожалуйста, выберите дату начала' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
          </Form.Item>

          <Form.Item
            label="Дата конца"
            name="end_date"
            rules={[
              { required: true, message: 'Пожалуйста, выберите дату конца' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
          </Form.Item>

          <Form.Item label="Изображение" name="image">
            <Upload
              //! fileList={fileList}
              //! onChange={onFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Создать
            </Button>
          </Form.Item>
        </Form>
      </TourFormModal>
    </div>
  );
}
