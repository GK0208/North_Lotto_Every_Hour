import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import Spinner from '../../Components/Shared/Spinner'
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import "../../Components/ComponentsStyle.css"


class UserProfile extends Component {

    componentDidMount = () => {
        this.props.getProfileFetch()
    }

    render() {        
        var activeUser= this.props.activeUser;
        let { isFetchingUserData, isLoggedIn } = this.props;
        return (
            !isFetchingUserData && isLoggedIn ?
                <React.Fragment>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="profile" style={{color:" #1ca6e9"}}>Profile</a></li>
                        <li className="breadcrumb-item"><a href="editProfile" style={{color:" black"}}>Edit</a></li>
                    </ul>
                    <div className="card text-primary border-primary profileCard" >
                    <div className="card-header">
                        <h2>
                            {activeUser.userName.substring(0,activeUser.userName.indexOf("@")).toUpperCase()}
                            </h2>
                    </div>
                    <div className="card-body">
                   
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email : {activeUser.userName}</li>
                    <li className="list-group-item">Gender : {activeUser.gender}</li>
                    <li className="list-group-item">Date of birth : {activeUser.dateOfBirth.substring(0,activeUser.dateOfBirth.indexOf("T"))}</li>
                    <li className="list-group-item">City : {activeUser.city}</li>
                    <li className="list-group-item">State : {activeUser.state}</li>
                    <li className="list-group-item">Mobile : {activeUser.mobile}</li>
                    <li className="list-group-item">Total Tickets : {activeUser.ticketsLength}</li>
                    <li className="list-group-item">Card Number : {activeUser.cardNumber}</li>
                    <li className="list-group-item">Card Holder : {activeUser.cardHolder}</li>
                    <li className="list-group-item">Balance : {activeUser.balance}</li>
                    </ul>
                    </div>

                    </div>
                </React.Fragment>
            : 
            <Spinner /> 
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        logoutUser : () => dispatch(LogoutUser())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);