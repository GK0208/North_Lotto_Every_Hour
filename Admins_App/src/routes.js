import React from 'react';
import { Route, Redirect } from 'react-router'
import { getToken } from './Actions/AuthenticationActions'
import Nav from './Components/Layout/Nav'
import { LogoutAdmin } from "./Actions/AuthenticationActions"
import { store } from './index'

const logOut = () => {
  localStorage.removeItem('token')
  store.dispatch(LogoutAdmin())
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render = { props =>
          getToken() ? (
            <React.Fragment>
              <Nav logOut={() => logOut()} />
              <Component {...props} />
            </React.Fragment>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

export const UnauthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render = { props => (
            <Component {...props} />
          ) 
        }
      />
    );
}