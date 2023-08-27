import React, { useState } from 'react'
import { ImageURL } from '../util/restaurantData';

const MenuItems = ({data, showItem, handleShowItems}) => {

    console.log(data.title);
    const categories = data?.itemCards;
    const len = data?.itemCards.length;
    console.log(categories);

    const handleClick = () => {
        handleShowItems();
    }

    return (
        <div className='w-6/12 border-black mx-auto'>
            <div className='display flex justify-between cursor-pointer rounded-md shadow-md p-3' onClick={handleClick}>
                <span className='font-bold'>{data.title} ({data.itemCards.length})</span>
                <span className='font-bold'>{showItem?"🔼":"🔽"}</span>
            </div>
            {
                showItem && categories && categories.map((e,index)=>{
                    console.log(e);
                    return(
                        <>
                        <div className='flex justify-between rounded-md cursor-pointer'>
                        <div className='p-3 flex flex-col justify-between'>
                            <div className='font-bold'>{e.card?.info?.name}</div>
                            <div className='font-semibold'>₹ {e.card?.info?.price?(e.card?.info?.price)/100:(e.card?.info?.defaultPrice)/100}</div>
                            <div className='italic'>{e.card?.info?.description}</div>
                        </div>
                        {e?.card?.info?.imageId?<img src={ImageURL + e.card.info.imageId} className="w-28 rounded-md shadow-md m-3 my-auto" />:null}
                        </div>
                        {(index==len-1)?(<div className='mt-2 mb-2 shadow-lg'></div>):(<hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>)}
                        </>
                    )
                })
            }
        </div>
    )
}

export default MenuItems;
