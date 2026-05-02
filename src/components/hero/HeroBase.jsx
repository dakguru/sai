import React from 'react';
import styles from './HeroBase.module.css';

const pageClasses = {
  about: styles.about,
  products: styles.products,
  process: styles.process,
  contact: styles.contact
};

export default function HeroBase({ page, title, copy, children }) {
  const className = [styles.hero, pageClasses[page]].filter(Boolean).join(' ');

  return (
    <section className={className}>
      <svg className={styles.noiseSource} width="0" height="0" aria-hidden="true" focusable="false">
        <filter id={`hero-noise-${page}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0 0.07  0 0 0 0.06 0" />
        </filter>
      </svg>
      <div className={styles.blobs} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={styles.noise} style={{ filter: `url(#hero-noise-${page})` }} aria-hidden="true" />
      <div className={styles.illustration} aria-hidden="true">
        {children}
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Sai Agro Foods</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        {page === 'contact' && <span className={styles.chevron} aria-hidden="true" />}
      </div>
      <svg className={styles.wave} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 58c118 36 237 48 356 36 116-12 193-58 318-58 128 0 209 60 348 66 142 7 269-36 418-76v94H0Z" />
      </svg>
    </section>
  );
}
