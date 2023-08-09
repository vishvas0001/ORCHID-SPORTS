export default function Footer(){
    return(
    <>
    {/* <!-- Footer Section Begin --> */}
    <footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="contact-option">
                        <span>Phone</span>
                        <p>(123) 118 9999 - (123) 118 9999</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contact-option">
                        <span>Address</span>
                        <p>72 Kangnam, 45 Opal Point Suite 391</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contact-option">
                        <span>Email</span>
                        <p>contactcompany@Gutim.com</p>
                    </div>
                </div>
            </div>
            <div className="subscribe-option set-bg set-bg13">
                <div className="so-text">
                    <h4>Subscribe To Our Mailing List</h4>
                    <p>Sign up to receive the latest information </p>
                </div>
                <form action="#" className="subscribe-form">
                    <input type="text" placeholder="Enter Your Mail"/>
                    <button type="submit"><i className="fa fa-send"></i></button>
                </form>
            </div>
            <div className="copyright-text">
                <ul>
                    <li><a href="#">Term&Use</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
                <p>&copy;
                  <p>
                    Copyright &copy;2023 All rights reserved |  <i className="fa fa-heart" aria-hidden="true"></i>
                  </p>
                </p>
                <div className="footer-social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                </div>
            </div>
        </div>
    </footer>
    {/* <!-- Footer Section End --> */}
        </>
    )
}