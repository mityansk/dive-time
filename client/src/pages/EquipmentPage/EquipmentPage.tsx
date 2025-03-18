import { Suspense, useEffect, useState } from 'react';
import EquipmentList from '@/widgets/EquipmentList/EquipmentList';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { IEquipmentData } from '@/entities/equipment/model';

export function EquipmentPage() {
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const [placemarks, setPlacemarks] = useState<React.ReactNode[]>([]);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const generatedPlacemarks =
      equipments?.map((equipment: IEquipmentData) => {
        if (equipment.coordinates && equipment.address) {
          return (
            <Placemark
              key={equipment.id}
              geometry={equipment.coordinates}
              properties={{
                balloonContentHeader: equipment.name,
                balloonContentBody: `Цена: ${equipment.price} ₽\nСтатус: ${
                  equipment.isRented ? 'Арендовано' : 'Доступно'
                }`,
                balloonContentFooter: equipment.address,
              }}
            />
          );
        }
        return null;
      }) || [];

    setPlacemarks(generatedPlacemarks);
  }, [equipments]);

  return (
    <div style={{paddingTop: '80px'}}>
      {!isAuthenticated && (
        <h1
          style={{
            color: '#0077be',
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            textAlign: 'center',
            margin: '14px 0',
          }}
        >
          "Добро пожаловать в подводное приключение! 🌊 <br /> Мы предлагаем вам
          уникальную возможность выбрать и арендовать лучшее снаряжение и
          оборудование для дайвинга. <br /> Откройте для себя подводный мир 🐠 с
          комфортом и стилем!🤿"
        </h1>
      )}
      {!isAuthenticated && (
        <YMaps query={{ apikey: '37589157-41df-4c37-9939-de9d8b65a791' }}>
          <Map
            defaultState={{ center: [55.751244, 37.618423], zoom: 10 }}
            width="100%"
            height={400}
          >
            {placemarks}
          </Map>
        </YMaps>
      )}
      <Suspense fallback={<div>Загрузка...</div>}>
        <EquipmentList />
      </Suspense>
    </div>
  );
}
