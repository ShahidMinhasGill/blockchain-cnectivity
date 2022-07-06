import React, { useState } from 'react'
import { Nav, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./Navbar.css";
import { loadWeb3 } from '../API/Api'
import ConectModel from '../PopUpModels/ConectModel';
export default function NavBar() {
    let [wallletAddress, setWalletAddress] = useState('Conect Wallet');
    const [modalShow, setModalShow] = useState(false);

    const getWalletAddress = async () => {
        let acc = await loadWeb3();
        console.log(acc);
        let myAcc = acc.substring(0, 3) + "..." + acc.substring(acc.length - 4);
        setWalletAddress(myAcc);
    };
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Block-Chain Conectivity</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">
                            <button className="btt connect-btn  " onClick={() => setModalShow(true)}>
                                {wallletAddress}
                            </button>

                            <ConectModel modalShow={modalShow} setModalShow={setModalShow} />
                            {/* <button className="btt connect-btn  " onClick={() => getWalletAddress()}>
                                {wallletAddress}
                            </button> */}
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
