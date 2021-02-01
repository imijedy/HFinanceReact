import {GET_COSTS_DONE,GET_FULL_YEAR_COSTS_DONE,GET_MONTHLY_COSTS_DONE,GET_CHART_COSTS_DONE} from "../actionTypes";

const initialState = {
    costs : [],
    fullYearCosts: 0,
    monthlyCosts: 0,
    chartCosts: []
};

export default function (state = initialState, action){
    switch(action.type) {
        case GET_COSTS_DONE:
            return Object.assign({}, state, {costs: action.payload});
        case GET_FULL_YEAR_COSTS_DONE:
            return Object.assign({}, state, {fullYearCosts: action.payload});
        case GET_MONTHLY_COSTS_DONE:
            return Object.assign({}, state, {monthlyCosts: action.payload});
        case GET_CHART_COSTS_DONE:
            return Object.assign({}, state, {chartCosts: action.payload});
        default:
            return state;
    }
}