import styles from './LocationInfoPage.module.css';
import { getLocationById } from '@/entities/location/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import config from '@/entities/location/city/config/config.json';
import {
  Clusterer,
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  SearchControl,
  YMaps,
} from '@pbe/react-yandex-maps';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export function LocationInfoPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const loc = useAppSelector((state) => state.location.location);
  const mapCenter: [number, number] = [
    Number(loc?.coordinateX) || 0,
    Number(loc?.coordinateY) || 0,
  ];
  const zoom = 16;

  useEffect(() => {
    if (id) {
      dispatch(getLocationById(Number(id)));
    }
  }, [id, dispatch]);
  return (
    <YMaps
      query={{
        apikey: config.YANDEX_API_KEY,
      }}
    >
      <div>
        {loc ? (
          <div className={styles.container}>
            <img
              className={styles.mainImage}
              alt="Фотография"
              src={`http://localhost:3000/${loc.image}`}
            />
            <div className={styles.title}>
              <h2>{loc.name}</h2>
              <div className={styles.info}>
                <div>{loc.deep}</div>
                <div>{loc.complexity}</div>
              </div>
            </div>
            <div className={styles.description}>{loc.description}</div>
            <div className={styles.containerImage}>
              {loc.arrayImage.map((image) => (
                <div key={image}>
                  <img
                    className={styles.extraImage}
                    alt="Фотография"
                    src={`http://localhost:3000/${image}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Локация не найдена</div>
        )}
        <Map
          className={styles.mapDisplay}
          state={{
            center: mapCenter,
            zoom: zoom,
          }}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
            }}
          >
            {loc && (
              <Placemark
                key={loc.id}
                geometry={mapCenter}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/icon.png',
                }}
              />
            )}
          </Clusterer>
          <FullscreenControl />
          <SearchControl options={{ float: 'left', size: 'auto' }} />
          <GeolocationControl options={{ float: 'left' }} />
        </Map>
      </div>
    </YMaps>
  );
}
