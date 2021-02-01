import React from "react";
import Router from "./router";
import {Provider} from "react-redux";
import store from "./redux/store";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const AppMain = () =>(
    <Provider store={store}>
        <ReactNotification />
        <Router />
    </Provider>
);

export default AppMain;

