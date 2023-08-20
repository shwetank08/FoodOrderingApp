import React, { useState } from 'react'
import { ImageURL } from '../util/restaurantData';

const MenuItems = ({data,key}) => {

    const [showItems, setShowItems] = useState(false);

    console.log(data.title);
    const categories = data?.itemCards;
    console.log(categories);

    const handleClick = () => {
        setShowItems(!showItems);
    }

    return (
        <div className='w-6/12 border-black mx-auto'>
            <div className='display flex justify-between cursor-pointer rounded-md shadow-md p-3' onClick={handleClick}>
                <span className='font-bold'>{data.title} ({data.itemCards.length})</span>
                <span className='font-bold'>{showItems?"🔼":"🔽"}</span>
            </div>
            {
                showItems && categories && categories.map((e)=>{
                    console.log(e);
                    return(
                        <div className='flex justify-between rounded-md cursor-pointer border-b border-black'>
                        <div className='p-3 flex flex-col justify-between'>
                            <div className='font-bold'>{e.card?.info?.name}</div>
                            <div className='font-semibold'>₹ {e.card?.info?.price?(e.card?.info?.price)/100:(e.card?.info?.defaultPrice)/100}</div>
                            <div className='italic'>{e.card?.info?.description}</div>
                        </div>
                        {e?.card?.info?.imageId?<img src={ImageURL + e.card.info.imageId} className="w-28 rounded-md shadow-md m-3 my-auto" />:null}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MenuItems;

{/* <div className="border-t mt-2 mb-2">
                    <div className="grid grid-cols-2">
                        <div><div className="font-bold">{e.name}</div><div className="italic">{e.description}</div></div>
                        <div className="flex flex-col items-end p-2"><img src={ImageURL + e.imageId} className="rounded-lg shadow-md" style={{ width: "118px", height: "96px" }}></img></div>
                    </div>
                </div> */}