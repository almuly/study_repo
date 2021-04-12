import React, {useContext} from "react";
import {HistoryContext} from './App'
import Button from '@material-ui/core/Button';

const History = () => {
   const historyContext = useContext(HistoryContext)

    return(
        <Button
        onClick={()=>historyContext.historyDispatch('ADD')}>
            Add to history
        </Button>
    )
}
export default History
