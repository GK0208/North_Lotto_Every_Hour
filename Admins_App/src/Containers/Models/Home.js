import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { LogoutAdmin }  from "../../Actions/AuthenticationActions"
import Spinner from '../../Components/Shared/Spinner'
import ReactPlayer from "react-player";
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import "../../Components/ComponentsStyle.css"


 class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "We will never forget our first advirtisment !"
        }
    }
    componentDidMount = () => {
        this.props.getProfileFetch();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })      
    }

    render() {
        return (     
            !this.props.isFetchingAdminData && this.props.isLoggedIn ?
                <React.Fragment>
                    <HeadingWrapper title = {this.state.title} />                              
                    <div className="video">
                    <ReactPlayer url={"https://www.youtube.com/watch?v=iQx6MfUkQrU"} playing />
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
        isLoggedIn: state.adminReducer.isLoggedIn,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);