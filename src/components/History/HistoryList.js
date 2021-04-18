import React from "react";
import HistoryItem from "./HistoryItem"
import {Card} from "@material-ui/core";
import {useHistoryWeather} from "./HistoryContext";


export default function HistoryList() {
const {state} = useHistoryWeather()


    console.log( (state))
    return (

        <Card>
            {
                state.map(item => <HistoryItem key={item.id} {...item}/>)
            }
        </Card>

    )
}
