import React from 'react';
import HeroBase from './HeroBase.jsx';
import PressCrossSectionSvg from './illustrations/PressCrossSectionSvg.jsx';

export default function ProcessHero() {
  return (
    <HeroBase
      page="process"
      title="From seed to bottle in 14 hours"
      copy="Cleaning, sun-drying, mara chekku pressing, cloth filtration, and careful bottling at Sai Agro Foods."
    >
      <PressCrossSectionSvg />
    </HeroBase>
  );
}
