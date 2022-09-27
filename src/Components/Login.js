import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../Services/auth.service";
import './Login.css';



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
     
    };
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {

    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });


    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password)
        .then(
          () => {
           
            window.location.replace(`http://localhost:3000/`);
            
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.setState({
              loading: false,
              
              message: "bad credentials"
            });
          }
        );
    } else {
      this.setState({
        loading: false
      });
    }

  }

  render() {
    
    
    return (
      
      <div className="col-md-12 ">
        <div className="ccard ccard-container mb-5">
          <img
            src="/Images/logo5.png"
            alt="profile-img"
            className="cprofile-img-card img-fluid"
          />
          <h3 className="text-center text- color:#232062;">tripiFy</h3>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group text-white">
              <label htmlFor="username">Email Id</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeemail}
                validations={[required]}
              />
            </div>

            <div className="form-group text-white">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group text-center">

              <button
                className="btn btn-secondary btn-block mt-3"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}

                <span>Login</span>
              </button>

            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
