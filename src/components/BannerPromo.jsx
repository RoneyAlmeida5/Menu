import React from "react";
import Banner from "../assets/bannercard.jpg"; // Importe a imagem aqui

const BannerPromo = () => {
  return (
    <div className="mb-6">
      <img
        src={Banner}
        alt="Banner de bolo"
        className="rounded-lg w-full h-70 object-cover"
      />
    </div>
  );
};

export default BannerPromo;
