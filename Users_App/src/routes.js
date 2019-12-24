import React from 'react';
import { Route, Redirect } from 'react-router'
import { getToken } from './Actions/AuthenticationActions'
import Nav from './Components/Layout/Nav'
import { connect } from "react-redux";
import { LogoutUser } from "./Actions/AuthenticationActions"
import { store } from './index'

const logOut = () => {
  localStorage.removeItem('token')
  store.dispatch(LogoutUser())
}


const PrivateRoute = ({ component: Component, activeUser, ...rest }) => {
    return (
      <Route
        {...rest}
        render = { props =>
          getToken() ? (
            <React.Fragment>
              <Nav activeUser= {activeUser} logOut={() => logOut()} />
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

function getActiveUser(state) {
  return { 
    activeUser: state.lottoReducer.activeUser
  }
}

export default connect(getActiveUser)(PrivateRoute)

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