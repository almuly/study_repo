import React, {useContext} from "react";
import {HistoryContext} from "./HistoryContext";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import {CardContent, CardMedia, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    media: {
        height: 300,
    },
});
export default function HistoryItem({id, temp, name,icon}) {

    const classes = useStyles();
    let dateTag = new Date(Date.now()).toLocaleString()
    const {dispatch} = useContext(HistoryContext)
    return (
        <CardContent>
            <DeleteSharpIcon
                color="secondary"
                onClick={() => dispatch({
                type: 'remove',
                payload: id
            })} />
            <Typography>{dateTag}</Typography>
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
