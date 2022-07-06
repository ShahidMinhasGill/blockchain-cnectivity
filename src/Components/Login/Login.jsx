import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { loadWeb3 } from '../API/Api';
import { contractAddress, cotractAbi } from '../Utils/Contract';
import toast, { Toaster } from 'react-hot-toast';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        // count.current = count.current + 1;
        let acc = loadWeb3();
        setPassword(acc)

    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('function in');
        let acc = await loadWeb3()

        let web3 = window.web3;
        let contractOf = new web3.eth.Contract(cotractAbi, contractAddress);
        try {
            let UserMap = await contractOf.methods.UserMap(acc).call()
            // console.log(UserMap.EmailAddress);
            if (email === (UserMap.EmailAddress)) {
                navigate('/dashbaord')
            } else {
                toast.error(`Dosn't Match Email or Password!`)
            }
        } catch (error) {
            console.log("error block", error);
        }

    }
    return (
        <div className="container-fluid bbg-color ">
            <div className="row justify-content-center mb-3">
                <div className="col-lg-5 col-md-6 col-sm-6">
                    <div className="card-title text-center">
                        <h2 className="pb-2 login-main-heading">Login</h2>
                    </div>
                    <div className=" shadow">
                        <div className="card-body text-start ">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">UserNameEmail</label>
                                    <input type="text" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} className="form-control input-color" id="username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className='d-flex flex-row justify-content-between align-items-center'>

                                        <label className="form-label form-heading lable-text text-white">Password</label>
                                    </div>

                                    <input type="password" placeholder='Password' value={password} className="form-control input-color" id="password"
                                    />
                                </div>

                                <div className="d-grid btn-color">
                                    <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">Submit</button>


                                </div>
                                <div className="mb-4 mt-3">
                                    {/* <span className='form-span lable-text form-label' for="remember" >{t('DontHaveAccount')}?&nbsp;   */}
                                    <Link to='/register'><p className='register' style={{ color: "#4EC04F", fontSize: "17px", fontWeight: "bold" }}>Register</p></Link>
                                    {/* </span> */}

                                </div>
                            </form>
                            <Toaster />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
