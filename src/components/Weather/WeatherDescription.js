import React, {useState, useEffect} from "react";

import {useHistoryWeather} from "../../context/HistoryContext";
import {CardContent, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    media: {
        height: 400,
    },
});

const WeatherDescription = ({history}) => {
    const classes = useStyles();
    const {state} = useHistoryWeather()

    const length = history.location.state.length
    const [indexId, setIndexId] = useState(length - 1)
    const [card, setCard] = useState({})

    useEffect(() => {
        const id = history.location.state

        if (id && indexId >= 0 || indexId < length) {
            const dataId = id[indexId]
            const card = state.find((item) => dataId === item.id)

            if (card) {
                setCard(card);
                console.log(card)
                console.log(id)
                console.log(history.location.state.length)
            }
        }
    }, [indexId]);

    return (

        <div>
            <button onClick={() => (indexId < length - 1) ? setIndexId(indexId + 1) : setIndexId(0)}>previous</button>
            <CardContent>
                <Typography>{card.date}</Typography>
                <Typography>{card.name}</Typography>
                <Typography>The temperature was {card.temp} °C</Typography>
                <CardMedia
                    style={{
                        maxWidth: 100,
                        maxHeight: 60,
                        margin: '0 auto'
                    }}
                    className={classes.media}
                    image={`http://openweathermap.org/img/wn/${card.icon}@2x.png`}
                />

            </CardContent>
            <button onClick={() => (indexId > 0) ? setIndexId(indexId - 1) : setIndexId(length - 1)}>next</button>
        </div>
    );

}
export default WeatherDescription;
