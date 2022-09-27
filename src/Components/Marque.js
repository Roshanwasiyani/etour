
import './Marque.css';
import { Link } from "react-router-dom";
import React  from 'react';

function Marque(){
    return(
        <div className="container-fluid">
    <div className="ticker">
        <div className="title">
            <h5 className="mt-3">OFFERS</h5>
        </div>
        <div className="news">
            <marquee className="news-content" scrollamount="7">
                <p> Dubai <Link to="/details/5"><i>click here</i></Link></p>
                <p> Europe <Link to="/details/6"><i>click here</i></Link></p>
            </marquee>
        </div>
    </div>
</div> 
    );
}

export default Marque;