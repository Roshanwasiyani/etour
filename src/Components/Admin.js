import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import AuthService from '../Services/auth.service';


function Admin(){

    const [booking, setBooking] = useState([]);
    const user=AuthService.getCurrentUser();
    useEffect(() => {
        fetch("https://localhost:44337/api/bookingToDelete/")
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );

    }, []);

    const handledelete = (bookingid) => {
        fetch("https://localhost:44337/api/bookings/" + bookingid, {    
            method: 'Delete'
        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            alert("Sucessfully Cancel booking");
            refreshpage();
            
    }
    function refreshpage(){
        window.location.reload(false);
    }
    const [pack, setPackage] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44337/api/tourpackages/")
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);
    const res = pack.filter(el => {
        return booking.find(element => {
            return element.packageid === el.packageid;
        });
    });

    useEffect(() => {
        if(user.roles.includes("ROLE_USER"))
        {
            window.location.replace("http://localhost:3000")
        }

    }, []);

    return(
            <div className="container">
                <div className="row">
                    <div>
                    <h2 className="text-info mt-4">Customer Bookings for cancellation</h2>
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
                                                </Button></td>
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

}

export default Admin;