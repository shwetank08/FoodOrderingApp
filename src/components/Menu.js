import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImageURL, URL } from "../util/restaurantData";
import MenuCard from "./MenuCard";
import useRestrauntMenu from "../CustomHooks/useRestrauntMenu";
import MenuItems from "./MenuItems";
const Menu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);

  const [resInfo, menuItems] = useRestrauntMenu(resId);
  console.log(resInfo);
  console.log(menuItems);

  if (resInfo === null) {
    return <Shimmer />;
  }
  console.log(resInfo);
  const {
    name,
    cuisines,
    totalRatingsString,
    areaName,
    avgRating,
    costForTwoMessage,
  } = resInfo;
  console.log(resInfo);
  const { deliveryTime } = resInfo.sla;
  console.log(deliveryTime);
  return (
    <div className="container">
      <MenuCard name={name} cuisines={cuisines} totalRatingsString={totalRatingsString} areaName={areaName} avgRating={avgRating} costForTwoMessage={costForTwoMessage} deliveryTime={deliveryTime} itemCards={menuItems}/>
      {menuItems && menuItems.map((e,index)=>{
          {console.log(e.itemCards[0]?.card?.info);}
          return(<MenuItems data={e} key={e.title} showItem={index===showIndex?true:false} handleShowItems={()=>setShowIndex(index)}/>)
      })}
    </div>
   );
};



export default Menu;
