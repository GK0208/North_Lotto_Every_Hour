import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch,LogoutAdmin } from "../../Actions/AuthenticationActions"
import Spinner from '../../Components/Shared/Spinner'
import { connection } from "../../SignalR/Hubs"
import "../../Components/ComponentsStyle.css"


class AdminProfile extends Component {
  
    componentDidMount = () => {
        this.props.getProfileFetch()
        connection.on("notifyAdmins",()=>{
            this.props.getProfileFetch();
        })
        connection.start()   
    }

    render() {        
        const activeAdmin = this.props.activeAdmin;
        return (
            !this.props.isFetchingAdminData && this.props.isLoggedIn ?
                <React.Fragment>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="profile" style={{color:" #1ca6e9"}}>Profile</a></li>
                        <li className="breadcrumb-item"><a href="editProfile" style={{color:" black"}}>Edit</a></li>
                    </ul>
                    <div className="card text-primary border-primary profileCard" >
                    <div className="card-header">
                        <h2>
                            {activeAdmin.userName.substring(0,activeAdmin.userName.indexOf("@")).toUpperCase()}
                        </h2>
                    </div>
                    <div className="card-body">
                   
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email : {activeAdmin.userName}</li>
                    <li className="list-group-item">Gender : {activeAdmin.gender}</li>
                    <li className="list-group-item">Date of birth : {activeAdmin.dateOfBirth.substring(0,activeAdmin.dateOfBirth.indexOf("T"))}</li>
                    <li className="list-group-item">City : {activeAdmin.city}</li>
                    <li className="list-group-item">State : {activeAdmin.state}</li>
                    <li className="list-group-item">Mobile : {activeAdmin.mobile}</li>
                    <li className="list-group-item">Number of sessions : {activeAdmin.sessions.length}</li>
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
        logoutAdmin : () => dispatch(LogoutAdmin())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeAdmin : state.adminReducer.activeAdmin,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData,
        isLoggedIn: state.adminReducer.isLoggedIn
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);