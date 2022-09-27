import './Search.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Search() {

    const [pack, setPackage] = useState([]);

    function calD(date1, date2) {
        const date3 = new Date(date1);
        const date4 = new Date(date2);
        const diff = Math.abs(date4 - date3);
        const fin = diff / (1000 * 60 * 60 * 24);
        return (fin)
            ;
    }

    const [fromdate, setStartdate] = useState();
    const [todate, setEnddate] = useState();

    const handlestartdatechange = (event) => {
        const value = event.target.value;
        setStartdate(value)
    }

    const handleenddatechange = (event) => {
        const value = event.target.value;
        setEnddate(value);
    }
    useEffect(() => {
        fetch(`https://localhost:44337/api/tourpackages`)
            .then(res => res.json())
            .then((result) => { setPackage(result); }
            );
    }, []);

    const [searchbyperiod, setSearchbyperiod] = useState([])

    const handleSubmit = () => {

        const searchbydates = pack.filter(tours => { return fromdate <= tours.tourdate && tours.tourdate <= todate });
        setSearchbyperiod(searchbydates);
    }
    function ClearFields() {

        document.getElementById("date1").value = "";
        document.getElementById("date2").value = "";
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";
        document.getElementById("day").value = "";
        setStartdate("");
        setEnddate("");
        setMinimumcost("");
        setMaximumcost("");
        setDay("")
        setSearchbyperiod("");

    }

    const [cost, setCost] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44337/api/findcost")
            .then(res => res.json())
            .then((result) => { setCost(result); }
            );
    }, []);


    const [minimumcost, setMinimumcost] = useState(0);
    const [maximumcost, setMaximumcost] = useState();

    const mincostchange = (event) => {
        const value = event.target.value;
        setMinimumcost(value);
    }

    const maxcostchange = (event) => {
        const value = event.target.value;
        setMaximumcost(value);
    }



    const [searchbycost, setSearchbycost] = useState([])

    const handlecostsubmit = () => {

        const searchbycosts = cost.filter(cst => { return minimumcost <= cst.singleoccupancy && maximumcost >= cst.singleoccupancy });
        setSearchbycost(searchbycosts);

        const res = pack.filter(el => {
            return searchbycost.find(element => {
                return element.sectormasterid === el.sectormasterid;
            });
        });
        setSearchbyperiod(res);
    }
    const [day, setDay] = useState([])
    const daychange = (event) => {
        const value = event.target.value;
        setDay(value);
    }

    const handledaychange = () => {
        const newdays = pack.filter(pkg => { return (calD(pkg.enddate, pkg.startdate) == day) })
        console.log(newdays);
        setSearchbyperiod(newdays)
    }
    function currentdate(today) {
        const bookingdates = `${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : `${(today.getMonth() + 1)}`}-${(today.getDate()) < 10 ? `0${(today.getDate())}` : `${(today.getDate())}`}`;
        return bookingdates;
    }


    return (
        <>
            {/*Collapse Multiple Targets*/}
            <div className="container" id="btn_search">
                <div className="row " id="search_btn">
                    <div className="col-md-4">
                        <a className="btn btn-primary btn_margine" data-bs-toggle="collapse" href="#multiCollapseExample1"
                            role="button" aria-expanded="false" aria-controls="multiCollapseExample1 ">Search by Period</a>
                        <div className="collapse multi-collapse" id="multiCollapseExample1">

                            <div className="input-group mb-2">
                                <span className="input-group-text" id="basic-addon1">From</span>
                                <input id="date1" type="date" className="form-control" name="startdates" placeholder="From..." aria-label="from"
                                    aria-describedby="basic-addon1" onChange={handlestartdatechange} min={currentdate(new Date())}
                                />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="basic-addon1">To&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input id="date2" type="date" className="form-control" name="enddates" placeholder="To..." aria-label="from" aria-describedby="basic-addon1" onChange={handleenddatechange} min={currentdate(new Date())}
                                />
                            </div>
                            <button type="button" className="btn btn-secondary mt-1 mb-2" onClick={handleSubmit}>Search</button>
                            <button type="button" className="btn btn-secondary ms-2 mt-1 mb-2" onClick={ClearFields}>Clear</button>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn_margine" type="button" data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample2" aria-expanded="false"
                            aria-controls="multiCollapseExample2">Search by Cost</button>
                        <div className="collapse multi-collapse" id="multiCollapseExample2">

                            <div className="input-group mb-2">
                                <span className="input-group-text" id="basic-addon1">From</span>
                                <input type="text" name="mincost" id="min" className="form-control" placeholder="Min..." aria-label="from" aria-describedby="basic-addon1" onChange={mincostchange} range="0" />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="basic-addon1">To&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input type="text" name="maxcost" id="max" className="form-control" placeholder="Max..." aria-label="from"
                                    aria-describedby="basic-addon1" onChange={maxcostchange} />
                            </div>
                            <button type="button" className="btn btn-secondary mt-1 mb-2" onClick={handlecostsubmit}>Search</button>
                            <button type="button" className="btn btn-secondary ms-2 mt-1 mb-2" onClick={ClearFields}>Clear</button>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-primary btn_margine" type="button" data-bs-toggle="collapse"
                            data-bs-target="#multiCollapseExample3" aria-expanded="false"
                            aria-controls="multiCollapseExample3">Search by Duration</button>
                        <div className="collapse multi-collapse" id="multiCollapseExample3">

                            <div className="input-group mb-2">
                                <span className="input-group-text" id="basic-addon1">Duration&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input type="text" name="days" id="day" className="form-control" placeholder="Enter Duration" aria-label="from"
                                    aria-describedby="basic-addon1" onChange={daychange} />
                            </div>
                            <button type="button" className="btn btn-secondary mb-2" onClick={handledaychange}>Search</button>
                            <button type="button" className="btn btn-secondary ms-2 mb-2" onClick={ClearFields}>Clear</button>
                        </div>
                    </div>
                    <div className="row">
                        {
                            searchbyperiod.length > 0 ? (<>
                                <div className="row">
                                    <div className="col-2">
                                    </div>
                                    <div className="col-8 text-center" >
                                        <h2>Tours Avilable</h2>
                                        <div class="table-responsive" style={{ height: "250px", overflow: "auto" }}  >
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sr. No.</th>
                                                        <th scope="col">Tour name</th>
                                                        <th scope="col">Start Date</th>
                                                        <th scope="col">End Date</th>
                                                        <th scope="col">Book Tour</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {searchbyperiod.map((book, i) => (
                                                        <>
                                                            <tr key={i}>
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{book.packagename}</td>
                                                                <td>{book.startdate}</td>
                                                                <td>{book.enddate}</td>
                                                                <td>
                                                                    <a href={`/Details/${book.sectormasterid}`}>
                                                                        <Button className="btn btn-secondary" type="submit">View Tour</Button></a>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </>) : <h3></h3>

                        }
                    </div>
                </div>

                <hr style={{ height: "2px", borderwidth: "0", color: "gray", backgroundcolor: "gray" }} />
            </div>

        </>
    );

}

export default Search;