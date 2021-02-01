import {GET_COSTTYPES_DONE,GET_COST_TYPE_CATEGORIES_DONE} from "../actionTypes";

const initialState = {
    costTypes : [],
    costTypeCategories: []
};

export default function (state = initialState, action){
    switch(action.type) {
        case GET_COSTTYPES_DONE:
            return Object.assign({}, state, {costTypes: action.payload});
        case GET_COST_TYPE_CATEGORIES_DONE:
            return Object.assign({}, state, {costTypeCategories: action.payload});
        default:
            return state;
    }
}