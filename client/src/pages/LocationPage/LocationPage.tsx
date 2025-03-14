import {
  YMaps,
  Map,
  Clusterer,
  Placemark,
  GeolocationControl,
  FullscreenControl,
} from '@pbe/react-yandex-maps';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './LocationPage.module.css';
import { getLocation, ILocation } from '@/entities/location';
import { useEffect, useState } from 'react';
import { LocationCard } from '@/entities/location/ui/LocationCard/CardLocation';
import { Link } from 'react-router';
import { City } from '../../entities/location/city/city';
import config from '@/entities/location/city/config/config.json';
import citiesData from '@/entities/location/city/material/city.json';
const cities: City[] = citiesData;
export function LocationPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.location.locations);
  const [mapCenter, setMapCenter] = useState<number[]>([55.1623, 61.4001]);

  const ZOOM = 12;

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {});
  const handleCityChange = (el: string) => {
    const selectedCity = cities.find((city) => city.value === el);
    if (selectedCity) {
      setMapCenter(selectedCity.coordinates);
    }
  };

  const createBalloonContent = (location: ILocation): string => {
    return `
    <strong>${location.name}</strong><br/>
    <img style="width:100px" src="http://localhost:3000/${location.image}" alt="${location.name}" />
    <p>${location.description || ''}</p>
  `;
  };
  return (
    <YMaps
      query={{
        apikey: config.YANDEX_API_KEY,
        // , load:"package.full"
      }}
    >
      <Select
        placeholder="Ведите свой город"
        showSearch
        optionFilterProp="label"
        options={cities.map((city) => ({
          label: city.label,
          value: city.value,
        }))}
        onChange={handleCityChange}
      />
      <div className={styles.container}>
        <div className={styles.map}>
          <Map
            className={styles.mapDisplay}
            state={{
              center: mapCenter,
              zoom: ZOOM,
            }}
          >
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
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
                    iconImageHref: '/public/icon.png',
                  }}
                  properties={{
                    balloonContentBody: createBalloonContent(coordinates),
                  }}
                />
              ))}
            </Clusterer>
            <FullscreenControl />
            <GeolocationControl options={{ float: 'left' }} />
          </Map>
        </div>
        <div className={styles.box}>
          <h2>Места дайвинга</h2>
          {state?.map((location) => (
            <Link
              to={`/locations/${location.id}`}
              className={styles.card}
              key={location.id}
            >
              <LocationCard location={location} />
            </Link>
          ))}
        </div>
      </div>
    </YMaps>
  );
}
