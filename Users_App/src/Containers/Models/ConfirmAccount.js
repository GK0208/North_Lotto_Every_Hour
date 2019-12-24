import React, { Component } from 'react'
import {ConfirmEmail} from "../../Actions/AuthenticationActions"
import {connect } from "react-redux";
import Modal from "react-bootstrap/Modal"
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import { restore } from "../../Actions/AuthenticationActions"


class ConfirmAccount extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            errorMessage: ""
        }
    }

    componentDidMount(){
        const query = this.props.location.search;
        const email = query.substring(query.indexOf("=")+1)
        this.setState({
            email
        })
    }

    componentDidUpdate(){
        if (this.props.success.length > 0) {
            alert(this.props.success)
            this.props.restore();
            this.props.history.push("/")
        }

        if (this.props.error.length > 0){
            this.setState({
                errorMessage:this.props.error
            })
            document.getElementById("invalidInput").style.display = "block";
            this.props.restore()
        }
    }

    confirmEmail =() =>{
        const model = this.state
        this.props.confirmEmail(model)
       // this.props.history.push("/")
    }

    onChange =(e) =>{
        this.setState({
            [e.target.name] :e.target.value
        })

        document.getElementById("invalidInput").style.display = "none";
    }

    render() {
        const query = this.props.location.search;
        const email = query.substring(query.indexOf("=")+1)
        return (
            <Modal
            size="lg"
            show={true}
            aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <ModalTitle id="example-modal-sizes-title-lg">
                    Confirm your email address
                </ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <div>
                        <label style={{marginTop:"15px"}} htmlFor="exampleInputEmail1">
                            <b>
                                Email
                            </b>
                        </label>
                        <input type = "email" className = "form-control" name="username"  placeholder="Enter email" value = {email} readOnly/>  
                        <input type = "password" className = "form-control" name="password"  placeholder="Enter password" onChange= {(e) =>this.onChange(e)} />     
                    </div>
                    <div>
                    <button className="btn btn-primary" style = {{marginTop:"25px",marginBottom : "15px"}} onClick={() => this.confirmEmail()}>Confirm</button>  
                    </div>
                    <div>
                        <p id="invalidInput" style ={{color:"red",display:"none"}}>{ this.state.errorMessage }</p>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirmEmail : (email) => dispatch(ConfirmEmail(email)),
        restore : () => dispatch(restore())
    }
}

const mapStateToProps = state =>{
    return {
        success : state.lottoReducer.success,
        error : state.lottoReducer.error
    }
}


  
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccount);


