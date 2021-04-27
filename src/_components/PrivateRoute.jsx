import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if(!localStorage.getItem('user')) {
                //if not logged (localstore is empty)
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            //if logged in
            return <component {...props} />
        }}
        />
    )
}

export { PrivateRoute };