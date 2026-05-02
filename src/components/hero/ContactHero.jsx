import React from 'react';
import HeroBase from './HeroBase.jsx';
import MapFragmentSvg from './illustrations/MapFragmentSvg.jsx';

export default function ContactHero({ copy }) {
  return (
    <HeroBase
      page="contact"
      title="Visit or contact Sai Agro Foods"
      copy={copy}
    >
      <MapFragmentSvg />
    </HeroBase>
  );
}
