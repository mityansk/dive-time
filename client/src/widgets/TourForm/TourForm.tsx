import { addTourThunk } from '@/entities/tour/api';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import TourFormModal from '@/components/TourFormModal/TourFormModal';
import { Button, Form, Input, DatePicker, message, GetProps, Select } from 'antd';
import { IAddTourData } from '@/entities/tour';
import dayjs from 'dayjs';
import { getLocation } from '@/entities/location';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

export default function TourForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const location = useAppSelector((state) => state.location.locations)
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getLocation())
  }, [dispatch]);

  const onFinish = async (values: IAddTourData) => { 

    try {
      const data = {
        location_name: values.location_name,
        description: values.description,
        start_date: new Date(values.date_strings![0]).toLocaleDateString(),
        end_date: new Date(values.date_strings![1]).toLocaleDateString(),
        location_id: location.find((loc) => loc.name === values.location_name)?.id,
        author_id: user!.id,
        image: location.find((loc) => loc.name === values.location_name)?.image
      };

      await dispatch(addTourThunk(data)).unwrap();
      
      message.success('Тур успешно создан!');
      navigate(CLIENT_ROUTES.TOUR);
      setIsModalOpen(false);
    } catch (error: unknown) {
      message.error(`Ошибка при создании тура: ${error}`);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day')
  }

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
                message: 'Пожалуйста, выберите локацию',
              },
            ]}
          >
            <Select placeholder='Выберите локацию'>
              {location!.map((location) => (
                <Select.Option key={location.id} value={location.name}>
                  {location.name}
                </Select.Option>
              ))}
            </Select>
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
            label="Выберите даты тура"
            name="date_strings"
            rules={[
              { required: true, message: 'Пожалуйста, выберите даты тура' },
            ]}
          >
            <RangePicker
              style={{ width: '100%' }}
              format={'DD.MM.YYYY'}
              disabledDate={disabledDate}
            />
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
