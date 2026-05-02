import React from 'react';
import styles from '../HeroBase.module.css';

const bottles = [
  ['Groundnut', 36, 44, 88],
  ['Gingelly', 124, 22, 112],
  ['Coconut', 218, 52, 92],
  ['Palm', 306, 30, 104]
];

export default function BottleRowSvg() {
  return (
    <svg className={styles.heroSvg} viewBox="0 0 430 320" role="presentation" aria-hidden="true" focusable="false">
      <line className={styles.shelfLine} x1="28" y1="260" x2="398" y2="260" />
      {bottles.map(([label, x, y, h], index) => (
        <g className={styles.bottle} style={{ '--phase': `${index * .65}s` }} key={label} transform={`translate(${x} ${y})`}>
          <path d={`M22 18h32v34c18 12 26 30 26 54v${h}c0 21-14 35-42 35S-4 ${h + 141}-4 ${h + 120}V106c0-24 8-42 26-54Z`} fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          <clipPath id={`oil-clip-${index}`}>
            <path d={`M4 112h68v${h + 72}H4Z`} />
          </clipPath>
          <rect className={styles.oilFill} x="6" y={h + 162} width="64" height={h + 78} clipPath={`url(#oil-clip-${index})`} />
          <path d="M14 92h52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".75" />
          <text x="38" y={h + 150} textAnchor="middle">{label}</text>
        </g>
      ))}
      <g className={styles.tagFloat}>
        <path d="M58 34h28l18 18-28 28-36-36Z" />
        <path d="M352 84h24l16 16-25 25-31-31Z" />
      </g>
    </svg>
  );
}
