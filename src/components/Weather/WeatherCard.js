import React, {useState, useEffect} from "react";
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
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import {useSnackbar} from 'notistack';
import {useHistoryWeather} from "../../context/HistoryContext";

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
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('minsk');
    const [value, setValue] = useState('');
    const [historyId, setHistoryId] = useState([]);
    const {enqueueSnackbar} = useSnackbar();
    const {state, add} = useHistoryWeather()
    const history = useHistory()
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
    // const handleClickCard = () => {
    //     history.push({pathname: `/description/${weather.id}`, state: weather})
    // }

    useEffect(() => {
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55&units=metric`;
        axios.get(apiUrl)
            .then((resp) => {
                const allWeather = resp.data;
                setWeather(allWeather);
                add(allWeather)
                setHistoryId( [...historyId, allWeather.id])
                history.push({ state: historyId});
            })
            .then(() => enqueueSnackbar('Everything is OK.'))
            .catch(() => enqueueSnackbar('Something go wrong'))
    }, [city]);
    console.log(history)
    useEffect(() => {
        localStorage.setItem('weather', JSON.stringify(state))
    }, [state])


    if (weather === null) {
        return <p>Loading data...</p>;
    }
    return (

        <div className="app">

            <Card>
                <CardActionArea>
                    <Link to={ {pathname:`/description/${weather.id}`,
                     state:historyId}}>
                        <CardMedia
                            style={{
                                maxWidth: 300,
                                maxHeight: '100%',
                                margin: '0 auto'
                            }}
                            className={classes.media}
                            image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            // onClick={handleClickCard}
                        />
                    </Link>
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

    );
}
