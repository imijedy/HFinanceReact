import costTypesSaga from "./costTypesReducer/saga";
import costsSaga from "./costsReducer/saga";
import incomesSaga from "./incomesReducer/saga";
import {all} from "redux-saga/effects"

export default function* rootSaga() {
    yield all([
        costTypesSaga(),
        costsSaga(),
        incomesSaga(),
    ]);
}