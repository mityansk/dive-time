import styles from './MainPage.module.css';
import WeatherLinks from '@/widgets/WeatherLinks/WeatherLinks';
import TipsModal from '@/widgets/TipsModal/TipsModal';

export default function MainPage() {
  return (
    <div className={styles.pageContainer}>
      <div>
        <WeatherLinks />
      </div>
      <div>
        <TipsModal />
      </div>
      <div className={styles.contentContainer}>
        <h1 className={styles.mainTitle}>
          <h3>Погрузитесь в мир приключений!</h3> 🤿Дайвинг в России: подводные
          сокровища, о которых вы не знали!🌊
        </h1>
        <h2 className={styles.subTitle}>
          Когда речь заходит о дайвинге, многие сразу представляют тропические
          острова🏝️, коралловые рифы🪸 и ярких рыбок🐠. Но знаете ли вы, что
          Россия — это настоящая сокровищница для дайверов? От холодных вод
          Баренцева моря🌊 до загадочных глубин Байкала🔍, здесь есть места,
          которые удивят даже самых опытных ныряльщиков🤿.
        </h2>
      </div>
    </div>
  );
}
