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
    if (!equipments) {
      setPlacemarks([]);
      return;
    }
    const generatedPlacemarks = equipments?.map((equipment: IEquipmentData) => {
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
    });

    setPlacemarks(generatedPlacemarks);
  }, [equipments]);

  return (
    <>
      {!isAuthenticated && (
        <h1>
          Добрый день, с нашей помощью вы можете выбрать и взять в аренду
          снаряжение и оборудование для дайвинга
        </h1>
      )}

      <YMaps query={{ apikey: '37589157-41df-4c37-9939-de9d8b65a791' }}>
        <Map
          defaultState={{ center: [55.751244, 37.618423], zoom: 10 }}
          width="100%"
          height={400}
        >
          {placemarks}
        </Map>
      </YMaps>

      <Suspense fallback={<div>Загрузка...</div>}>
        <EquipmentList />
      </Suspense>
    </>
  );
}
