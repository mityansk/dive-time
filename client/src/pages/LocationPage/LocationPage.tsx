import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  GeolocationControl,
  FullscreenControl,
  SearchControl,
} from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './LocationPage.module.css';
import { getLocation, ILocation } from '@/entities/location';
import { useEffect, useState } from 'react';
import { LocationCard } from '@/entities/location/ui/LocationCard/CardLocation';
import { Link } from 'react-router';
import config from '@/entities/location/city/config/config.json';
import { getDistance } from 'geolib';

export function LocationPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.location.locations);
  const [mapCenter, setMapCenter] = useState<number[]>([
    58.57194574452162, 87.7375171235891,
  ]);
  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>([]);
  const [zoom, setZoom] = useState(3);

  // Функция для определения радиуса на основе зума
  const getRadiusByZoom = (zoomLevel: number) => {
    if (zoomLevel < 4) return 5000000; // 5000 км
    if (zoomLevel < 6) return 1000000; // 1000 км
    if (zoomLevel < 8) return 700000; // 700 км
    if (zoomLevel < 10) return 500000; // 500 км
    if (zoomLevel < 12) return 200000; // 200 км
    if (zoomLevel < 14) return 100000; // 100 км
    if (zoomLevel < 16) return 50000; // 50 км
    if (zoomLevel < 18) return 20000; // 20 км
    if (zoomLevel < 20) return 10000; // 10 км
    return 5000; // 5 км
  };

  // Функция Фильтраций локаций по координатам и зуму
  const filterLocations = (coordinates: number[], zoomLevel: number) => {
    const radius = getRadiusByZoom(zoomLevel);
    const filtered = state?.filter((location) => {
      const distance = getDistance(
        { latitude: coordinates[0], longitude: coordinates[1] },
        {
          latitude: Number(location.coordinateX),
          longitude: Number(location.coordinateY),
        }
      );
      return distance <= radius;
    });
    setFilteredLocations(filtered || []);
  };

  // Функция для создания балуна с описанием локации
  const createBalloonContent = (location: ILocation): string => {
    return ` <div style="width:200px">
    <strong>${location.name}</strong><br/>
    <img style="width:100%" src="http://localhost:3000/${
      location.image
    }" alt="${location.name}" />
    <p style=" -webkit-line-clamp: 3;
  line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;">${location.description || ''}</p>
    <button onclick="document.location='/locations/${
      location.id
    }'">Перейти</button>
    </div>
    `;
  };

  // Функция для обработки изменения карты
  const handleMapChange = (e: ymaps.IEvent) => {
    const newCenter = e.get('newCenter') as number[];
    const newZoom = e.get('newZoom') as number;
    setMapCenter(newCenter);
    setZoom(newZoom);

    filterLocations(newCenter, newZoom);
  };
  //Для отрисовки карт
  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  // Для отрисовки карты при перезагрузке страницы
  useEffect(() => {
    setTimeout(() => {
      filterLocations(mapCenter, zoom);
    }, 300);
  }, [state]);

  return (
    <YMaps
      query={{
        apikey: config.YANDEX_API_KEY,
      }}
    >
      <div className={styles.container}>
        <div className={styles.map}>
          <h2>Карта погружений</h2>
          <Map
            className={styles.mapDisplay}
            state={{
              center: mapCenter,
              zoom: zoom,
            }}
            options={{
              suppressMapOpenBlock: true,
              restrictMapArea: [
                [85.23618, -178.9],
                [-73.87011, 181],
              ],
              minZoom: 3,
              maxZoom: 20,
            }}
            onBoundsChange={handleMapChange}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedBlueClusterIcons',
                groupByCoordinates: false,
              }}
            >
              {state?.map((coordinates) => (
                <Placemark
                  modules={['geoObject.addon.balloon']}
                  key={coordinates.id}
                  geometry={[
                    Number(coordinates.coordinateX),
                    Number(coordinates.coordinateY),
                  ]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '/icon.png',
                  }}
                  properties={{
                    balloonContentBody: createBalloonContent(coordinates),
                  }}
                />
              ))}
            </Clusterer>
            <FullscreenControl />
            <SearchControl options={{ float: 'left', size: 'auto' }} />
            <GeolocationControl options={{ float: 'left' }} />
          </Map>
        </div>
        <div className={styles.PreBox}>
          <h2>Места дайвинга</h2>
          <div className={styles.box}>
            {filteredLocations?.length === 0 ? (
              <p>Нет мест дайвинга в вашем Радиусе</p>
            ) : (
              filteredLocations.map((location) => (
                <Link
                  to={`/locations/${location.id}`}
                  className={styles.card}
                  key={location.id}
                >
                  <LocationCard location={location} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </YMaps>
  );
}
