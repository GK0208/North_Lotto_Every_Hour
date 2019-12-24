import React, { Component } from 'react'
import { AddCreditForm } from "../../Components/Forms/AddCreditForm"
import { getProfileFetch, restore } from "../../Actions/AuthenticationActions"
import {connect } from "react-redux";
import { addCredit } from "../../Actions/UserActions"
import HeadingWrapper  from "../../Components/Shared/HeadingWrapper"
import "../../Components/ComponentsStyle.css"

class AddCredit extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password : "",
            cardNumber : 0,
            cardHolder : "",
            amount : 0
        }
    }

    componentDidUpdate(){
        if (this.props.success.length > 0) {            
            alert(this.props.success)
            this.props.restore();
            this.props.history.push("/home")
        }

        if (this.props.error.length > 0){
            alert(this.props.error)
            this.props.restore()
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const credit = {
            Email : this.state.email,
            Password : this.state.password,
            CardHolder : this.state.cardHolder,
            CardNumber : this.state.cardNumber,
            Amount : this.state.amount
        }
        this.props.addCredit(credit)
    }
    render() {
        return (
            <React.Fragment>
                <HeadingWrapper title = {"Insert Credit"} />
                <p onClick={()=> this.props.history.goBack()} className="backButton">Go Back</p> 
                <AddCreditForm onChange = {(e) => this.onChange(e)} onSubmit = {(e) => this.onSubmit(e)} />               
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        addCredit : (credit) => dispatch(addCredit(credit)),
        restore : () => dispatch(restore())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        success : state.lottoReducer.success,
        error : state.lottoReducer.error
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddCredit);
