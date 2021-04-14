import React from "react";
import HistoryItem from "./HistoryItem"


export default function HistoryList({history}){

return(

    <ul>
        {
            history.map(item=><HistoryItem key={item.id} {...item}/>)
        }
    </ul>

)
}
