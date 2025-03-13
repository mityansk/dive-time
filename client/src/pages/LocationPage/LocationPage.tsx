import { YMaps, Map } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './LocationPage.module.css';
import { getLocation } from '@/entities/location';
import { useEffect } from 'react';
import { LocationCard } from '@/entities/location/ui/LocationCard/CardLocation';
import { Link } from 'react-router';
export function LocationPage() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.location.locations);

	useEffect(() => {
		dispatch(getLocation());
	}, [dispatch]);

const CENTER = [51.84168211156664, 104.76153977184012];
const ZOOM = 12

	return (
		<YMaps>
			<div className={styles.container}>
				<div className={styles.map}>
					<Map
						className={styles.mapDisplay}
						defaultState={{
							center: CENTER,
							zoom: ZOOM,
						}}
					/>
				</div>
				<div className={styles.box}>
					<h2>Места дайвинга</h2>

					{state?.map(location => (
						<Link to={`/locations/${location.id}`} className={styles.card}>
							<LocationCard key={location.id} location={location} />
						</Link>
					))}
				</div>
			</div>
		</YMaps>
	);
}
