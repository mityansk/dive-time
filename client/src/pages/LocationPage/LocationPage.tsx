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
import { getDistance } from 'geolib';
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
      filterLocations(selectedCity.coordinates);
    }
  };

  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>([]);

  const filterLocations = (cityCoordinates: number[]) => {
    const filtered = state?.filter((location) => {
      const distance = getDistance(
        { latitude: cityCoordinates[0], longitude: cityCoordinates[1] },
        {
          latitude: Number(location.coordinateX),
          longitude: Number(location.coordinateY),
        }
      );
      return distance <= 100000; // 100 км = 100000 метров
    });
    setFilteredLocations(filtered || []);
  };

  const createBalloonContent = (location: ILocation): string => {
    return ` <div style="width:200px">
    <strong>${location.name}</strong><br/>
    <img style="width:100%" src="http://localhost:3000/${
      location.image
    }" alt="${location.name}" />
    <p>${location.description || ''}</p>
    <button onclick="document.location='/locations/${
      location.id
    }'">Перейти</button>
    </div>
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
                    iconImageHref: '/icon.png',
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
          {filteredLocations?.length === 0 ? (
            <p>Нет мест дайвинга в вашем Радиусе</p>
          ) : (
            filteredLocations?.map((location) => (
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
    </YMaps>
  );
}
