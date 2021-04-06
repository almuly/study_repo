import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/input';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export default function App() {

    const classes = useStyles();
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('minsk');
    const [value, setValue] = useState('');

    const handleInput = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55`)
                .then(response => response.json())
                .then(json => setWeather(json))
        }, 3000)

    }, [city])

    if (weather === null) {
        return <p>Loading data...</p>;
    }
    return (
        <div className="app">
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {weather.name},{weather.sys.country}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">

                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Input
                        type="text"
                        value={city}
                        onChange={handleInput}
                        placeholder="Enter location"
                        className="location_input"
                    />
                    <Button  onClick={setCity}/>
                </CardActions>
            </Card>


            <pre>{JSON.stringify(weather, null, 2)}</pre>
        </div>
    );
}
