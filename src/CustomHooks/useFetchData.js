import { useEffect, useState } from 'react'
import { currentURL } from '../util/restaurantData';

const useFetchData = () => {
    const [fetchedData, setFetchedData] = useState([]);

    const fetchData = async () => {
        const res = await fetch(currentURL);
        const json = await res.json();
        console.log(json);
        console.log(
          json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFetchedData(
          json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
      };

    useEffect(()=>{
        fetchData();
    },[])

  return fetchedData;
}

export default useFetchData;