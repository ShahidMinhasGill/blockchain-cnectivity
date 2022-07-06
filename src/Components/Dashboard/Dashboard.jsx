import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Dashboard.css";
import { Modal, Toast, ToastContainer, Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

import { contractAddress, cotractAbi } from "../Utils/Contract";
import { loadWeb3 } from "../API/Api";
import { create } from "ipfs-http-client";
import UpdateModal from "../PopUpModels/UpdateModal";
const client = create("https://ipfs.infura.io:5001/api/v0");
export default function Dashboard() {
    const [modalShow, setModalShow] = useState(false);
    const [fName, setfName] = useState("");
    const [DoB, setDoB] = useState("");
    const [email, setEmail] = useState("");
    const [useraddress, setUseraddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [gender, setGender] = useState("Male");
    const [religion, setReligion] = useState("");
    const [idFront, setIdFront] = useState(``);
    const [idBack, setIdBack] = useState(``);
    const [userData1, sendUserData1] = useState(``);
    const [userData2, sendUserData2] = useState(``);

    const getDate = async () => {
        console.log("function in");
        let acc = await loadWeb3();

        let web3 = window.web3;
        let contractOf = new web3.eth.Contract(cotractAbi, contractAddress);
        try {
            let UserMap = await contractOf.methods.UserMap(acc).call();
            let UserMap2 = await contractOf.methods._UserMap(acc).call();
            sendUserData1(UserMap);
            sendUserData2(UserMap2);
            setfName(UserMap.FullName);
            console.log(fName);
            setDoB(UserMap.DoB);
            setEmail(UserMap.EmailAddress);
            setUseraddress(UserMap.useraddress);
            setCity(UserMap2.city);
            setZip(UserMap2.zip);
            setGender(UserMap2.gender);
            setReligion(UserMap2.religion);
            setIdFront(UserMap.IdFront);
            setIdBack(UserMap2.IdBack);
            // console.log(UserMap2.IdBack);
        } catch (error) {
            console.log("error block", error);
        }
    };
    const handleUpdate = () => {
        console.log("running handle update....");
        setModalShow(true);

    };
    useEffect(() => {
        getDate();
    }, []);

    return (
        <div className="bg-dashboard container-fluid">
            <div
                className="row d-flex justify-content-end align-items-center"
                style={{ paddingBottom: "20px" }}
            >
                <div className="col-lg-12  ">
                    <div className="">
                        <div className="row d-flex justify-content-end"></div>
                        <div className="row justify-content-center ">
                            <div className=" col-lg-4  mt-5 col-10">
                                <div className="tab-content">
                                    <div
                                        className="tab-pane active scroll-tab"
                                        id="tabs-1"
                                        role="tabpanel"
                                    >
                                        <table class="table text-left">
                                            <thead className="th-style">
                                                <th
                                                    className="text-white b"
                                                    style={{ fontSize: "2rem" }}
                                                    colSpan={12}
                                                >
                                                    info
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr className="text-white">
                                                    <th className="text-start">Name</th>
                                                    <td className="text-end">{fName}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Date Of Birth</th>
                                                    <td className="text-end">{DoB}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Email</th>
                                                    <td className="text-end">{email}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Address</th>
                                                    <td className="text-end">{useraddress}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">City</th>
                                                    <td className="text-end">{city}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Zip</th>
                                                    <td className="text-end">{zip}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Gender</th>
                                                    <td className="text-end">{gender}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <th className="text-start">Religion</th>
                                                    <td className="text-end">{religion}</td>
                                                </tr>
                                                <tr className="text-white">
                                                    <td>
                                                        {idFront && <img src={idFront} width="200px" />}
                                                    </td>
                                                    <td>
                                                        {idBack && <img src={idBack} width="200px" />}
                                                    </td>
                                                </tr>
                                                <button
                                                    class="button-os pl-5  "
                                                    onClick={() => handleUpdate()}
                                                    id="foot"
                                                >
                                                    Update
                                                </button>
                                            </tbody>
                                        </table>

                                        {/* {modalShow && (<EditModal modalShow={modalShow} setModalShow={setModalShow} user={sendUserData} />)} */}
                                    </div>
                                    <div>
                                        <UpdateModal
                                            modalShow={modalShow}
                                            setModalShow={setModalShow}
                                            userData1={userData1}
                                            userData2={userData2}
                                            getDate={getDate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
