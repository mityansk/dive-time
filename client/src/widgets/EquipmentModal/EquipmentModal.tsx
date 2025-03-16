import { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Checkbox, Button } from 'antd';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import {
  addEquipmentThunk,
  updateEquipmentThunk,
} from '@/entities/equipment/api';
import { IAddEquipmentData, IEquipmentData } from '@/entities/equipment/model';
import { IGeocodeResult } from 'yandex-maps';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: IEquipmentData | null | undefined;
}

interface IGeoObjectWithAddress extends ymaps.GeoObject {
  getAddressLine: () => string;
}

type MapMouseEvent = {
  get: (key: string) => [number, number]; // Возвращает координаты
};

export default function EquipmentModal({
  isOpen,
  onClose,
  equipment,
}: EquipmentModalProps) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [address, setAddress] = useState(equipment?.address || '');
  const [coordinates, setCoordinates] = useState<[number, number]>(
    equipment?.coordinates || [55.751244, 37.618423]
  );

  // Функция для геокодирования координат в адрес
  const getAddressFromCoordinates = (coords: [number, number]) => {
    console.log('Запрашиваем адрес для координат:', coords);

    if (!window.ymaps) {
      console.error('❌ Yandex Maps API не загружен');
      return;
    }

    window.ymaps
      .geocode(coords)
      .then((res: IGeocodeResult) => {
        const firstGeoObject = res.geoObjects.get(0) as IGeoObjectWithAddress;
        const newAddress = firstGeoObject
          ? firstGeoObject.getAddressLine()
          : 'Адрес не найден';

        console.log('✅ Найденный адрес:', newAddress);
        setAddress(newAddress); // Обновляем состояние

        form.setFieldsValue({ address: newAddress }); // Обновляем инпут формы
      })
      .catch((err) => {
        console.error('Ошибка геокодинга:', err);
      });
  };

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(
        equipment || {
          name: '',
          price: 0,
          description: '',
          image: '',
          isRented: false,
          address: '',
          coordinates: [55.751244, 37.618423],
        }
      );
    }
  }, [isOpen, equipment, form]);

  const handleSubmit = (values: IEquipmentData) => {
    const equipmentData = { ...values, address, coordinates };
    if (equipment) {
      dispatch(updateEquipmentThunk({ ...equipmentData, id: equipment.id }));
    } else {
      dispatch(addEquipmentThunk(equipmentData as IAddEquipmentData));
    }
    onClose();
  };

  return (
    <Modal
      title={equipment ? 'Редактировать снаряжение' : 'Добавить снаряжение'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Цена"
          name="price"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Изображение (URL)"
          name="image"
          rules={[{ required: true, message: 'Введите URL изображения' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="isRented" valuePropName="checked">
          <Checkbox>Снаряжение в аренде</Checkbox>
        </Form.Item>

        <YMaps query={{ apikey: '37589157-41df-4c37-9939-de9d8b65a791' }}>
          <Map
            defaultState={{ center: coordinates, zoom: 10 }}
            width="100%"
            height={300}
            onClick={(event: MapMouseEvent) => {
              const coords = event.get('coords');
              console.log('📍 Новые координаты:', coords);
              setCoordinates(coords);
              getAddressFromCoordinates(coords); // Получаем адрес по координатам
            }}
          >
            <Placemark geometry={coordinates} />
          </Map>
        </YMaps>

        <Form.Item label="Адрес" name="address">
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            {equipment ? 'Сохранить' : 'Добавить'}
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
