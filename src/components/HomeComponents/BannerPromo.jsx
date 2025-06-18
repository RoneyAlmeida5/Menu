import React from "react";
import ErrorBanner from "../../assets/errorbanner.png";

const BannerPromo = ({ company }) => {
  const bannerUrl =
    company && company.banner
      ? `http://localhost:3000${company.banner}`
      : ErrorBanner;

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
