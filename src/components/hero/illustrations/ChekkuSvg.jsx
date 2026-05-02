import React from 'react';
import styles from '../HeroBase.module.css';

export default function ChekkuSvg() {
  return (
    <svg className={styles.heroSvg} viewBox="0 0 420 360" role="presentation" aria-hidden="true" focusable="false">
      <g className={styles.seedFloat}>
        <circle cx="60" cy="302" r="5" />
        <circle cx="92" cy="324" r="4" />
        <circle cx="336" cy="310" r="5" />
        <circle cx="366" cy="286" r="4" />
      </g>
      <g className={styles.chekkuYoke} fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round">
        <path d="M105 78c66-42 146-42 210 0" />
        <path d="M126 86c54 25 114 25 168 0" />
      </g>
      <ellipse cx="210" cy="244" rx="132" ry="58" fill="none" stroke="currentColor" strokeWidth="8" />
      <ellipse cx="210" cy="244" rx="82" ry="32" fill="none" stroke="currentColor" strokeWidth="5" opacity=".58" />
      <g className={styles.chekkuSpin} transformOrigin="210 196">
        <path d="M210 112v132" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
        <path d="M160 186c34-17 66-17 100 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="210" cy="196" r="18" fill="none" stroke="currentColor" strokeWidth="6" />
      </g>
      <path d="M108 268c62 34 141 35 204 0" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" opacity=".72" />
    </svg>
  );
}
