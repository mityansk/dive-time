import styles from './LocationInfoPage.module.css';
import { getLocationById } from '@/entities/location/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export function LocationInfoPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const loc = useAppSelector(state => state.location.location);

	useEffect(() => {
		if (id) {
			dispatch(getLocationById(Number(id)));
		}
	}, [id, dispatch]);
	return (
		<div>
			{loc ? (
				<div className={styles.container}>
					<h2>{loc.name}</h2>
					<p>{loc.description}</p>
					<img
						className={styles.mainImage}
						alt='Фотография'
						src={`http://localhost:3000/${loc.image}`}
					/>
					<div>
						{loc.arrayImage.map(image => (
							<div className={styles.containerImage} key={image}>
								<img
									className={styles.extraImage}
									alt='Фотография'
									src={`http://localhost:3000/${image}`}
								/>
							</div>
						))}
					</div>
				</div>
			) : (
				<div>Локация не найдена</div>
			)}
		</div>
	);
}
