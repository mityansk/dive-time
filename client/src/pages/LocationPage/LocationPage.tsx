import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import styles from './LocationPage.module.css';
import { getLocation } from '@/entities/location';
import { useEffect } from 'react';
import { LocationCard } from '@/entities/location/ui/LocationCard/CardLocation';
export function LocationPage() {
	const dispatch = useAppDispatch();

	const state = useAppSelector(state => state.location.locations);

	useEffect(() => {
		dispatch(getLocation());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.map}>КАРТА</div>
			<div className={styles.box}>
				<h2>Места дайвинга</h2>
				{state?.map(location => (
					<LocationCard key={location.id} location={location} />
				))}
			</div>
		</div>
	);
}
