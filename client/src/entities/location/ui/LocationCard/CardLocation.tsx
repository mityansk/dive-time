import { ILocation } from '../../model';
import styles from './CardLocation.module.css';
interface LocationCardProps {
  location: ILocation;
}
export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className={styles.Card}>
      <div className={styles.Statistic}>
        <img
          className={styles.Img}
          alt="Фотография карточки"
          src={`http://localhost:3000/${location.image}`}
        />
        <div>
          <div className={styles.Title}>{location.name}</div>
          <p>Глубина: {location.deep}</p>
          <p>Сложность: {location.complexity}</p>
        </div>
      </div>
      <div className={styles.Description}>
        <p>{location.description}</p>
      </div>
    </div>
  );
}
