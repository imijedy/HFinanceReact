import {GET_INCOMES_DONE,GET_FULL_YEAR_INCOMES_DONE,GET_MONTHLY_INCOMES_DONE,GET_CHART_INCOMES_DONE} from "../actionTypes";

const initialState = {
    incomes : [],
    fullYearIncomes: 0,
    monthlyIncomes: 0,
    chartIncomes: []
};

export default function (state = initialState, action){
    switch(action.type) {
        case GET_INCOMES_DONE:
            return Object.assign({}, state, {incomes: action.payload});
        case GET_FULL_YEAR_INCOMES_DONE:
            return Object.assign({}, state, {fullYearIncomes: action.payload});
        case GET_MONTHLY_INCOMES_DONE:
            return Object.assign({}, state, {monthlyIncomes: action.payload});
        case GET_CHART_INCOMES_DONE:
            return Object.assign({}, state, {chartIncomes: action.payload});
        default:
            return state;
    }
}