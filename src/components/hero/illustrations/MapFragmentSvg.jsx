import React from 'react';
import styles from '../HeroBase.module.css';

export default function MapFragmentSvg() {
  return (
    <svg className={styles.heroSvg} viewBox="0 0 440 340" role="presentation" aria-hidden="true" focusable="false">
      <g className={styles.roadFlow} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M30 254c70-32 123-48 190-38 74 11 116-8 188-65" />
        <path d="M76 72c44 45 72 88 90 132 19 48 42 82 70 102" />
        <path d="M390 292c-52-60-96-86-154-86-50 0-88-24-122-78" />
      </g>
      <g className={styles.mapPlants}>
        <path d="M72 156c18-28 38-28 58 0M101 154v44M88 188h26" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M338 86c-12-18-25-18-38 0 12 12 25 12 38 0Zm-20 0v58" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M346 238c22-18 48-18 70 0-20 17-48 17-70 0Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className={styles.orbitIcon}>
        <path d="M290 72h38v27h-38Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="m290 75 19 15 19-15" fill="none" stroke="currentColor" strokeWidth="4" />
      </g>
      <g className={styles.pinDrop}>
        <circle className={styles.pinRipple} cx="222" cy="168" r="24" />
        <path d="M222 92c-38 0-67 29-67 65 0 46 67 112 67 112s67-66 67-112c0-36-29-65-67-65Z" fill="rgba(201,161,74,.22)" stroke="currentColor" strokeWidth="7" />
        <circle cx="222" cy="160" r="21" fill="none" stroke="currentColor" strokeWidth="6" />
        <text x="222" y="296" textAnchor="middle">Pasupathipalayam, Karur</text>
      </g>
    </svg>
  );
}
