import React from 'react';
import HeroBase from './HeroBase.jsx';
import BottleRowSvg from './illustrations/BottleRowSvg.jsx';

export default function ProductsHero() {
  return (
    <HeroBase
      page="products"
      title="Shop pure oils and premium peanuts"
      copy="Filter cold-pressed oils, pooja essentials, snacks, and trade packs from Sai Agro Foods."
    >
      <BottleRowSvg />
    </HeroBase>
  );
}
