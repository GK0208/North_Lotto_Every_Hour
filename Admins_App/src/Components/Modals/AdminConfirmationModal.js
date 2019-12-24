import React from 'react'
import Modal from "react-bootstrap/Modal"
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

export default function AdminConfirmationModal(props) {
    return (
        <Modal
            size="lg"
            show={props.isOpen}
            onHide={() => props.hideModal()}
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
                <input type = "email" className = "form-control" name="username"  placeholder="Enter email" onChange={(e)=>props.onChange(e)}  required/>       
            </div>
            <div>
            <button className="btn btn-primary" style = {{marginTop:"25px",marginBottom : "15px"}} onClick={() => props.confirmAdmin()}>Confirm</button>  
            </div>
            <ModalFooter>
                <p id ="wrongEmail" style={{color:"red",display:"none"}}>Email is not correct !</p>            
            </ModalFooter>
        </ModalBody>
      </Modal>
    )
}
