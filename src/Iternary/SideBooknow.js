import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import {  useParams } from "react-router-dom";
import React  from 'react';
import Form from 'react-bootstrap/Form'

import './Book.css';

function SideBooknow() {

    const [pack, setPackage] = useState([]);
    const { bkid, smid, cid, } = useParams()
    useEffect(() => {
        fetch("https://localhost:44337/api/tourpackages/" + smid)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [booking, setBooking] = useState([]);
    
    useEffect(() => {
        fetch(`https://localhost:44337/api/passangersCost/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    const canclebooking = (event) => {
        fetch("https://localhost:44337/api/deleteAllPassanger/"+cid, {
            method: 'Delete'

        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            window.location.reload(false)

    }

    function calcost(initialvalue) {
        var sum = 0;
        initialvalue.map(element => {
            sum = sum + parseInt(element.cost)
        });
        return (sum);
    }

    function calD(date1, date2) {
        const date3 = new Date(date1);
        const date4 = new Date(date2);
        const diff = Math.abs(date4 - date3);//ms
        const fin = diff / (1000 * 60 * 60 * 24);//
        return (fin)
            ;
    }
    function calN(date1, date2) {
        const date3 = new Date(date1);
        const date4 = new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin = diff / (1000 * 60 * 60 * 24);
        return (fin - 1)
            ;
    }

    
    return (
        <>
            {/* <!-- Date Side Box --> */}
            <div className="Date_border">
                <div>
                    <h3 className="mt-4">
                    </h3>

                    <div className="container">
                        {pack.map((pkg, i) => (
                            <>
                                <div className="row">
                                    <h2 className="ms-2 text-info">{pkg.packagename}</h2>
                                    <hr />


                                    <div>
                                        <h3 className="ms-2 text-secondary">{calD(`${pkg.startdate}`, `${pkg.enddate}`)} Days , {calN(`${pkg.startdate}`, `${pkg.enddate}`)} Nights </h3>
                                        <hr></hr>

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <span>Tour Starts</span>
                                        <h5>{pkg.startdate}</h5>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-1 text-secondary"><i class="bi bi-arrow-right"></i></h2>
                                    </div>
                                    <div className="col-5">
                                        <span>Tour End</span>
                                        <h5>{pkg.enddate}</h5>
                                    </div>
                                </div>

                                <hr></hr>
                                <hr></hr>

                                <div className="row">
                                    <h5>Super Deal Price</h5>

                                    <h3> ₹{calcost(booking)}
                                    </h3>

                                </div>
                                <br>
                                </br>
                                <div className="row">
                                    <div className="d-grid gap-2 col-6">
                                        <Form >
                                            <Link to={`/view/${bkid}/${smid}/${cid}`}><Button className="btn btn-info mb-2 btn-lg" type="submit">Checkout</Button></Link>
                                        </Form>
                                    </div>

                                    <div className="col-6 d-grid gap-2">
                                        <Form >
                                            <Button className="btn btn-info mb-2 btn-lg" type="button" onClick={canclebooking}>Cancel</Button>
                                        </Form>
                                    </div>
                                </div>
                            </>
                        ))}</div>

                </div>
            </div >
        </>
    );
}

export default SideBooknow;