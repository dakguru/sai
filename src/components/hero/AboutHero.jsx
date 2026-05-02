import React from 'react';
import HeroBase from './HeroBase.jsx';
import ChekkuSvg from './illustrations/ChekkuSvg.jsx';

export default function AboutHero() {
  return (
    <HeroBase
      page="about"
      title="Rooted in Karur. Made for honest kitchens."
      copy="Sai Agro Foods brings agricultural sourcing, edible oil manufacturing, and practical quality systems together at Pasupathipalayam, Karur."
    >
      <ChekkuSvg />
    </HeroBase>
  );
}
