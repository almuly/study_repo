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
    Container
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import {useSnackbar} from 'notistack';
import FavouriteList from "./FavouriteList";


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
    const [favourite, setFavourite] = useState([{name:'minsk',
        temp:0,
        date:Date.now()}])
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
    const addToFavourite = () => {
        setFavourite(
            [...favourite,

                {id:weather.id,
                    name:weather.name,
                    date:Date.now(),
                    temp:weather.main.temp
            }]
        )
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
                                startIcon={<SearchIcon />}
                                onClick={handleClick}
                                color='primary'
                                variant='contained'>
                                Search
                            </Button>
                            <Button onClick={addToFavourite}
                                    color='primary'>Add To Favourite</Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </div>
            {/*<pre>{JSON.stringify(weather, null, 2)}</pre>*/}
            {/*<pre>{JSON.stringify(favourite, null, 2)}</pre>*/}
            <FavouriteList favourite={favourite} />
        </Container>

    );
}
