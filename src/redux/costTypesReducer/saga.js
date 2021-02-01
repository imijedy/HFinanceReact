import {call, put, fork, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {ADD_COSTTYPE,GET_COSTTYPES,DELETE_COSTTYPE,GET_COST_BY_TYPE,GET_COST_TYPE_CATEGORIES} from "../actionTypes";
import {getCostTypesDone,getCostTypes,deleteCostType,getCostTypeCategoriesDone} from "./actions";

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

export function* getCostTypesWatcher(){
    yield takeEvery(GET_COSTTYPES, getCostTypesWorker);
}

export function* getCostTypesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getcosttypes", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getCostTypesDone(response));
    }catch (error){
        console.log("hiba");
    }

}
export function* getCostTypeCategoriesWatcher(){
    yield takeEvery(GET_COST_TYPE_CATEGORIES, getCostTypeCategoriesWorker);
}

export function* getCostTypeCategoriesWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getcosttypcecategories", {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        yield put(getCostTypeCategoriesDone(response));
    }catch (error){
        console.log("hiba");
    }

}
export function* getCostByTypeWatcher(){
    yield takeEvery(GET_COST_BY_TYPE, getCostByTypeWorker);
}

export function* getCostByTypeWorker(action) {
    try{
        const response = yield call(axios.get, "http://localhost:8080/getcostsbytype/" + action.payload, {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        if(response.data.length === 0){
            yield put(deleteCostType(action.payload));
        }else{
            createNotification("danger", "Hiba", <div>Nem lehet olyan kategóriát törölni, amihez már tartozik költség!</div>);
        }
    }catch (error){
        console.log("hiba");
    }

}

export function* addCostTypeWatcher(){
    yield takeEvery(ADD_COSTTYPE, addCostTypeWorker);
}

export function* addCostTypeWorker(action) {
    try{
        yield call(axios.post, "http://localhost:8080/addcosttype/", action.payload);
        if(action.payload.hasOwnProperty("id")){
            createNotification("success", "Siker", <div>A költség kategória sikeresen módosítva!</div>);
        }else{
            createNotification("success", "Siker", <div>A költség kategória sikeresen hozzáadva!</div>);
        }
        yield put(getCostTypes());
    }catch (error){
        createNotification("success", "Siker", <div>A költség kategória hozzáadása sikertelen!</div>);
    }

}

export function* deleteCostTypeWatcher(){
    yield takeEvery(DELETE_COSTTYPE, deleteCostTypeWorker);
}

export function* deleteCostTypeWorker(action) {
    try{
        yield call(axios.get, "http://localhost:8080/deletecosttype/" + action.payload, {
            headers: {
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            responseType: 'json',
        });
        createNotification("success", "Siker", <div>A költség kategória sikeresen törölve!</div>);
        yield put(getCostTypes());
    }catch (error){
        createNotification("danger", "Hiba", <div>A költség kategória törlése sikertelen!</div>);
    }

}
export default function* costTypesSaga(){
    yield fork(getCostTypesWatcher);
    yield fork(getCostTypeCategoriesWatcher);
    yield fork(deleteCostTypeWatcher);
    yield fork(getCostByTypeWatcher);
    yield fork(addCostTypeWatcher);
}