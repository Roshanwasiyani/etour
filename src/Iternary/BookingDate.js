import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import './Book.css';
import React from 'react';
import AuthService from '../Services/auth.service'

function BookingDate() {

    const [pack, setPackage] = useState([]);
    const { SSid, cid } = useParams();
    useEffect(() => {
        fetch(`https://localhost:44337/api/tourpackages/${SSid}`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

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
    const user = AuthService.getCurrentUser();

    return (
        <>
            {user ? (
                <div className="col-3 Date_border">
                    <div>
                        <h3 className="mt-4">
                        </h3>
                        <hr />
                        <div id="Cost">
                            <h3>Tour Dates</h3>
                            <hr />
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Tours</th>
                                        <th scope="col">Tour dates</th>
                                        <th scope="col">Book Tour</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {pack.map(pkg => (
                                        <tr>
                                            <td>{pkg.packagename}<br />{calD(`${pkg.startdate}`, `${pkg.enddate}`)}D/{calN(`${pkg.startdate}`, `${pkg.enddate}`)}N</td>
                                            <td>{pkg.tourdate}</td>
                                            <td>
                                                <a href={`/book/${pkg.packageid}/${pkg.sectormasterid}/${user.cust_Id}`}>
                                                    <Button className="btn btn-info" type="submit">Book Now</Button></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>
                </div >) : (
                <div className="col-3 Date_border">
                    <div>
                        <h3 className="mt-4">
                        </h3>
                        <hr />
                        <div id="Cost">
                            <h3>Tour Dates</h3>
                            <hr />
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Tours</th>
                                        <th scope="col">Tour dates</th>
                                        <th scope="col">Book Tour</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {pack.map(pkg => (
                                        <tr>
                                            <td>{pkg.packagename}<br />{calD(`${pkg.startdate}`, `${pkg.enddate}`)}D/{calN(`${pkg.startdate}`, `${pkg.enddate}`)}N</td>
                                            <td>{pkg.tourdate}</td>
                                            <td>
                                            <button type="button" className="btn btn-info" data-bs-toggle="modal"
                                                 data-bs-target="#popup">Book now</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>
                </div >)}
{/* Popup box */}
            <div>
                <div className="modal fade" id="popup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title text-info" id="exampleModalLabel">tripiFy</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               <h4 className="text-secondary">Please Login first to continue</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-bs-dismiss="modal">Close</button>
                                <Link to="/login" ><button type="sumbit" className="btn btn-info" data-bs-dismiss="modal">Login</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingDate;