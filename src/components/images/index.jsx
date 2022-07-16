import React from "react";
import FINANSERVS_HORIZONTAL from "./logo-horizontal.png";
import FINANSERVS_HORIZONTAL_WHITE from "./logo-horizontal-white.png";
import FINANSERVS_VERTICAL from "./logo-vertical.jpg";
import ROLANDO_SANCHEZ from "./Firma_Rolando_Sanchez.jpg"

export const FinanservsHorizontalLogoImg = () => {
  return (
    <img
      src={FINANSERVS_HORIZONTAL}
      alt="Finanservs credito prestamo"
      width="200px"
    />
  );
};

export const FinanservsHorizontalLogoWhiteImg = () => {
  return (
    <img
      src={FINANSERVS_HORIZONTAL_WHITE}
      alt="Finanservs crédito préstamo"
      width="200px"
    />
  );
};

export const FinanservesVerticalLogoImg = () => {
  return (
    <img 
      src={FINANSERVS_VERTICAL} 
      alt="Finanservs logo vertical"  
      width="180px"
    />
  );
};

export const FirmaRS = () => {
  return (
    <img 
      src={ROLANDO_SANCHEZ} 
      alt="Rolando_Sanchez"  
      width="300px"
    />
  );
};
