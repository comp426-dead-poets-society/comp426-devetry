import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateAccount from "./CreateAccount";
import Login from "./Login";


function ModalLogin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Login or Sign Up
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login or Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="account-components">
                        <Login />
                        <CreateAccount />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalLogin