import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { JSX, useEffect } from 'react';
import { IAddTourDataWithId, ITour } from '../../model';
import { updateTourThunk } from '../../api';
import {
  Button,
  Form,
  Input,
  DatePicker,
  message,
  GetProps,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { getLocation } from '@/entities/location';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './TourUpdateForm.module.css';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface TourUpdateFormProps {
  tour: ITour;
  onSave: () => void;
}

export default function TourUpdateForm({
  tour,
  onSave,
}: TourUpdateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const locations = useAppSelector((state) => state.location.locations);

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({
      location_name: tour.location_name,
      description: tour.description,
      date_strings: [dayjs(tour.start_date), dayjs(tour.end_date)],
    });
  }, [tour, form]);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const handleSave = async (values: IAddTourDataWithId) => {
    try {
      const data = {
        id: tour.id,
        location_name: values.location_name,
        description: values.description,
        start_date: new Date(values.date_strings![0]).toLocaleDateString(),
        end_date: new Date(values.date_strings![1]).toLocaleDateString(),
        location_id: locations.find((loc) => loc.name === values.location_name)
          ?.id,
        image: locations.find((loc) => loc.name === values.location_name)
          ?.image,
      };

      await dispatch(updateTourThunk(data)).unwrap();
      message.success('Тур успешно обновлен!');
      onSave();
    } catch (error: unknown) {
      message.error(`Ошибка при обновлении тура: ${error}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form form={form} onFinish={handleSave} layout="vertical">
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
          <Select placeholder="Выберите локацию">
            {locations.map((location) => (
              <Select.Option key={location.id} value={location.name}>
                {location.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
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
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
