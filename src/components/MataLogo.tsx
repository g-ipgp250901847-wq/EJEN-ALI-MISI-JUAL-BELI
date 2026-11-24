import React from 'react';

interface MataLogoProps {
  className?: string;
}

export const MataLogo: React.FC<MataLogoProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="32,4 58,18 58,46 32,60 6,46 6,18"
        fill="#0B1324"
        stroke="#22D3EE"
        strokeWidth="2.5"
      />
      <polygon
        points="32,12 50,22 50,42 32,52 14,42 14,22"
        fill="#0F1F3A"
        stroke="#F97316"
        strokeWidth="1.5"
      />
      <path
        d="M19 32C23.5 25.5 40.5 25.5 45 32C40.5 38.5 23.5 38.5 19 32Z"
        stroke="#22D3EE"
        strokeWidth="2.2"
        fill="#061224"
      />
      <circle cx="32" cy="32" r="5" fill="#F97316" />
      <circle cx="32" cy="32" r="2" fill="#E0F2FE" />
    </svg>
  );
};
