import { Suspense, useEffect, useState } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  Clusterer,
  GeolocationControl,
  FullscreenControl,
  SearchControl,
} from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { IEquipmentData } from '@/entities/equipment/model';
import styles from './EquipmentPage.module.css';
import { getDistance } from 'geolib';
import EquipmentList from '@/widgets/EquipmentList/EquipmentList';
import { getEquipmentThunk } from '@/entities/equipment/api';

export function EquipmentPage() {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const [filteredEquipments, setFilteredEquipments] = useState<
    IEquipmentData[]
  >([]);
  const [mapCenter, setMapCenter] = useState<number[]>([61, 105]);
  const [zoom, setZoom] = useState(3);
  const [placemarks, setPlacemarks] = useState<React.ReactNode[]>([]);

  // Загружаем все снаряжение при монтировании компонента
  useEffect(() => {
    dispatch(getEquipmentThunk());
  }, [dispatch]);

  // Функция для определения радиуса на основе зума
  const getRadiusByZoom = (zoomLevel: number) => {
    if (zoomLevel <= 3) return 10000000; // 10,000 км (весь мир)
    if (zoomLevel <= 5) return 5000000; // 5000 км
    if (zoomLevel <= 7) return 1000000; // 1000 км
    if (zoomLevel <= 9) return 700000; // 700 км
    if (zoomLevel <= 11) return 500000; // 500 км
    if (zoomLevel <= 13) return 200000; // 200 км
    if (zoomLevel <= 15) return 100000; // 100 км
    if (zoomLevel <= 17) return 50000; // 50 км
    if (zoomLevel <= 19) return 20000; // 20 км
    return 10000; // 10 км для максимального приближения
  };

  const createBalloonContent = (equipment: IEquipmentData): string => {
    return `
      <div style="width:200px">
        <strong>${equipment.name}</strong><br/>
        <img style="width:100%" src="${equipment.image}" alt="${
      equipment.name
    }" />
        <p>Цена: ${equipment.price} ₽/сутки</p>
        <p>Статус: ${equipment.isRented ? 'Арендовано' : 'Доступно'}</p>
      </div>
    `;
  };

  const handleMapChange = (e: ymaps.IEvent) => {
    const newCenter = e.get('newCenter') as number[];
    const newZoom = e.get('newZoom') as number;
    setMapCenter(newCenter);
    setZoom(newZoom);

    const radius = getRadiusByZoom(newZoom);
    const filtered = equipments?.filter((equipment: IEquipmentData) => {
      if (!equipment.coordinates) return false;
      const distance = getDistance(
        { latitude: newCenter[0], longitude: newCenter[1] },
        {
          latitude: equipment.coordinates[0],
          longitude: equipment.coordinates[1],
        }
      );
      return distance <= radius;
    });

    setFilteredEquipments(filtered || []);
  };

  // фильтрование списка при загрузке
  useEffect(() => {
    if (equipments) {
      const radius = getRadiusByZoom(zoom);
      const filtered = equipments.filter((equipment: IEquipmentData) => {
        if (!equipment.coordinates) return false;
        const distance = getDistance(
          { latitude: mapCenter[0], longitude: mapCenter[1] },
          {
            latitude: equipment.coordinates[0],
            longitude: equipment.coordinates[1],
          }
        );
        return distance <= radius;
      });
      setFilteredEquipments(filtered);
    }
  }, [equipments, mapCenter, zoom]);

  // Обновление маркеров на карте
  useEffect(() => {
    const generatedPlacemarks =
      equipments?.map((equipment: IEquipmentData) => {
        if (equipment.coordinates) {
          return (
            <Placemark
              key={equipment.id}
              geometry={equipment.coordinates}
              properties={{
                balloonContentBody: createBalloonContent(equipment),
              }}
              options={{
                preset: 'islands#blueIcon',
              }}
              modules={['geoObject.addon.balloon']}
            />
          );
        }
        return null;
      }) || [];
    setPlacemarks(generatedPlacemarks);
  }, [equipments]);

  return (
    <>
      <h1 className={styles.text}>
        Добро пожаловать в подводное приключение! 🌊 <br /> Мы предлагаем вам
        уникальную возможность выбрать и арендовать лучшее снаряжение и
        оборудование для дайвинга. <br /> Откройте для себя подводный мир 🐠 с
        комфортом и стилем!🤿
      </h1>

      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <YMaps query={{ apikey: '37589157-41df-4c37-9939-de9d8b65a791' }}>
            <Map
              className={styles.map}
              state={{
                center: mapCenter,
                zoom: zoom,
              }}
              onBoundsChange={handleMapChange}
            >
              <Clusterer
                options={{
                  preset: 'islands#invertedVioletClusterIcons',
                  groupByCoordinates: false,
                }}
              >
                {placemarks}
              </Clusterer>
              <FullscreenControl />
              <SearchControl options={{ float: 'left', size: 'auto' }} />
              <GeolocationControl options={{ float: 'left' }} />
            </Map>
          </YMaps>
        </div>
        <div className={styles.equipmentListContainer}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <EquipmentList
              filteredEquipments={filteredEquipments}
              className={styles.equipmentPageCard}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
