import React from "react";
import React, { useEffect, useState } from "react";
import { currentURL } from "../util/restaurantData";
import "../index.css";
import Shimmer from "./Shimmer";
import Cards, { withPromotedLabel } from "./Cards";
import { Link } from "react-router-dom";
import useOnline from "../CustomHooks/useOnline";


const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const onlineStatus = useOnline();

  const CardPromoted = withPromotedLabel(Cards);

  const fetchData = async () => {
    const res = await fetch(currentURL);
    const json = await res.json();

    const fn = async (json) => {

      for (let index = 0; index < json?.data?.cards.length; index++) {
        console.log(json?.data?.cards[index])
        let availableData = json?.data?.cards[index]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (availableData != undefined) {
          console.log(availableData);
          return availableData;
        }
      }
    }

    let cardData = await fn(json);

    console.log(json);
    console.log(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setRestaurant(cardData);
    setFilteredList(cardData);
  };

  const handleSearch = () => {
    const filtered = restaurant.filter((e) =>
      e.info?.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filtered);
    console.log(restaurant);
  };



  useEffect(() => {
    fetchData();
  }, []);

  if (onlineStatus === false) {
    return (<h1>Looks like you're offline. Please check your network connection!</h1>)
  }

  return (
    <>
      <div className="flex justify-center m-4">
        <input
          className="w-50 p-3 mt-1.5 h-9 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 shadow-md rounded-lg"
          type="text"
          placeholder="Enter Restaurant"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />

        <button
          className="mt-2 ml-2 p-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          Search
        </button>
      </div>

      {restaurant?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 justify-items-center">
          {filteredList && filteredList.map((e) => {
            return (
              <Link style={{ textDecoration: "none" }} to={`/menu/${e.info?.id}`} key={e.info?.id}>
                {e.info.promoted ? (<CardPromoted {...e.info} />) : (<Cards key={e.info?.id} {...e.info} />)}
              </Link>
            );
          })}

        </div>
      )}
    </>
  );
};

export default Body;
