import React, { useEffect, useState } from 'react'
import { Modal, Toast, ToastContainer, Form } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import { contractAddress, cotractAbi } from '../Utils/Contract';
import { loadWeb3 } from '../API/Api';
import { create } from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0')
export default function UpdateModal({ modalShow, setModalShow, getDate, userData1, userData2 }) {

    const [fullName, setFullName] = useState('');
    const [dateOfBrith, setDateOfBrith] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [gender, setGender] = useState("Male");
    const [religion, setReligion] = useState('');
    const [idFront, setIdFront] = useState(``)
    const [idBack, setIdBack] = useState(``)

    // const updatedData = () => {
    //     setFullName(userData1.FullName);
    //     setDateOfBrith(userData1.DoB);
    //     setUserEmail(userData1.email);
    //     setAddress(userData1.useraddress);
    //     console.log(fullName);
    //     console.log(dateOfBrith);
    //     console.log(userEmail);
    //     console.log(address);
    // }

    const updatedData = async () => {
        console.log('show popup ');
        let acc = await loadWeb3()
        let web3 = window.web3;
        let contractOf = new web3.eth.Contract(cotractAbi, contractAddress);
        try {
            let UserMap = await contractOf.methods.UserMap(acc).call()
            let UserMap2 = await contractOf.methods._UserMap(acc).call()
            setFullName(UserMap.FullName)
            setDateOfBrith(UserMap.DoB)

            setUserEmail(UserMap.EmailAddress)
            setAddress(UserMap.useraddress)
            setCity(UserMap2.city)
            console.log(UserMap2.city);
            setZip(UserMap2.zip)
            setGender(UserMap2.gender)
            setReligion(UserMap2.religion)
            setIdFront(UserMap.IdFront)
            setIdBack(UserMap2.IdBack)
            console.log(UserMap2.IdBack);

        } catch (error) {
            console.log("error block", error);
        }

    }
    function onChangeValue(event) {
        setGender(event.target.value);
    }
    const [file, setFile] = useState(``)
    const [file2, setFile2] = useState(``)

    function onChange(e) {
        setFile(e.target.files[0])
        setIdFront(URL.createObjectURL(e.target.files[0]));
    }
    function onChange2(e) {
        setIdBack(URL.createObjectURL(e.target.files[0]));
        setFile2(e.target.files[0])
    }
    const updateUsers = async () => {
        // setIdFront(showFile);
        // try {
        //     const added = await client.add(idBack)
        //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
        //     console.log(url);
        //     setIdBack(url)
        // } catch (error) {
        //     console.log('Error uploading file: ', error)
        // }
        let acc = await loadWeb3()

        try {
            const added = await client.add(file);
            const frontPicUrl = `https://ipfs.infura.io/ipfs/${added.path}`
            setIdFront(frontPicUrl)
            const added2 = await client.add(file2);
            const backPicUrl = `https://ipfs.infura.io/ipfs/${added2.path}`
            setIdBack(backPicUrl)
            let web3 = window.web3;
            let contractOf = new web3.eth.Contract(cotractAbi, contractAddress)
            await contractOf.methods.UpdateUserInfo(fullName, zip, dateOfBrith, userEmail, address, city,
                gender, religion, frontPicUrl, backPicUrl).send(
                    { from: acc, }
                )
            setModalShow(false);
            getDate();


        } catch (error) {
            console.log("error ", error);
        }
    }


    // async function onChange(e) {
    //     const file = e.target.files[0]
    //     console.log(file);
    //     try {
    //         const added = await client.add(file)
    //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //         console.log(url);
    //         setIdFront(url)
    //     } catch (error) {
    //         console.log('Error uploading file: ', error)
    //     }
    // }
    // async function onChange2(e) {
    //     const file = e.target.files[0]
    //     try {
    //         const added = await client.add(file)
    //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //         console.log(url);
    //         setIdBack(url)
    //     } catch (error) {
    //         console.log('Error uploading file: ', error)
    //     }
    // }
    useEffect(() => {
        updatedData()
    }, []);
    return (
        <div>
            <Modal
                show={modalShow} onHide={() => {
                    setModalShow(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body className='modal-color' style={{ backgroundColor: "#1B1E30" }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={28}
                                className="icon-color"
                                style={{ cursor: "pointer", color: "white" }}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div className="card-title text-center">
                                <h2 className=" login-main-heading text-white">Update User</h2>
                            </div>
                            <div className=" shadow" style={{ backgroundColor: "#2D3252" }}>
                                <div className="card-body text-start ">
                                    <form
                                    >


                                        <div className="mb-1">
                                            <label className="form-label form-heading lable-text text-white">Name</label>
                                            <input type="text"
                                                value={fullName}
                                                onChange={e => setFullName(e.target.value)}
                                                className="form-control input-color" id="username" />
                                        </div>
                                        <div className="mb-1">
                                            <label className="form-label form-heading lable-text text-white">Date Of Birth</label>
                                            <input type="date" value={dateOfBrith}
                                                onChange={e => setDateOfBrith(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Email</label>
                                            <input type="text" value={userEmail}
                                                onChange={e => setUserEmail(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Address</label>
                                            <input type="text" value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">City</label>
                                            <input type="text" value={city}
                                                onChange={e => setCity(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Zip</label>
                                            <input type="text" value={zip}
                                                onChange={e => setZip(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Gender</label>
                                            <div onChange={onChangeValue}>
                                                <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> <span className='text-white p-1'>Male</span>
                                                <input type="radio" value="Female" name="gender" checked={gender === "Female"} /> <span className='text-white p-1'>Female</span>
                                                <input type="radio" value="Other" name="gender" checked={gender === "Other"} /> <span className='text-white p-1'> Other</span>
                                            </div>
                                        </div>
                                        <div className="mb-1">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Religion</label>
                                            <input type="text" value={religion}
                                                onChange={e => setReligion(e.target.value)}
                                                className="form-control input-color" id="username"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-1">
                                                    <label className="form-label form-heading lable-text text-white">Id Front Pic</label>
                                                    <input type="file" placeholder='IdFront'
                                                        // onChange={e => setIdFront(e.target.value)}
                                                        onChange={onChange}
                                                        className="form-control input-color"
                                                    />
                                                    {
                                                        idFront && (
                                                            <img src={idFront} width="100px" />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-1">
                                                    <label className="form-label form-heading lable-text text-white">Id Back Pic</label>
                                                    <input type="file" placeholder='Id back Pic'
                                                        // onChange={e => setIdBack(e.target.value)}
                                                        onChange={onChange2}
                                                        className="form-control input-color"
                                                    />
                                                    {
                                                        idBack && (
                                                            <img src={idBack} width="100px" />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>



                                    </form>
                                    <div class="d-grid btn-color">
                                        <button className="btn text-light"
                                            onClick={() => updateUsers()}

                                        >Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
