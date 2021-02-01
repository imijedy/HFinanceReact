import {ADD_INCOME,DELETE_INCOME,GET_INCOMES, GET_INCOMES_DONE,GET_MONTHLY_INCOMES,GET_MONTHLY_INCOMES_DONE, GET_FULL_YEAR_INCOMES, GET_FULL_YEAR_INCOMES_DONE,GET_CHART_INCOMES,GET_CHART_INCOMES_DONE} from "../actionTypes";

export function getIncomes(payload) {
    return {
        type : GET_INCOMES
    }
}
export function getIncomesDone(payload) {
    return {
        type : GET_INCOMES_DONE,
        payload : payload
    }
}
export function getFullYearIncomes(payload) {
    return {
        type : GET_FULL_YEAR_INCOMES
    }
}
export function getFullYearIncomesDone(payload) {
    return {
        type : GET_FULL_YEAR_INCOMES_DONE,
        payload : payload
    }
}
export function getMonthlyIncomes(payload) {
    return {
        type : GET_MONTHLY_INCOMES
    }
}
export function getMonthlyIncomesDone(payload) {
    return {
        type : GET_MONTHLY_INCOMES_DONE,
        payload : payload
    }
}
export function getChartIncomes(payload) {
    return {
        type : GET_CHART_INCOMES
    }
}
export function getChartIncomesDone(payload) {
    return {
        type : GET_CHART_INCOMES_DONE,
        payload : payload
    }
}
export function addIncome(data) {
    return {
        type : ADD_INCOME,
        payload: data
    }
}
export function deleteIncome(id) {
    return {
        type: DELETE_INCOME,
        payload: id
    }
}