import React from "react";
import Banner from "../../assets/bannercard.jpg";

const BannerPromo = ({ company }) => {
  const bannerUrl =
    company && company.banner
      ? `http://localhost:3000${company.banner}`
      : Banner;

  return (
    <div className="mb-6">
      <img
        src={bannerUrl}
        alt="Banner de promoção"
        className="rounded-lg w-full h-full object-cover"
      />
    </div>
  );
};

export default BannerPromo;
