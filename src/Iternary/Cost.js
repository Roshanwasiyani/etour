import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React  from 'react';


function Cost() {

    const [cost, setCost] = useState([]);
    const { SSid } = useParams();
    useEffect(() => {
        fetch("https://localhost:44337/api/costs/" + SSid)  //SSid=SectorMasterID
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);


    return (
        <>
            <div id="Cost">
                <h3>Tour Detailed Price</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Deal Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cost.map(cst => (
                            <>
                            <tr key={cst.costid}>
                                <th scope="row">1</th>
                                <td>Single Occupancy</td>
                                <td>₹{cst.singleoccupancy}</td>
                            </tr>
                        

                         <tr>
                            <th scope="row">2</th>
                            <td>Twin Sharing</td>
                            <td>₹{cst.twinperson}</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Triple Sharing</td>
                            <td>₹{cst.tripplesharing}</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Child With Parent</td>
                            <td>₹{cst.childwithparent}</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Child Without Parent</td>
                            <td>₹{cst.childwithoutparents}</td>
                        </tr> 
                        </>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        </>

    );
}

export default Cost;