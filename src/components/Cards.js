import React from "react";
import Card from "react-bootstrap/Card";
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
    <Card style={{ width: "18rem" }} className="d-flex .justify-content-around">
      <Card.Img
        variant="top"
        src={
          ImageURL +
          cloudinaryImageId
        }
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{avgRating}</Card.Text>
        <Card.Text>{cuisines.join(", ")}</Card.Text>
        <Card.Text>{costForTwo}</Card.Text>
        <Card.Subtitle>{`${sla?.deliveryTime} minutes`}</Card.Subtitle>
        <Card.Subtitle>{areaName}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Cards;
