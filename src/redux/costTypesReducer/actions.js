import {ADD_COSTTYPE, ADD_COSTTYPE_DONE,GET_COSTTYPES, GET_COSTTYPES_DONE, DELETE_COSTTYPE, DELETE_COSTTYPE_DONE, GET_COST_BY_TYPE, GET_COST_BY_TYPE_DONE,GET_COST_TYPE_CATEGORIES, GET_COST_TYPE_CATEGORIES_DONE} from "../actionTypes";

export function getCostTypes(payload) {
    return {
        type : GET_COSTTYPES
    }
}
export function getCostTypesDone(payload) {
    return {
        type : GET_COSTTYPES_DONE,
        payload : payload
    }
}
export function getCostTypeCategories(payload) {
    return {
        type : GET_COST_TYPE_CATEGORIES
    }
}
export function getCostTypeCategoriesDone(payload) {
    return {
        type : GET_COST_TYPE_CATEGORIES_DONE,
        payload : payload
    }
}

export function getCostByType(id) {
    return {
        type : GET_COST_BY_TYPE,
        payload: id
    }
}
export function addCostType(data) {
    return {
        type : ADD_COSTTYPE,
        payload: data
    }
}

export function deleteCostType(id) {
    return {
        type: DELETE_COSTTYPE,
        payload: id
    }
}