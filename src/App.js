import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("london");


    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ccf3aee26b06d4238093a1863d04d55`)
            .then(response => response.json())
            .then(json => setWeather(json))

    }, [city])


    return (
        <div className="app">

                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                        placeholder="Enter location"
                        className="location_input"
                    />

            <pre>{JSON.stringify(weather, null,2)}</pre>
        </div>
    );
}
