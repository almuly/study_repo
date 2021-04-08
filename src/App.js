import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {TextField} from "@material-ui/core";
import axios from 'axios'
import useErrorBoundary from "use-error-boundary"


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

    const handleClick = () => {
        setCity(value)
        setValue('')
    }

    // useEffect(() => {
    //     setTimeout(() => {(
    //
    //         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55&units=metric`)
    //             .then(response => response.json())
    //             .then(json => setWeather(json)))
    //     }, 3000)
    //
    // }, [city])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55&units=metric`,
            );

            setWeather(result.data);
        };

        fetchData();

    }, [city])
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
                                The weather is {weather.weather[0].main}. And it is a {weather.weather[0].description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <TextField
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                variant="filled"
                                label="Enter location"
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

            <pre>{JSON.stringify(weather, null, 2)}</pre>
        </Container>

    );
}
