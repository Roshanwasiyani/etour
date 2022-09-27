
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from 'react-router-dom';
import React  from 'react';
function Iternery(props) {

    const [iternery, setIternery] = useState([]);
    const { SSid } = useParams()
    useEffect(() => {
        fetch("https://localhost:44337/api/itineraries/" + SSid)
            .then(res => res.json())
            .then((result) => { setIternery(result); }
            );
    }, []);

    const [pack, setPackage] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44337/api/tourpackages/" +SSid)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);
  
    function calD(date1,date2){
        const date3=new Date(date1);
        const date4=new Date(date2);
        const diff = Math.abs(date4 - date3);       //diff is in milliseconds
        const fin=diff / (1000 * 60 * 60 * 24);     //Convert Milliseconds into days(1000-seconds,60-minutes,60-hours,24-days)
        return(fin)
        ;            
    }
    function calN(date1,date2){
        const date3=new Date(date1);
        const date4=new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin=diff / (1000 * 60 * 60 * 24);
        return(fin-1)
        ;            
    }
   
    return (
        
        <div>
            <div>
            {pack.filter((cust, i) => i <=0).map((cust,i) => ( 
                <div key={i} >
                    <hr></hr>
                         <p>Itnerary is valid from {cust.startdate} to {cust.enddate}</p>
                         <h3>{cust.packagename}</h3>
                         <p> {calD(`${cust.startdate}`,`${cust.enddate}`)} Days {calN(`${cust.startdate}`,`${cust.enddate}`)}  Hotel Nights</p>
                         </div>
                   
                   )) }
                </div>
                <hr></hr>
             {iternery.map(itr => (
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{itr.day}</Accordion.Header>
                                <Accordion.Body>
                                    {itr.description}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
            <br></br>
            <br></br>


        </div>
    );
}

export default Iternery;