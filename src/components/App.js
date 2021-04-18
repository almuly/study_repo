import React from "react";

import {Container} from "@material-ui/core";

import HistoryList from "./History/HistoryList";
import {useHistoryWeather} from "./History/HistoryContext";
import WeatherCard from "./WeatherCard";


export default function App() {
    const {state} = useHistoryWeather()
    return (

        <Container maxWidth="sm">
            <WeatherCard/>
            <HistoryList history={state}/>
        </Container>

    );
}
