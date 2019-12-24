import React, { Component } from 'react'
import { getProfileFetch, LogoutAdmin } from "../../Actions/AuthenticationActions"
import {connect } from "react-redux";
import Spinner from '../../Components/Shared/Spinner'
import EditProfileForm from "../../Components/Forms/EditProfileForm"
import { updateAdmin  } from "../../Actions/AdminActions"
import "../../Components/ComponentsStyle.css"
import ModalInfo from '../../Components/Modals/ModalInfo'

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
          userName:"",
          city:"",
          state:"",
          mobile:"",
          dateOfBirth: null,
          gender:"",
          isInfoModalOpen: false,
          modalMessage: ''
        }
      }  

    componentDidMount = () => {
        this.props.getProfileFetch()
    }

    componentWillReceiveProps(nextProps){
        if (this.props.activeAdmin !== nextProps.activeAdmin){
            const admin = nextProps.activeAdmin;
            this.setState({
                userName : admin.userName ,
                city : admin.city || "",
                state : admin.state || "",
                mobile : admin.mobile || "" ,
                dateOfBirth : admin.dateOfBirth ,
                gender : admin.gender || ""
            })
        }
        if (this.props.success !== nextProps.success) {
            this.setState({
                modalMessage: nextProps.success,
                isInfoModalOpen: true
            })
        }
        if (this.props.error !== nextProps.error) 
            this.setState({
                modalMessage: nextProps.error,
                isInfoModalOpen: true
            })
    }

    closeInfoModal = () => {
        this.setState({
            isInfoModalOpen: false
        })
        this.props.history.push("/profile")
    }


    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        
        let updatedAdmin ={
            userName:this.state.userName,
            city:this.state.city,
            state:this.state.state,
            mobile:this.state.mobile,
            gender:this.state.gender,
            dateOfBirth:this.state.dateOfBirth,
        }
        let result = Object.values(updatedAdmin).some(x => x.length === 0)
        !result ? this.props.updateAdmin(updatedAdmin) : document.getElementById('wrongAdminInput').style.display = 'flex' 
    }

    render() {    
        return (
            !this.props.isFetchingAdminData && this.props.isLoggedIn ? 
                <React.Fragment>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="profile" style={{color:"black"}}>Profile</a></li>
                        <li className="breadcrumb-item"><a href="editProfile" style={{color:"#1ca6e9"}}>Edit</a></li>
                    </ul>
                    <EditProfileForm  admin = {this.state} onChange={(e)=>this.onChange(e)} onSubmit={(e)=>this.onSubmit(e)}/>
                    <ModalInfo
                        isOpen = { this.state.isInfoModalOpen } 
                        hideModal = { () => this.closeInfoModal() } 
                        title = { this.state.modalMessage}
                    /> 
                </React.Fragment>
            : 
            <Spinner />         
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        logoutAdmin : () => dispatch(LogoutAdmin()),
        updateAdmin : (admin) => dispatch(updateAdmin(admin))
    }
  }

  const mapStateToProps = state => {  
    return {
        activeAdmin : state.adminReducer.activeAdmin,
        error : state.lottoReducer.error,
        success : state.lottoReducer.success,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData,
        isLoggedIn: state.adminReducer.isLoggedIn
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);