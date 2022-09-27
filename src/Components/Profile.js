import { useEffect, useState, useRef } from 'react';
import AuthService from '../Services/auth.service'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';

function Profile() {

    const [customer, setCustomer] = useState([]);
    const user = AuthService.getCurrentUser();
    useEffect(() => {
        fetch("https://localhost:44337/api/customers/" + user.cust_Id)
            .then(res => res.json())
            .then((result) => { setCustomer(result); }
            );


    }, [user.cust_Id]);



    
    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44337/api/tourpackages/")       
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [booking, setBooking] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44337/api/booking/" + user.cust_Id)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );

    }, []);

    const res = pack.filter(el => {
        return booking.find(element => {
            return element.packageid === el.packageid;
        });
    });

    const handledelete = (passid) => {

        fetch("https://localhost:44337/api/cancelBooking/" + passid, {
            method: 'Put',
        }).then(r => {
            console.log(r.json()); 
            alert("Sucessfully Created Request for Cancel Tour.....Wait for Admin to approve");
            window.location.reload();
        }, error => { alert(error) });
        
        refreshpage();
   
    }

    function refreshpage() {

        window.location.reload(false);
    }
    

    return (

        <div className="container">

            <div className="row">
                <div className="col-12 mt-3">
                    <h2 className="text-info">Your Information</h2>
                    {customer.map(cust => (<>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFristName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="FirstName" value={cust.firstname} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="LastName" value={cust.lastname} disabled />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="Email" name="Email" value={cust.email} disabled />
                            </Form.Group>
                        </Row>
                    </>))}
                </div>
                <hr></hr>
                <div className="row">
                    <h2 className="text-info">Your Bookings</h2>
                    <div className="col-12 mt-1">
                        <div id="Cost">
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Package Name</th>
                                        <th scope="col">Number of Passanger</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Total Cost</th>
                                        <th scope="col">Request to Cancel Tours</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {booking.map((book, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{book.bookingid}</td>
                                                {res.filter((tor) => tor.packageid === book.packageid).map((pkg) => (
                                                    <td>{pkg.packagename}</td>
                                                ))}
                                                <td>{book.totalpassanger}</td>
                                                <td>{book.bookingdate}</td>
                                                <td>₹{book.totalfinalcost}</td>
                                                <td><Button className="mt-0 mb-0" variant="danger" type="submit" onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        "Do you really want to Cancel this Tour"
                                                    )
                                                    if (confirmBox === true) {

                                                        handledelete(book.bookingid);
                                                       
                                                    }
                                                }}>
                                                    <i class="bi bi-trash"></i>
                                                </Button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
} export default Profile;
