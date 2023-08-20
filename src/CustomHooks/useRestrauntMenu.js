import React, { useEffect, useState } from 'react'
import { URL } from '../util/restaurantData';

const useRestrauntMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(
                URL + resId
            );
            const json = await res.json();
            const information = json?.data?.cards?.map((x) => x.card).find((x) => x && x.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")?.card.info || null;
            setResInfo(information);

            const items = json?.data.cards?.find((x)=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x)=>x.card?.card)?.filter((x)=>x["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
            setMenuItems(items);
            console.log(items);
            console.log("json->data",json.data);
        } catch (err) {
            console.log(err);
        }
    };

    return [resInfo, menuItems];
}

export default useRestrauntMenu;