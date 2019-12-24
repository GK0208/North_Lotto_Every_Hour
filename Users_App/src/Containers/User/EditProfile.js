import React, { Component } from 'react'
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import {connect } from "react-redux";
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import EditProfileForm from "../../Components/Forms/EditProfileForm"
import { updateUser  } from "../../Actions/UserActions"
import { restore } from "../../Actions/AuthenticationActions"
import "../../Components/ComponentsStyle.css"
import Spinner from '../../Components/Shared/Spinner'

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
          id : null,
          userName:"",
          city:"",
          state:"",
          mobile:"",
          dateOfBirth: "",
          gender:"",
          cardNumber : "",
          cardHolder : "",
          isSubscribed : false,
          isAccountConfirmed : true
        }
      }  

    componentDidMount = () => {
        this.props.getProfileFetch()
    }

    componentDidUpdate(){
        if (this.state.userName !== this.props.activeUser.userName){
            const user = this.props.activeUser;
            this.setState({
                id : user.id,
                userName : user.userName ,
                city : user.city || "",
                state : user.state || "",
                mobile : user.mobile || "" ,
                dateOfBirth : user.dateOfBirth  ,
                gender : user.gender || "",
                cardHolder :user.cardHolder || "",
                cardNumber : user.cardNumber || "",
                isSubscribed: user.isSubscribed        
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.success && this.props.success !== nextProps.success) {
            alert (nextProps.success)
            this.props.restore();
            this.props.history.push("/profile")
        }
        if (nextProps.error && this.props.error !== nextProps.error) 
            alert(nextProps.error)
    }


    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let updatedUser={
            id : this.state.id,
            userName:this.state.userName,
            city:this.state.city,
            state:this.state.state,
            mobile:this.state.mobile,
            gender:this.state.gender,
            dateOfBirth:this.state.dateOfBirth,
            cardHolder:this.state.cardHolder,
            cardNumber:this.state.cardNumber,
            isSubscribed:this.state.isSubscribed,
            isAccountConfirmed:this.state.isAccountConfirmed,
            refreshToken:this.state.refreshToken
        }
        this.props.updateUser(updatedUser); 
    }

    render() {    
        let { isFetchingUserData, isLoggedIn } =this.props;
        return (
            !isFetchingUserData && isLoggedIn ? 
                <React.Fragment>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="profile" style={{color:"black"}}>Profile</a></li>
                        <li className="breadcrumb-item"><a href="editProfile" style={{color:"#1ca6e9"}}>Edit</a></li>
                    </ul>
                    <EditProfileForm  user = {this.state} onChange={(e)=>this.onChange(e)} onSubmit={(e)=>this.onSubmit(e)}/>
                </React.Fragment>
            : 
           <Spinner />       
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        logoutUser : () => dispatch(LogoutUser()),
        updateUser : (user) => dispatch(updateUser(user)),
        restore : () => dispatch(restore())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        error : state.lottoReducer.error,
        success : state.lottoReducer.success,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
