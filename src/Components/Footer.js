
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="noprint">
            {/*footer section*/}
            <footer className ="text-muted py-5 bg-info" id="contactus">
                <div className ="container">
                    <div className ="row">
                        <div className ="col-md-2">
                            <img src="/Images/logo5.png" width="150" height="auto" className ="ms-md-5 img-fluid" />
                            <p className="textbottom">
                            <h4><b>tripiFy</b></h4>
                            </p>


                        </div>
                        <div className ="col-md-6">
                            
                                <ul id="footer_text">
                                    <li>
                                        <span style={{color:"white",fontSize:"medium"}}>Contact Us</span>
                                    </li>
                                    <li>
                                        <i className ="bi bi-envelope"></i> <a href="mailto:tripiFy931@gmail.com">tripiFy@gmail.com</a>
                                    </li>
                                    <li>
                                        <i className ="bi bi-telephone"></i><span>+91 9999999999</span>
                                    </li>
                                    <li>
                                        <i className ="bi bi-whatsapp"></i><span>+91 8888888888</span>
                                    </li>
                                    <li>
                                        <p className ="mb-0">To Know More About Us<Link to="About">About Us</Link></p>
                                    </li>
                                    <li>
                                        <p className ="mb-1">&copy; Group no-5</p>
                                    </li>
                                </ul>
                            
                        </div>
                        <div className ="col-md-4">
                            <p className ="float-end mb-1">
                                <a href="#">Back to top</a>
                            </p>
                        </div>

                    </div>

                </div>
            </footer>
        </div>
    );

}

export default Footer;