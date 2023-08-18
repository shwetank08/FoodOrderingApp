import { useEffect, useState } from 'react'
import { currentURL } from '../util/restaurantData';

const useFetchData = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(currentURL);
    const json = await res.json();

    const fn = async(json) => {
      json?.data?.cards.forEach(card => {
        let availableData = card?.gridElements?.infoWithStyle?.restaurants;
        if (availableData != undefined) {
          return availableData;
        }
      });
    }

    let cardData = await fn(json);
    


    console.log(json);
    console.log(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFetchedData(cardData);
    setFilteredData(cardData)
  };

  useEffect(() => {
    fetchData();
  }, [])

  return [fetchedData, filteredData];
}

export default useFetchData;