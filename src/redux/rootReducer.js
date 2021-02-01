import {combineReducers} from "redux";
import costTypesReducer from "./costTypesReducer/reducer";
import costsReducer from "./costsReducer/reducer";
import incomesReducer from "./incomesReducer/reducer";

const rootReducer = combineReducers({
    costTypes: costTypesReducer,
    costs: costsReducer,
    incomes: incomesReducer
});

export default rootReducer;