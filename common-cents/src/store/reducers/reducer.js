import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userName: null,
    token: null,
    userId: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGNIN:
            return {
                ...state,
                userName: action.userName,
                token: action.token,
                userId: action.userId
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                userName: null,
                token: null,
                userId: null
            }
        case actionTypes.AUTOSIGNIN:
            return {
                ...state,
                token: action.token,
                userName: action.userName,
                userId: action.userId
            }
        default: 
            return state;
    }
}

export default reducer;