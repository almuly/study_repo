import React from "react";
import FavouriteItem from "./FavouriteItem"


export default function FavouriteList({favourite}){

return(

    <ul>
        {
            favourite.map(item=><FavouriteItem key={item.id} {...item}/>)
        }
    </ul>

)
}
