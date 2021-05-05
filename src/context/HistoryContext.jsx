import React, {useReducer, createContext, useContext} from 'react'


const HistoryContext = createContext()

function historyReducer(state, action) {

    switch (action.type) {

        case 'add':
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    temp: action.payload.main.temp,
                    icon: action.payload.weather[0].icon,
                    date: new Date(Date.now()).toLocaleString()
                }]
        case 'remove':
            return state.filter(hist =>
                hist.id !== action.payload
            )
        default:
            return state
    }
}

function HistoryProvider(props) {
    const item = window.localStorage.getItem("weather");
    const [state, dispatch] = useReducer(historyReducer, item ? JSON.parse(item) : [])
    const value = React.useMemo(() => [state, dispatch], [state])
    return <HistoryContext.Provider value={value} {...props} />
}

function useHistoryWeather() {
    const context = useContext(HistoryContext)
    if (!context) {
        throw new Error('useHistoryWeather must be used with a HistoryProvider')
    }

    const [state, dispatch] = context
    const add = (weather) => dispatch({type: 'add', payload: weather})
    const remove = (id) => dispatch({type: 'remove',payload: id})

    // console.log(state)


    return {
        state,
        add,
        remove
    }
}

export {HistoryProvider, useHistoryWeather}