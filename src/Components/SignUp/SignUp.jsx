import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { contractAddress, cotractAbi } from '../Utils/Contract';
import { loadWeb3 } from '../API/Api'
import { create } from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0')

export default function SignUp() {

    const [fName, setfName] = useState('');
    const [Dob, setDoB] = useState('');
    const [email, setEmail] = useState('');
    const [useraddress, setUseraddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [religion, setReligion] = useState('');

    const [idFront, setIdFront] = useState(``)
    const [idBack, setIdBack] = useState(``)
    const [gender, setGender] = useState("Male");

    function onChangeValue(event) {
        setGender(event.target.value);
    }
    function onChange(e) {
        console.log(e.target.files);
        setIdFront(URL.createObjectURL(e.target.files[0]));
    }
    function onChange2(e) {
        console.log(e.target.files);
        setIdBack(URL.createObjectURL(e.target.files[0]));
    }
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
    // async function onChange(e) {
    //     const file = e.target.files[0]

    //     try {
    //         const added = await client.add(file)
    //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //         console.log(url);
    //         setIdFront(url)
    //     } catch (error) {
    //         console.log('Error uploading file: ', error)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const added = await client.add(idBack)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url);
            setIdBack(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }

        try {
            const added = await client.add(idFront)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url);
            setIdFront(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
        let acc = await loadWeb3()
        console.log('function in');
        let web3 = window.web3;
        let contractOf = new web3.eth.Contract(cotractAbi, contractAddress);
        try {
            let AddUser = await contractOf.methods.AddUser(fName, Dob, email, useraddress, city,
                zip, gender, religion, idFront, idBack).send(
                    { from: acc, }
                )
            console.log(AddUser);
        } catch (error) {
            console.log("error in fuck", error);
        }
    }

    return (
        <div className="container-fluid bbg-color" >
            <div className="row justify-content-center" >
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="card-title text-center">
                        <h2 className=" login-main-heading ">Create Account</h2>
                    </div>
                    <div className=" shadow">
                        <div className="card-body text-start  ">
                            <form onSubmit={handleSubmit} >
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Name</label>
                                    <input type="text" placeholder='Name'
                                        onChange={e => setfName(e.target.value)}
                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Date of birth</label>
                                    <input type="date" placeholder='Date of Birth'
                                        onChange={e => setDoB(e.target.value)}
                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Email</label>
                                    <input type="text" placeholder='Email'
                                        onChange={e => setEmail(e.target.value)}

                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Address</label>
                                    <input type="text" placeholder='Address'
                                        onChange={e => setUseraddress(e.target.value)}

                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">City</label>
                                    <input type="text" placeholder='City'
                                        onChange={e => setCity(e.target.value)}

                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Zip</label>
                                    <input type="text" placeholder='Zip'
                                        onChange={e => setZip(e.target.value)}

                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Gender</label>
                                    {/* <input type="text" placeholder='Gender'
                                        onChange={e => setGender(e.target.value)}

                                        className="form-control input-color"
                                    /> */}

                                    <div onChange={onChangeValue}>
                                        <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> <span className='text-white p-1'>Male</span>
                                        <input type="radio" value="Female" name="gender" checked={gender === "Female"} /> <span className='text-white p-1'>Female</span>
                                        <input type="radio" value="Other" name="gender" checked={gender === "Other"} /> <span className='text-white p-1'> Other</span>
                                    </div>

                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Religion</label>
                                    <input type="text" placeholder='Religion'
                                        onChange={e => setReligion(e.target.value)}

                                        className="form-control input-color"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Id Front Pic</label>
                                    <input type="file" placeholder='IdFront'
                                        // onChange={e => setIdFront(e.target.value)}
                                        onChange={onChange}
                                        className="form-control input-color"
                                    />
                                    {
                                        idFront && (
                                            <img src={idFront} width="400px" />
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <label className="form-label form-heading lable-text text-white">Id Front Pic</label>
                                    <input type="file" placeholder='Id back Pic'
                                        // onChange={e => setIdBack(e.target.value)}
                                        onChange={onChange2}
                                        className="form-control input-color"
                                    />
                                    {
                                        idBack && (
                                            <img src={idBack} width="400px" />
                                        )
                                    }
                                </div>



                                <div className="d-grid btn-color">
                                    <button type="submit" className="btn text-light fs-5 pt-3 pb-3 fw-bold ">Sign Up</button>
                                </div>
                                <div className="mb-4 mt-3">
                                    <span className='form-span lable-text form-label text-white' style={{ fontSize: "17px", fontWeight: "bold" }}>Already Have Acount <Link to='/login'><p className='register' style={{ color: "#4EC04F", fontSize: "17px", fontWeight: "bold" }}>Login Here</p></Link> </span>
                                </div>
                            </form>
                        </div>
                        {/* </Card> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
