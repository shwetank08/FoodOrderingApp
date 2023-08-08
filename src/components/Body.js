import React from "react";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { currentURL } from "../util/restaurantData";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../index.css";
import Shimmer from "./Shimmer";
import Cards from "./Cards";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");

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
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
          aria-label="Search..."
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
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
        <Container className="d-flex flex-wrap gap-5 mt-4">
              {filteredList && filteredList.map((e) => {
            return (
              <Link to={`/menu/${e.info?.id}`} key={e.info?.id}>
              <Cards key={e.info?.id} {...e.info} />
              </Link>
            );
            })}

        </Container>
            )}
    </>
  );
};

export default Body;
