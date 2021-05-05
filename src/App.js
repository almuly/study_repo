import React from "react";

import {Container} from "@material-ui/core";

import HistoryList from "./components/History/HistoryList";
import {useHistoryWeather} from "./context/HistoryContext";
import WeatherCard from "./components/Weather/WeatherCard";
import WeatherDescription from "./components/Weather/WeatherDescription";
import Modal from "./components/Form/Modal";
import useModal from "./hooks/useModal";
import {Link} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default function App() {
    const {state} = useHistoryWeather()
    const {isShowing, toggle} = useModal();

    return (
        <BrowserRouter>
            <Container maxWidth="sm">

                <Link href="#" color='primary'
                      onClick={toggle}>LogIn</Link>
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                />
                <Switch>
                    <Route exact path='/' component={WeatherCard}/>
                    <Route path='/description/:id' component={WeatherDescription}/>
                    <HistoryList path='/history' historyData={state}/>
                </Switch>

            </Container>
        </BrowserRouter>
    );
}
