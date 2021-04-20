import React from "react";

import {Container} from "@material-ui/core";

import HistoryList from "./History/HistoryList";
import {useHistoryWeather} from "./History/HistoryContext";
import WeatherCard from "./WeatherCard";
import Modal from "./Modal";
import useModal from "../hooks/useModal";


export default function App() {
    const {state} = useHistoryWeather()
    const {isShowing, toggle} = useModal();
    return (

        <Container maxWidth="sm">

            <button className="button-default" onClick={toggle}>LogIn</button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
            <WeatherCard/>
            <HistoryList history={state}/>
        </Container>

    );
}
