import { userConstants } from '../_constants'

export const users = (state = {}, action) => {
    switch (action.type){
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            }
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            }
        case userConstants.DELETE_REQUEST:
            // adding 'deletig: true' property to the user being deleted
            return {
                ...state,
                items: state.items.map(user => user.id === action.id ? { ...user, deleting: true } : user )
            }
        case userConstants.DELETE_FAILURE:
            // remove 'deletig: true' property and add 'deleteError:[ERROR]' property to user
            return {
                ...state,
                items: state.items.map( user => {
                    if( user.id === action.id ) {
                        //make copy of the user without 'deleting true' property
                        const { deleting, ...userCopy } = users
                        //return copy of user with 'deleteError: [error]' property
                        return { ...userCopy, deleteError: action.error }
                    }
                    return user
                })
            }
        case userConstants.DELETE_SUCCESS:
            return{
                items: state.items.filter(user => user.id !== action.id)
            }
        default:
            return state
    }
}