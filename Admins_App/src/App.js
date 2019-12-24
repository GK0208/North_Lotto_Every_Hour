import React from 'react';
import { Switch } from 'react-router'
import { PrivateRoute, UnauthRoute } from './routes'
import LogIn from "./Containers/Forms/Login"
import Home from "./Containers/Models/Home"
import Winners from "./Containers/Models/Winners"
import adminProfile from './Containers/Admin/AdminProfile';
import EditProfile from './Containers/Admin/EditProfile';
import StartDraw from "./Containers/Admin/StartDraw";
import Sessions from "./Containers/Models/Sessions"
import Users from "./Containers/Models/Users"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



function App() {
  return (  
        <Switch>         
          <UnauthRoute path = '/' component = { LogIn } exact /> 
          <PrivateRoute path="/home" component = { Home } />
          <PrivateRoute path="/winners" component = { Winners } /> 
          <PrivateRoute path="/logIn" component = { LogIn } /> 
          <PrivateRoute path="/profile" component = { adminProfile } /> 
          <PrivateRoute path="/editProfile" component = { EditProfile } /> 
          <PrivateRoute path="/startDraw" component = { StartDraw } /> 
          <PrivateRoute path="/sessions" component = {Sessions} />
          <PrivateRoute path="/seeAllUsers" component = {Users} />
        </Switch>
  );
}

export default App;
