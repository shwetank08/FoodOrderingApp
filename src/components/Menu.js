import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImageURL, URL } from "../util/restaurantData";
const Menu = () => {
  const [restaurant, setRestaurant] = useState([]);

  const { resId } = useParams();

  const fetchData = async (req, res) => {
    try {
      const res = await fetch(
        URL + resId
      );
      const json = await res.json();
      setRestaurant(json.data);
      console.log(json.data.cards[0].card.card.info);
      console.log(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (restaurant.length === 0) {
    return <Shimmer />;
  }

  const {
    name,
    cuisines,
    totalRatingsString,
    areaName,
    avgRating,
    costForTwoMessage,
  } = restaurant.cards[0].card.card.info;
  const { deliveryTime } = restaurant.cards[0].card.card.info.sla;
  const { itemCards } = restaurant.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card;
  console.log(itemCards)
  return (
    <div className="container">
      <div className="grid grid-rows-1 mt-3 border-b" style={{ color: "#3e4152", fontWeight: "800" }}>
        <div className="grid grid-cols-1">
          <h2 style={{ color: "#282c3f" }} className="font-black">{name}</h2>
          <h5 className="font-medium">{cuisines.join(", ")}</h5>
          <h5 className="font-medium">{areaName}</h5>
        </div>
        <div className="grid grid-cols-1 d-flex flex-col align-items-end">
          <div className="flex flex-col justify-center border-1 shadow-md rounded p-2 mb-2">
            <span className="flex gap-1 justify-center">
            <svg className="mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#fb923c"></stop><stop offset="1" stop-color="#fb923c"></stop></linearGradient></defs></svg>
            <span className="text-orange-400">{ avgRating}</span>
            </span>

            <h4 className="border-t border-orange-400">{totalRatingsString}</h4>
          </div>
        </div>
      </div>
      <div
        style={{ height: "4px", width: "100%" }}
      ></div>
      <div>
        <h4 className="flex gap-1 mt-0.5">
        <svg className="" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="#3E4152" stroke-width="1.3"></circle><path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="#3E4152"></path></svg>
          <b>{` ${deliveryTime} mins`}</b> 
          <svg className="ml-2" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="9" cy="9" r="8.25" stroke="#3E4152" stroke-width="1.5"></circle><path d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z" fill="#3E4152"></path></svg>
          <b>{` ${costForTwoMessage}`}</b>
        </h4>
      </div>

      {
        itemCards && itemCards.map((e) => {
          return (
            <div className="border-t mt-2 mb-2">
              <div><div className="font-bold">{e.card.info.name}</div><div className="italic">{e.card.info.description}</div></div>
              <div className="flex flex-col items-end p-2"><img src={ImageURL + e.card.info.imageId} className="rounded-lg" style={{ width: "118px", height: "96px" }}></img></div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Menu;
