import React,{ Component } from 'react';
import { Login } from "../../Actions/AuthenticationActions";
import { connect } from 'react-redux';
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import LogInForm from "../../Components/Forms/LoginForm"
import "../../Components/ComponentsStyle.css"


class LogIn extends Component {
    constructor(props){
        super(props);
        this.state={
            username : "",
            password : ""
        }
    }

    onChange = (e) =>{
        document.getElementById("invalidLogin").style.display="none"
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    checkUser = () => {
        localStorage.token ? 
        this.props.history.push("/home")
        :
        document.getElementById("invalidLogin").style.display="block"
    }

    OnSubmit = async (e) =>{
         e.preventDefault();      
         await this.props.Login(this.state);    
         setTimeout(() =>this.checkUser(),100);
    }

    render() {

        return (
            <React.Fragment>
                <HeadingWrapper title = {"North Lotto Every Hour "} />
                <LogInForm OnSubmit = {(e) => this.OnSubmit(e)} onChange = {(e) => this.onChange(e)}/>
                
            </React.Fragment>
        )
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        Login : (username,password) => dispatch(Login(username,password))
    } 
}

const mapStateToProps = state => {  
    return {
        responseStatus : state.lottoReducer.responseStatus
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(LogIn)