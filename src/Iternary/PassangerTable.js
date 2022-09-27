import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useParams} from 'react-router-dom';
import React  from 'react';
function PassangerTable() {
    
    const [booking, setBooking] = useState([]);
    const { smid, bkid, cid } = useParams();
   
    useEffect(() => {
        fetch(`https://localhost:44337/api/passangers/${cid}`)
            .then(res => res.json())
            .then((result) => { setBooking(result); }
            );
    }, []);

    const handledelete = (passid) => {
        fetch("https://localhost:44337/api/deletePassanger/" + passid, {
            method: 'Delete'
        })
            .then(res => res.json())
            .then((result) => {
                setBooking(result);
            });
            alert("Sucessfully Deleted Passanger");
            refreshpage();
            
    }

    function refreshpage(){

        window.location.reload(false);
    }
    function calage(date1){
        const date2=new Date(date1);
        const today=new Date();
        const date3=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const date4=new Date(date3)
        const diff = Math.ceil(date4 - date2);
        const fin=Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        return((fin))
        ;            
    }

    return (
        <>
            <div>
                <div id="Cost">

                    <h2>All Passangers</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Age</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {booking.map((book, i) => (                               
                                <>
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{book.firstname}</td>
                                        <td>{book.lastname}</td>
                                        <td>{book.gender}</td>
                                        <td>{calage(`${book.dob}`)}</td>
                                        <td>₹{book.cost}</td>
                                        <td><Button className="mt-0 mb-0" variant="danger" type="submit" onClick={() => {
                                            const confirmBox = window.confirm(
                                                "Do you really want to delete this Customer"
                                            )
                                            if (confirmBox === true) {

                                                handledelete(book.passangerid);
                                            }
                                        }}>
                                            <i class="bi bi-person-x-fill"></i>
                                            </Button></td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>

        </>
    );
}

export default PassangerTable;