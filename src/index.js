import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {SnackbarProvider} from 'notistack';
import {HistoryProvider} from "./components/History/HistoryContext";


ReactDOM.render(
    <React.StrictMode>
        <HistoryProvider>
            <SnackbarProvider maxSnack={3}>

                <App/>
            </SnackbarProvider>
        </HistoryProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
