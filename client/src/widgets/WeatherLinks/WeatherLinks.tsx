import React from 'react';
import styles from './WeatherLinks.module.css';

interface WeatherSite {
  name: string;
  icon: string;
  link: string;
}

const weatherSites: WeatherSite[] = [
  {
    name: 'Windy',
    icon: 'https://www.windy.com/favicon.ico',
    link: 'https://www.windy.com',
  },
  {
    name: 'Tide Forecast',
    icon: 'https://www.tide-forecast.com/favicon.ico',
    link: 'https://www.tide-forecast.com',
  },
  // Другие сайты...
];

const WeatherLinks: React.FC = () => {
  return (
    <div className={styles.weatherLinksContainer}>
      <h2 className={styles.weatherTitle}>Прогноз погоды</h2>
      <div className={styles.dropletsContainer}>
        {weatherSites.map((site, index) => (
          <a
            key={index}
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dropletLink}
          >
            <img
              src={site.icon}
              alt={site.name}
              className={styles.dropletIcon}
            />
            <span className={styles.dropletText}>{site.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WeatherLinks;
