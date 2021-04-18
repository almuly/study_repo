import React from "react";
import HistoryItem from "./HistoryItem"
import {Card} from "@material-ui/core";


export default function HistoryList({history}){

return(

    <Card>
        {
            history?history.map(item=><HistoryItem key={item.id} {...item}/>):<p>nothing</p>
        }
    </Card>

)
}
