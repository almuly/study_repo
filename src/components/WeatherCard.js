import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
    Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {useSnackbar} from "notistack";
import {useHistoryWeather} from "./History/HistoryContext";
import useLocalStorage from "../hooks/useLocalStorage";


const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 300,
    },
});

export default function WeatherCard() {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [weather, setWeather] = useState(null);


    const [dataWeather, setDataWeather] = useLocalStorage("weather", weather)
    const handleChange = (e) => (setQuery(e.target.value))

    const [city, setCity] = useState('minsk');
    const [query, setQuery] = useState('');
    const {add} = useHistoryWeather()
    const handleClick = () => {
        setCity(query)
        add({payload: weather})
        setQuery('')
    }
    const handleKeyPress = (event) => {
        if (event.key ===
            'Enter') {
            handleClick()
        }
    }

    useEffect(() => {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55&units=metric`;
        axios.get(apiUrl)
            .then((resp) => {
                const allWeather = resp.data;
                setDataWeather(allWeather)
                setWeather(allWeather);

            })
            .then(() => enqueueSnackbar('Everything is OK.'))
            .catch(() => enqueueSnackbar('Something go wrong'))
    }, [city]);


    if (weather === null) {
        return <p>Loading data...</p>;

    }
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    style={{
                        maxWidth: 300,
                        maxHeight: '100%',
                        margin: '0 auto'
                    }}
                    className={classes.media}
                    image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {weather.name},{weather.sys.country}.
                    </Typography>
                    <Typography variant="h6" component="h3">
                        The temperature is {weather.main.temp}°C
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h3">
                        The weather is {weather.weather[0].main}. And it is
                        a {weather.weather[0].description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <TextField
                        type="text"
                        value={query}
                        onChange={handleChange}
                        variant="filled"
                        label="Enter location"
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        startIcon={<SearchIcon/>}
                        onClick={handleClick}
                        color='primary'
                        variant='contained'>
                        Search
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}