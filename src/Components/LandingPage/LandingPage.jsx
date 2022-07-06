import React, { useState } from 'react'
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

import { loadWeb3 } from '../API/Api'
import ConectModel from '../PopUpModels/ConectModel';

export default function LandingPage({ setIsUser }) {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    const getWalletAddress = async () => {


        let acc = await loadWeb3();
        if (acc) {
            setIsUser(true);
            navigate('/login')
        } else {
            setModalShow(true)
        }
    }
    return (
        <div className="bg-color container-fluid">
            <div className="row d-flex-justify-content-center align-items-center">
                <div className="col-12">
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <h3 className='heading'>No wallet connected. Connect wallet to show accounts and their ETH balances.</h3>
                            <button className="btn connect-btn   " onClick={() => getWalletAddress()}>
                                Conect Wallet
                            </button>
                            <ConectModel modalShow={modalShow} setModalShow={setModalShow} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
