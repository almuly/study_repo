import React, {useState, useEffect, useReducer} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {
    TextField,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Card,
    Button,
    Typography,
    Container,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import {useSnackbar} from 'notistack';
import {HistoryContext} from "./HistoryContext";
import HistoryList from "./HistoryList";
import reducer from "./reducer";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 300,
    },
});


export default function App() {
    const classes = useStyles();
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('minsk');
    const [value, setValue] = useState('');
    const [state, dispatch] = useReducer(reducer, weather ? JSON.parse(localStorage.getItem("weather")) : [])

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const handleClick = () => {
        setCity(value)
        addToHistory()
        setValue('')
    }

    const handleKeyPress = (event) => {
        if (event.key ===
            'Enter') {
            handleClick()
        }
    }

    const addToHistory = () => {
        dispatch({
            type: 'add',
            payload: weather
        })

    }

    useEffect(() => {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55&units=metric`;
        axios.get(apiUrl)
            .then((resp) => {
                const allWeather = resp.data;
                setWeather(allWeather);
            })
            .then(() => enqueueSnackbar('Everything is OK.'))
            .catch(() => enqueueSnackbar('Something go wrong'))
    }, [city]);

    useEffect(() => {
        localStorage.setItem('weather', JSON.stringify(state))
    }, [state])


    if (weather === null) {
        return <p>Loading data...</p>;
    }

    return (
        <HistoryContext.Provider value={
            {dispatch}
        }>
            <Container maxWidth="sm">
                <div className="app">
                    <Card >
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
                                    value={value}
                                    onChange={(e) => (setValue(e.target.value))}
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
                </div>
                <HistoryList history={state}/>
            </Container>
        </HistoryContext.Provider>
    );
}
