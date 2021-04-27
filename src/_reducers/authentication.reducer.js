import { userConstants } from '../_constants'

//Getting users from browser local storage
let user = JSON.parse(localStorage.getItem('user'));

//setting the initial state if user exist then initial state will be user otherwise empty object
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_FAILURE:
            return {}
        case userConstants.LOGOUT:
            return {}
        default:
            return state
    }
}