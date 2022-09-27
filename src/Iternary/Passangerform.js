
import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PassangerTable from './PassangerTable';

function Passangerform() {

    const [Passanger, setPassanger] = useState({});
    const { smid, bkid, cid } = useParams();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPassanger(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            let demo = JSON.stringify(Passanger);
            console.log(JSON.parse(demo));
                fetch("https://localhost:44337/api/passangers/"+smid+"/"+cid, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: demo
            }).then(r => {
                console.log(r.json()); alert(" Passanger has Added Successfully ")
                window.location.reload();
            }, error => { alert(error) });
        }
        setValidated(true);

    }


   

    const [cost, setCost] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44337/api/costs/" + smid)
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);





    const [validated, setValidated] = useState(false);

    return (
        <div>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstname" placeholder="Enter First Name..." required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName" onChange={handleChange} >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastname" placeholder="Enter Last Name..." required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGridAddress" onChange={handleChange}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="1234 Main St" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" name="mobile" placeholder="Enter Mobile No...." pattern="[0-9]{10}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Mobile Number Must be 10 Digit</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFristName" onChange={handleChange}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="dob" min="1920-01-01"
                                max="2021-03-31" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFristName" name="gender" onChange={handleChange}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input mt-3" type="radio" name="gender" value="Male" id="inlineRadio1" required />
                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input mt-3" type="radio" name="gender" value="Female" id="inlineRadio2" required />
                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                </div>
                                <div className="form-check form-check-inline ">
                                    <input className="form-check-input mt-3" type="radio" name="gender" value="others" id="inlineRadio3" required />
                                    <label className="form-check-label" for="inlineRadio3">Others</label>
                                </div>
                            </div>

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} name="city" controlId="formGridCity" onChange={handleChange}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState" name="state" onChange={handleChange}>
                            <Form.Label>State</Form.Label>
                            <Form.Select name="state" id="state" defaultValue="Choose..." required>
                                <option>Choose...</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} name="pincode" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" name="pincode" pattern="[0-9]{6}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Pincode Must be 6 Digit</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} name="aadharcard" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Adharcard Number</Form.Label>
                            <Form.Control type="text" name="aadharcard" pattern="[0-9]{12}" required />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Adharcard Must be 12 Digit</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} name="passport" controlId="formGridZip" onChange={handleChange}>
                            <Form.Label>Passport Number</Form.Label>
                            <Form.Control type="text" name="passport" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridFristName" name="cost" onChange={handleChange}>
                            <Form.Label>Select Room Type</Form.Label>
                            {cost.map(cst => (
                                <div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="cost" id="inlineRadio1" value={cst.singleoccupancy} required />
                                        <label className="form-check-label" for="inlineRadio1">Single Occupancy</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="cost" id="inlineRadio2" value={cst.twinperson} required />
                                        <label className="form-check-label" for="inlineRadio2">Twin Sharing</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="cost" id="inlineRadio3" value={cst.tripplesharing} required />
                                        <label className="form-check-label" for="inlineRadio3">	Triple Sharing</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="cost" id="inlineRadio3" value={cst.childwithparent} required />
                                        <label className="form-check-label" for="inlineRadio3">Child with Bed</label>
                                    </div>
                                    <div className="form-check form-check-inline mt-1">
                                        <input className="form-check-input  mt-3" type="radio" name="cost" id="inlineRadio3" value={cst.childwithoutparents} required />
                                        <label className="form-check-label" for="inlineRadio3">Child without Bed</label>
                                    </div>
                                </div>
                            ))}
                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Row>
                    <Button className="mt-3 mb-3" variant="info" type="submit"  >
                        Add Passanger
                    </Button>
                </Form>

            </div>
            <hr />
            {<PassangerTable />}
        </div>
    );
}

export default Passangerform;