import React, {useContext} from "react";
import {HistoryContext} from "./HistoryContext";


export default function HistoryItem({id, temp, name}) {
    let dateTag = new Date(Date.now()).toLocaleString()
    const {dispatch} = useContext(HistoryContext)
    return (

        <li>
            <button onClick={() => dispatch({
                type: 'remove',
                payload: id
            })}/>
            <p>{dateTag}</p>
            <p>{name}</p>
            <p>{temp}</p>

        </li>

    )
}
