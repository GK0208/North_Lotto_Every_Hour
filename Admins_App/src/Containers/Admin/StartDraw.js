import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch, restore, LogoutAdmin } from "../../Actions/AuthenticationActions"
import { startDraw } from "../../Actions/AdminActions";
import Spinner from '../../Components/Shared/Spinner'
import "../../Components/ComponentsStyle.css"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import AdminConfirmationModal from "../../Components/Modals/AdminConfirmationModal"
import ModalInfo from '../../Components/Modals/ModalInfo'

class StartDraw extends Component {
     constructor(props){
         super(props);
         this.state={
             isOpen : false,
             username: "",
             isInfoModalOpen: false,
             modalMessage: ''
         }
     }

    componentDidMount = () => {
        this.props.getProfileFetch()
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.success && nextProps.success !== this.props.success) {
            this.props.restore();
            this.setState({
                modalMessage: nextProps.success,
                isInfoModalOpen: true
            })
        }

        if (nextProps.error && nextProps.error !== this.props.error){
            this.props.restore()
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
        this.props.history.push("/sessions")
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

    startDraw = () =>{
       this.openModal()
       
    }

    onChange = (e) =>{
        document.getElementById("wrongEmail").style.display="none"
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    confirmAdmin =() =>{
        const username = this.state.username;
        if (this.props.activeAdmin && username === this.props.activeAdmin.userName){
            this.hideModal();
            this.props.startDraw()
        } 
        else  document.getElementById("wrongEmail").style.display="block"
    }

    render() {        
        let { isFetchingAdminData, isLoggedIn } = this.props;
        return (
            !isFetchingAdminData && isLoggedIn ?
                <React.Fragment>
                    <HeadingWrapper title={"Easiest it can be, just press the button and let the draw begin !"}/>
                    <button 
                        type="button" 
                        className="btn-primary btn-lg btn-block" 
                        style ={{marginTop:"10%"}} 
                        onClick = {()=>this.openModal()}
                    >
                        START DRAW
                    </button>
                    <AdminConfirmationModal
                        isOpen = { this.state.isOpen } 
                        hideModal = { () => this.hideModal() } 
                        openModal = { () => this.openModal() }
                        confirmAdmin = { () => this.confirmAdmin() }
                        onChange = { (e) => this.onChange(e) }
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
        startDraw : () => dispatch(startDraw()),
        restore : () => dispatch(restore())
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(StartDraw);