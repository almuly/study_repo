import React from "react";
import {useHistoryWeather} from "./HistoryContext";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {CardContent, CardMedia, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    media: {
        height: 300,
    },
});
export default function HistoryItem({id, temp, name,icon,date}) {

    const classes = useStyles();

    const {remove} = useHistoryWeather()
    return (
        <CardContent>
            <DeleteSharpIcon
                color="secondary"
                onClick={() => remove(id)} />
            <Typography>{date}</Typography>
            <Typography>{name}</Typography>
            <Typography>The temperature was {temp} °C</Typography>
            <CardMedia
                style={{
                    maxWidth: 100,
                    maxHeight: 60,
                    margin: '0 auto'
                }}
                className={classes.media}
                image={`http://openweathermap.org/img/wn/${icon}@2x.png`}

            />

        </CardContent>


    )

}
