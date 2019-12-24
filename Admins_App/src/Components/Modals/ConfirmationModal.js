import React from 'react'
import Modal from "react-bootstrap/Modal"
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'

export default function ConfirmationModal(props) {
    return (
        <Modal
            size="lg"
            show={props.isOpen}
            onHide={() => props.hideModal()}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            <ModalTitle id="example-modal-sizes-title-lg">
                {props.title}
            </ModalTitle>
            </Modal.Header>        
            <ModalFooter>
                <button className="btn btn-primary" style = {{marginTop:"25px",marginBottom : "15px"}} onClick={() => props.confirm()}>Confirm</button>    
                <button className="btn btn-primary" style = {{marginTop:"25px",marginBottom : "15px"}} onClick={() => props.hideModal()}>Cancel</button>      
            </ModalFooter>
      </Modal>
    )
}
