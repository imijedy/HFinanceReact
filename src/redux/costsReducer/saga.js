import {call, put, fork, all, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {ADD_COST,GET_COSTS,GET_FULL_YEAR_COSTS,GET_MONTHLY_COSTS,GET_CHART_COSTS,DELETE_COST} from "../actionTypes";
import {getCosts,getCostsDone,getFullYearCostsDone,getMonthlyCostsDone,getChartCostsDone} from "./actions";

import { store as notificationStore } from 'react-notifications-component';
import {CustomNotification} from '../../components/';

const createNotification = (type,title,content) => {
    const element = <CustomNotification notificationType={type} title={title} content={content}/>;
    notificationStore.addNotification({
        content: element,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__faster", "animate__animated", "animate__zoomIn"],
        animationOut: ["animate__faster", "animate__animated", "animate__zoomOut"],
        dismiss: {
            duration: 5000
        }
    });
};

export function* getCostsWatcher(){
    yield takeEvery(GET_COSTS, getCostsWorker);
}

export function* getCostsWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getcosts", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getCostsDone(response));
    }catch (error){
        console.log("hiba");
    }

}

export function* getFullYearCostsWatcher(){
    yield takeEvery(GET_FULL_YEAR_COSTS, getFullYearCostsWorker);
}

export function* getFullYearCostsWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getsumfullyearcost", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getFullYearCostsDone(response));
    }catch (error){
        console.log("hiba");
    }

}
export function* getMonthlyCostsWatcher(){
    yield takeEvery(GET_MONTHLY_COSTS, getMonthlyCostsWorker);
}

export function* getMonthlyCostsWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getsummonthlycost", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getMonthlyCostsDone(response));
    }catch (error){
        console.log("hiba");
    }

}
export function* getChartCostsWatcher(){
    yield takeEvery(GET_CHART_COSTS, getChartCostsWorker);
}

export function* getChartCostsWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getchartcost", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getChartCostsDone(response));
    }catch (error){
        console.log("hiba");
    }

}

export function* addCostWatcher(){
    yield takeEvery(ADD_COST, addCostWorker);
}

export function* addCostWorker(action) {
    try{
        yield call(axios.post, "http://localhost:8080/addcost/", action.payload);
        if(action.payload.hasOwnProperty("id")){
            createNotification("success", "Siker", <div>A költség sikeresen módosítva!</div>);
        }else{
            createNotification("success", "Siker", <div>A költség sikeresen hozzáadva!</div>);
        }
        yield put(getCosts());
    }catch (error){
        createNotification("success", "Siker", <div>A költség hozzáadása sikertelen!</div>);
    }

}

export function* deleteCostWatcher(){
    yield takeEvery(DELETE_COST, deleteCostWorker);
}

export function* deleteCostWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/deletecost/" + action.payload, {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });

        createNotification("success", "Siker", <div>A költség sikeresen hozzáadva!</div>);
        yield put(getCosts());
    }catch (error){
        createNotification("success", "Siker", <div>A költség hozzáadása sikertelen!</div>);
    }

}

export default function* costsSaga(){
    yield fork(getCostsWatcher);
    yield fork(getFullYearCostsWatcher);
    yield fork(getMonthlyCostsWatcher);
    yield fork(getChartCostsWatcher);
    yield fork(deleteCostWatcher);
    yield fork(addCostWatcher);
}