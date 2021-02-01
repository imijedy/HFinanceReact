import {call, put, fork, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {DELETE_INCOME,ADD_INCOME,GET_INCOMES,GET_FULL_YEAR_INCOMES,GET_MONTHLY_INCOMES,GET_CHART_INCOMES} from "../actionTypes";
import {getIncomes,getIncomesDone, getFullYearIncomesDone, getMonthlyIncomesDone,getChartIncomesDone} from "./actions";

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

export function* getIncomesWatcher(){
    yield takeEvery(GET_INCOMES, getIncomesWorker);
}

export function* getIncomesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getincome", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getIncomesDone(response));
    }catch (error){
        console.log("hiba");
    }
}

export function* getFullYearIncomesWatcher(){
    yield takeEvery(GET_FULL_YEAR_INCOMES, getFullYearIncomesWorker);
}

export function* getFullYearIncomesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getsumfullyearincome", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getFullYearIncomesDone(response));
    }catch (error){
        console.log("hiba");
    }
}
export function* getMonthlyIncomesWatcher(){
    yield takeEvery(GET_MONTHLY_INCOMES, getMonthlyIncomesWorker);
}

export function* getMonthlyIncomesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getsummonthlyincome", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getMonthlyIncomesDone(response));
    }catch (error){
        console.log("hiba");
    }
}
export function* getChartIncomesWatcher(){
    yield takeEvery(GET_CHART_INCOMES, getChartIncomesWorker);
}

export function* getChartIncomesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getchartincome", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getChartIncomesDone(response));
    }catch (error){
        console.log("hiba");
    }
}

export function* addIncomeWatcher(){
    yield takeEvery(ADD_INCOME, addIncomeWorker);
}

export function* addIncomeWorker(action) {
    try{
        yield call(axios.post, "http://localhost:8080/addincome/", action.payload);
        if(action.payload.hasOwnProperty("id")){
            createNotification("success", "Siker", <div>A bevétel sikeresen módosítva!</div>);
        }else{
            createNotification("success", "Siker", <div>A bevétel sikeresen hozzáadva!</div>);
        }
        yield put(getIncomes());
    }catch (error){
        createNotification("success", "Siker", <div>A bevétel hozzáadása sikertelen!</div>);
    }

}

export function* deleteIncomeWatcher(){
    yield takeEvery(DELETE_INCOME, deleteIncomeWorker);
}

export function* deleteIncomeWorker(action) {
    try{
        yield call(axios.get, "http://localhost:8080/deleteincome/" + action.payload, {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });

        createNotification("success", "Siker", <div>A bevétel sikeresen hozzáadva!</div>);
        yield put(getIncomes());
    }catch (error){
        createNotification("success", "Siker", <div>A bevétel hozzáadása sikertelen!</div>);
    }

}

export default function* incomesSaga(){
    yield fork(getIncomesWatcher);
    yield fork(getFullYearIncomesWatcher);
    yield fork(getMonthlyIncomesWatcher);
    yield fork(getChartIncomesWatcher);
    yield fork(addIncomeWatcher);
    yield fork(deleteIncomeWatcher);
}