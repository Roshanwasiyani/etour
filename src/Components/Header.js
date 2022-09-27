import { Link } from "react-router-dom";
import { Component } from "react"
import './Header.css';
import AuthService from "../Services/auth.service";
import EventBus from "../Common/EventBus";

class Header extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    

    render() {
        const { currentUser, showAdminBoard } = this.state;
        return (

            <div className="noprint">
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-info" id="nav_bar">

                    <div className="container-fluid">
                        
                        <Link className="navbar-brand fw-bold img-fluid fs-4 mt-1" to="/" style={{ color:"#232062" }} ><img src="/Images/logo5.png"
                            width="50" height="50" /> tripiFy</Link>

                            
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mt-0 mb-lg-0">
                                
                                <li className="nav-item nav_name ">
                                    <Link  className="nav-link active" to="/" style={{ color: "#232062" }}><b>Home</b></Link>
                                </li>

                                <li className="nav-item nav_name">

                                    <Link className="nav-link" to="/about" style={{ color: "#232062" }}><b>About</b></Link>
                                </li>
                                
                                <li className="nav-item nav_name">

                                    <Link className="nav-link" to="/#Tour" style={{ color: "#232062" }}><b>Tours</b></Link>
                                </li>
                                <li className="nav-item nav_name">
                                    <Link className="nav-link" to="/Gallery" style={{ color: "#232062" }}><b>Gallery</b></Link>

                                </li>
                                <li className="nav-item nav_name">
                                    <a href="#contactus" className="nav-link" style={{ color: "#232062" }}><b>Contact us</b></a>
                                    
                                </li>
                            </ul>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        {currentUser.roles.includes("ROLE_ADMIN") ? (
                                            <li className="nav-item">
                                                <Link to={"/Admin"} className="nav-link">
                                                    <button className="btn btn-secondary mt-2"><i class="bi bi-person-lines-fill size"></i></button>
                                                </Link>
                                            </li>
                                        ) : (<li className="nav-item">
                                            <Link to={"/Profile"} className="nav-link">
                                                <button className="btn btn-secondary mt-2"><i class="bi bi-person-lines-fill size"></i></button>
                                            </Link>
                                        </li>)}
                                    </li>
                                    <li className="nav-item">
                                        <a href="/" className="nav-link" onClick={this.logOut}>
                                            <button className="btn btn-secondary mt-sm-2 mb-sm-2">Logout</button>
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            <button className="btn btn-secondary mt-sm-2 mb-sm-2">Login</button>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            <button className="btn btn-secondary mt-sm-2 mb-sm-2">Sign Up</button>
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </div>

                        
                    </div>
                </nav >
            </div >
        );
    }
}

export default Header;