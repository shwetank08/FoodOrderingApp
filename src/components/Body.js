import React from "react";
import React, { useEffect, useState } from "react";
import { currentURL } from "../util/restaurantData";
import "../index.css";
import Shimmer from "./Shimmer";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import useOnline from "../CustomHooks/useOnline";


const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const onlineStatus = useOnline();

  const fetchData = async () => {
    const res = await fetch(currentURL);
    const json = await res.json();
    console.log(json);
    console.log(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setRestaurant(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredList(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
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

  if(onlineStatus === false){
    return (<h1>Looks like you're offline. Please check your network connection!</h1>)
  }

  return (
    <>
      <div className="">
        <input
          type="text"
          placeholder=""
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
        <div className="">
          <button
            className=""
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            Button
          </button>
        </div>
      </div>
      {restaurant?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 justify-items-center">
              {filteredList && filteredList.map((e) => {
            return (
              <Link style={{textDecoration: "none"}} to={`/menu/${e.info?.id}`} key={e.info?.id}>
              <Cards key={e.info?.id} {...e.info} />
              </Link>
            );
            })}

        </div>
            )}
    </>
  );
};

export default Body;
