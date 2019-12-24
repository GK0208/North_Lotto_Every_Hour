import React from 'react';
import { Switch } from 'react-router'
import PrivateRoute,{ UnauthRoute } from './routes'
import LogIn from "./Containers/Forms/LogIn"
import Home from "./Containers/Models/Home"
import Ticket from './Containers/Models/Ticket';
import Winners from "./Containers/Models/Winners"
import UserTickets from "./Containers/User/UserTickets"
import ConfirmAccount from "./Containers/Models/ConfirmAccount"
import SignUp from './Containers/Forms/SignUp';
import UserProfile from './Containers/User/UserProfile';
import EditProfile from './Containers/User/EditProfile';
import AddCredit from "./Containers/User/AddCredit";
import Bonuses from "./Containers/Models/Bonuses";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  return (  
       <Switch>         
          <UnauthRoute path = '/' component = { LogIn } exact /> 
          <PrivateRoute path="/home" component = { Home } />
          <PrivateRoute path="/winners" component = { Winners } /> 
          <UnauthRoute path="/logIn" component = { LogIn } /> 
          <PrivateRoute path="/profile" component = { UserProfile } /> 
          <PrivateRoute path="/editProfile" component = { EditProfile } /> 
          <UnauthRoute path="/signUp" component = { SignUp } /> 
          <PrivateRoute path="/tickets" component = {UserTickets} />
          <PrivateRoute path="/addCredit" component = {AddCredit} />
          <PrivateRoute path="/createTicket" component = { Ticket } /> 
          <PrivateRoute path="/userBonuses" component = {Bonuses} />
          <UnauthRoute path="/confirmAccount" component = {ConfirmAccount} />
        </Switch> 
  );
}

export default App;
