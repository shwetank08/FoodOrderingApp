import React from "react";
import { ImageURL } from "../util/restaurantData";

const Cards = ({
  name,
  cuisines,
  avgRating,
  areaName,
  cloudinaryImageId,
  costForTwo,
  sla
}) => {
  return (
    <div className="w-72 max-w-sm rounded overflow-hidden shadow-lg gap-4">
      <img
        variant="top"
        className="w-full"
        src={
          ImageURL +
          cloudinaryImageId
        }
        alt="Outlet"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="font-bold text-xl mb-2"> {avgRating}</div>
        <div className="font-bold text-xl mb-2">{areaName}</div>
      </div>

    </div>
  );
};

export default Cards;
