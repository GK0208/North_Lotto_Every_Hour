import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { createTicket } from "../../Actions/UserActions"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import { LottoNumbers } from "../../LottoConsts"
import "../../Components/ComponentsStyle.css"
import CreateTicketForm from '../../Components/UserTickets/CreateTicketForm';
import { restore } from "../../Actions/AuthenticationActions"
import Spinner from '../../Components/Shared/Spinner'


class Ticket extends Component {
    constructor() {
        super();
        this.state = {
          checkedNumbers : [],
          active : true,
          prize : null, 
          win : false,
          userId : null
        }
      }  

    componentDidMount = async () => {
       await this.props.getProfileFetch();
       const userId = this.props.activeUser.id
       this.setState({
           userId : userId
       })
    }

    componentDidUpdate(){
        if (this.props.success.length > 0) {
            alert(this.props.success)
            this.props.restore();
            this.props.history.push("/tickets")
        }

        if (this.props.error.length > 0){
            alert(this.props.error);
            this.props.restore()
            this.props.history.push("/addCredit")
        }
    }

    handleSubmit = () =>{
        let ticket = this.state.checkedNumbers
        this.props.createTicket(ticket);
    }

    checkNumber = (e) =>{ 
        let number = e.target.value;
        let checked = false;
        this.state.checkedNumbers.forEach(element => {
            if (element === parseFloat(e.target.value)) return checked = true         
        });

        if (this.state.checkedNumbers.length < 7) { 
            
            if (!checked){
                this.setState({
                    checkedNumbers:[...this.state.checkedNumbers,parseFloat(number)]
                })   
            }
        }
       
        if (this.state.checkedNumbers.length === 6) {  
           let checkboxes=document.getElementsByClassName("checkbox")
           for (let el of checkboxes){
               el.disabled = true;
           }
        }

        if (checked) {
            this.setState({
                checkedNumbers : this.state.checkedNumbers.filter(x => x !== parseFloat(number))
            })
        } 
    } 

    reset = () =>{
        window.location.reload()
    }
   
    render() {
        let numbers = LottoNumbers;
        let { isLoggedIn, isFetchingUserData } = this.props;
        return (
                    !isFetchingUserData && isLoggedIn ? 
                        <React.Fragment>
                            <HeadingWrapper title={"Create New Ticket"} />
                            <h3 className = "createTicketHeading">Create your ticket by selecting 7 numbers and after that submit the ticket, GOOD LUCK ! </h3>
                            <CreateTicketForm numbers = {numbers} checkNumber = {this.checkNumber}/>
                            <button className = "btn reset" onClick = {this.reset} style={{backgroundColor:"#1ca6e9"}} >
                                Reset
                            </button>
                            <button className = "btn submitTicket" onClick = {this.handleSubmit} style={{backgroundColor:"#1ca6e9"}}>
                                Submit Ticket
                            </button>
                            <div className = "selectedNumbersContainer">
                                <h3> 
                                    <i>
                                        Selected numbers :
                                    </i>
                                </h3>
                                <div className = "selectedNumbers"> 
                                    <b>
                                        {this.state.checkedNumbers.join()}
                                    </b>
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
        createTicket : (ticket) => dispatch(createTicket(ticket)),
        logoutUser : () => dispatch(LogoutUser()),
        restore : () => dispatch(restore())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        lottoNumbers : state.lottoReducer.lottoNumbers,
        success : state.lottoReducer.success,
        error : state.lottoReducer.error,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
