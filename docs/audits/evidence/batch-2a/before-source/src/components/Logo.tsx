import React from 'react';
import logoImage from '../assets/logo.png';

export default function Logo({ className }: { className?: string }) {
  return (
    <img src={logoImage} alt="Modina Rim & Parts Ltd. Logo" className={className} />
  );
}
