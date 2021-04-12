import React, {useState, useEffect, useReducer} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {TextField} from "@material-ui/core";
import axios from 'axios'
import {useSnackbar} from 'notistack';
import History from "./History";


const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 300,
    },
});

export const HistoryContext = React.createContext()
const initialState = [];

function reducer(state, action) {
    switch (action) {
        case 'ADD':
            return [...state, state.push(weather)];
        default:
            return state;
    }
}


export default function App() {
    const [history, dispatch] = useReducer(reducer, initialState)
    const classes = useStyles();
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('minsk');
    const [value, setValue] = useState('');
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const handleClick = () => {
        setCity(value)
        setValue('')
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
                setWeather(allWeather);
            })
            .then(() => enqueueSnackbar('Everything is OK.'))
            .catch(() => enqueueSnackbar('Something go wrong'))

    }, [city]);
    if (weather === null) {
        return <p>Loading data...</p>;
    }
    return (
        <HistoryContext.Provider value={{
            historyHistory: history
            , historyDispatch: dispatch
        }}>

            <Container maxWidth="sm">
                <div className="app">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    maxWidth: 300,
                                    maxHeight: '100%',
                                    margin: '0 auto'
                                }}
                                className={classes.media}
                                image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                title="Contemplative Reptile"
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
                    <History/>

                </div>
                <pre>{JSON.stringify(weather, null, 2)}</pre>
            </Container>
        </HistoryContext.Provider>
    );
}
