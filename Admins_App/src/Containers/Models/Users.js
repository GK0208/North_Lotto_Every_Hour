import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch,LogoutAdmin, restore } from "../../Actions/AuthenticationActions"
import { GetUsers, MakeUserAdmin }  from "../../Actions/AdminActions"
import Spinner from '../../Components/Shared/Spinner'
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import Pagination from "react-js-pagination";
import UsersTable from "../../Components/Tables/UsersTable"
import ConfirmationModal from "../../Components/Modals/ConfirmationModal"
import "../../Components/ComponentsStyle.css"
import { connection } from "../../SignalR/Hubs"
import ModalInfo from '../../Components/Modals/ModalInfo'


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
          isOpen : false,
          user: null,
          isInfoModalOpen: false,
          modalMessage: ''
        };
    }

    componentDidMount = () => {
        this.props.getProfileFetch();
        this.props.getUsers(1)

        connection.on("notifyAdmins",()=>{
            this.props.getProfileFetch();
            this.props.getUsers(this.state.activePage)
        })          
        connection.start()
    }

    componentWillReceiveProps(nextProps){
        if (this.props.success !== nextProps.success) {
            this.props.restore();
            this.setState({
                modalMessage: nextProps.success,
                isInfoModalOpen: true
            })
        }

        if (this.props.error !== nextProps.error) {
            this.props.restore();
            this.setState({
                modalMessage: nextProps.error,
                isInfoModalOpen: true
            })
        }
    }

    closeInfoModal = () => {
        this.setState({
            isInfoModalOpen: false
        })
    }

    openModal = () => {
        this.setState({
          isOpen: true
        });
      };
       
    hideModal = () => {
        this.setState({
            isOpen: false
        });
    };

    handlePageChange(pageNumber) { 
        this.setState({activePage : pageNumber});
        this.props.getUsers(pageNumber)
   }

   giveAdminPermision =(user) =>{
       this.setState({
           user
       })
       this.openModal();    
   }

    confirm =() =>{
        const user= this.state.user
        this.props.makeUserAdmin(user)
        this.hideModal()
    }

    render() {
        const users = this.props.users;
        return (     
                !this.props.isFetchingAdminData ? 
                <React.Fragment>
                    <HeadingWrapper title = {"North Lotto Every Hour Users"} />                              
                    <UsersTable users = {users } giveAdminPermision = {(e) =>this.giveAdminPermision(e)} />
                    <Pagination
                        className="pagination"
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.props.usersLength > 0 ? this.props.usersLength : 0}
                        onChange={(e)=>this.handlePageChange(e)}
                    />
                    <ConfirmationModal
                        title={ this.state.user && `Are you shure that you want to make ${this.state.user.userName} an Admin ?` }
                        isOpen={this.state.isOpen} 
                        hideModal={()=>this.hideModal()} 
                        openModal={() => this.openModal()}
                        confirm={()=>this.confirm()}
                    />
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
        getUsers : (count) => dispatch(GetUsers(count)),
        makeUserAdmin : (user) => dispatch(MakeUserAdmin(user)),
        restore : () => dispatch(restore())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeAdmin : state.adminReducer.activeAdmin,
        users : state.lottoReducer.users,
        usersLength : state.lottoReducer.usersLength,
        success : state.lottoReducer.success,
        error : state.lottoReducer.error,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Users);