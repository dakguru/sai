import React from 'react';
import styles from '../HeroBase.module.css';

export default function PressCrossSectionSvg() {
  return (
    <svg className={styles.heroSvg} viewBox="0 0 420 360" role="presentation" aria-hidden="true" focusable="false">
      <g className={styles.fallingSeeds}>
        {[84, 126, 174, 218, 268, 318].map((x, index) => (
          <circle key={x} cx={x} cy="58" r="6" style={{ '--phase': `${index * .25}s` }} />
        ))}
      </g>
      <rect x="96" y="92" width="228" height="116" rx="18" fill="none" stroke="currentColor" strokeWidth="7" />
      <g className={styles.pressBars}>
        <path d="M126 126h168M126 160h168M126 194h168" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </g>
      <path d="M210 72v176" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".65" />
      <g className={styles.oilWaves} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M116 244c26-18 52 18 78 0s52 18 78 0 40 4 54 10" />
        <path d="M118 274c26-18 52 18 78 0s52 18 78 0 40 4 54 10" opacity=".72" />
      </g>
      <path d="M180 312h60" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle className={styles.pressDrop} cx="210" cy="310" r="7" />
    </svg>
  );
}
