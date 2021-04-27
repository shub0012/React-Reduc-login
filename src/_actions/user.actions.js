import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
}

const login = (username, password, from) => {

    const request = user => {
        return{
            type: userConstants.LOGIN_REQUEST, user
        }
    }
    const success = user => {
        return {
            type: userConstants.LOGIN_SUCCESS, user
        }
    }

    const failure = error => {
        return {
            type: userConstants.LOGIN_FAILURE, error
        }
    }

    return dispatch => {
        dispatch(request({ username }))

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user))
                    history.push(from)
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    
}

const logout = () => {
    userService.logout()
    return { type: userConstants.LOGOUT }
}

const register = user => {
    const request = user => {
        return {
            type: userConstants.REGISTER_REQUEST, user
        }
    }

    const success = user => {
        return {
            type: userConstants.REGISTER_SUCCESS, user
        }
    }

    const failure = error => {
        return {
            type: userConstants.REGISTER_FAILURE, error
        }
    }

    return dispatch => {
        dispatch(request(user))

        userService.register(user)
            .then(
                user => {
                    dispatch(success())
                    history.push('./login')
                    dispatch(alertActions.success('Registraction Successful.'))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }
    
}

const getAll = () => {
    const request = () => {
        return {
            type: userConstants.GETALL_REQUEST
        }
    }
    const success = users => {
        return {
            type: userConstants.GETALL_SUCCESS, users
        }
    }
    const failure = error => {
        return {
            type: userConstants.GETALL_FAILURE, error
        }
    }

    return dispatch => {
        dispatch(request())

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            )
    }
}

//used _ before delete because delete is a reserved keyword in JS
const _delete = id => {
    const request = id => {
        return {
            type: userConstants.DELETE_REQUEST, id
        }
    }
    const success = id => {
        return {
            type: userConstants.DELETE_SUCCESS, id
        }
    }
    const failure = (id, error) => {
        return {
            type: userConstants.DELETE_FAILURE, id, error
        }
    }

    return dispatch => {
        dispatch(request(id))

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            )
    }
}