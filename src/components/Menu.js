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
        URL+resId
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
    <Container>
      <Row className="mt-3" style={{ color: "#3e4152", fontWeight: "800" }}>
        <Col>
          <h2 style={{ color: "#282c3f" }}>{name}</h2>
          <h5 className="text-muted">{cuisines.join(", ")}</h5>
          <h5 className="text-muted">{areaName}</h5>
        </Col>
        <Col className="d-flex flex-column align-items-end">
          <div className="d-flex flex-column justify-content-center border border-success rounded p-2">
            <h4 className="d-flex justify-content-center">
              <i class="bi bi-star-fill"></i>
              {`  ${avgRating}`}
            </h4>
            <h4 className="border-top">{totalRatingsString}</h4>
          </div>
        </Col>
      </Row>
      <Row
        className="border-top"
        style={{ height: "4px", width: "100%" }}
      ></Row>
      <Row>
        <h4>
          <i class="bi bi-clock"></i>
          {` ${deliveryTime} mins`} {` ${costForTwoMessage}`}
        </h4>
      </Row>
      
      {
        itemCards && itemCards.map((e)=>{
          return(
          <Row className="border-top mt-2 mb-2">
            <Col><div>{e.card.info.name}</div><div>{e.card.info.description}</div></Col>
            <Col className="d-flex flex-column align-items-end"><img src={ImageURL+e.card.info.imageId} className="border-round" style={{width: "118px", height: "96px"}}></img></Col>
          </Row>
          )})
      }
    </Container>
  );
};

export default Menu;
