import React from "react";
import {Container} from "@material-ui/core";


import {HistoryProvider} from "./History/HistoryContext";
import HistoryList from "./History/HistoryList";
import WeatherCard from "./WeatherCard";


export default function App() {



    return (

        <HistoryProvider>
            <Container maxWidth="sm">
                <div className="app">
                    <WeatherCard />
                </div>
                <HistoryList />
            </Container>
        </HistoryProvider>

    );
}
