import {ADD_COST,GET_COSTS, GET_COSTS_DONE,GET_FULL_YEAR_COSTS, GET_FULL_YEAR_COSTS_DONE, GET_MONTHLY_COSTS, GET_MONTHLY_COSTS_DONE, GET_CHART_COSTS,GET_CHART_COSTS_DONE,DELETE_COST} from "../actionTypes";

export function getCosts(payload) {
    return {
        type : GET_COSTS
    }
}
export function getCostsDone(payload) {
    return {
        type : GET_COSTS_DONE,
        payload : payload
    }
}

export function getFullYearCosts(payload) {
    return {
        type : GET_FULL_YEAR_COSTS
    }
}
export function getFullYearCostsDone(payload) {
    return {
        type : GET_FULL_YEAR_COSTS_DONE,
        payload : payload
    }
}
export function getMonthlyCosts(payload) {
    return {
        type : GET_MONTHLY_COSTS
    }
}
export function getMonthlyCostsDone(payload) {
    return {
        type : GET_MONTHLY_COSTS_DONE,
        payload : payload
    }
}
export function getChartCosts(payload) {
    return {
        type : GET_CHART_COSTS
    }
}
export function getChartCostsDone(payload) {
    return {
        type : GET_CHART_COSTS_DONE,
        payload : payload
    }
}
export function addCost(data) {
    return {
        type : ADD_COST,
        payload: data
    }
}
export function deleteCost(id) {
    return {
        type: DELETE_COST,
        payload: id
    }
}