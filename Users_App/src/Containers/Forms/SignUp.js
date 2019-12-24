import React, { Component } from 'react'
import { SignUpUser } from "../../Actions/AuthenticationActions"
import { restore } from "../../Actions/AuthenticationActions"
import { connect } from 'react-redux';
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import SignUpForm from "../../Components/Forms/SignUpForm"
import "../../Components/ComponentsStyle.css"

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={         
            UserName : "",
            Password : "",
            ConfirmPassword : "",
            Age : 0,
            City : null,
            DateOfBirth : null,
            Gender : "",
            Mobile : 0,
            State : null,
            Balance : 0,
            CardHolder : null,
            CardNumber : 0  
        }
    }

    componentDidUpdate(){
        if (this.props.signUpSucces && this.props.success.length > 0) {
            alert(this.props.success)
            this.props.restore();
            this.props.history.push("/")
        }

        if (this.props.error.length > 0){
            alert(this.props.error)
            this.props.restore()
        }
    }

    onChange = (e) =>{
        this.setState({     
            [e.target.name] : e.target.value      
        })
    }

    OnSubmit = (e) => {
        e.preventDefault();

        if (this.state.Password !== this.state.ConfirmPassword){
            document.getElementById("passwordMatch").innerText="Passwords dont match !"
            return ;        
        }
        const user = this.state;
        this.props.SignUpUser(user);
    }

    render() {      
        return (
            <React.Fragment>
                <HeadingWrapper title = {"Sign Up Form"} />
                <SignUpForm OnSubmit = {(e) => this.OnSubmit(e)} onChange = {(e) => this.onChange(e)}/>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        SignUpUser : (username,password,confirmPassword) => dispatch(SignUpUser(username,password,confirmPassword)),
        restore : () => dispatch(restore())
    } 
}

const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        signUpSucces : state.lottoReducer.signUpSucces,
        error : state.lottoReducer.error,
        success : state.lottoReducer.success
    }
  }


export default connect(mapStateToProps,mapDispatchToProps) (SignUp)