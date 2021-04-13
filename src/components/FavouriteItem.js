import React from "react";



export default function FavouriteItem({id, date,temp,name}){

    return(

        <li>
            <p>{date}</p>
            <p>{name}</p>
            <p>{temp}</p>
        </li>

    )
}
