import React from "react";
import {useFormik} from "formik";
import "./Login.css";
import AuthService from "../Services/auth.service";
import {loginSchema} from "./schemas/loginSchema";

const initialValues = {
  email: "",
  password: "",
};
function LoginTrial() {
  const {values, errors, handleBlur, handleChange, handleSubmit, touched} =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
        AuthService.login(values.email, values.password).then(() => {
          window.location.replace(`http://localhost:3000/`);
        });
      },
    });
  return (
    <div className="col-md-12">
      <div className="ccard ccard-container mb-5">
        <img
          src="/Images/logo5.png"
          alt="profile-img"
          className="cprofile-img-card img-fluid"
        />
        <h3 className="text-center text- color:#232062;">tripiFy</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group text-white">
            <label htmlFor="email">Email Id</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error" style={{color: "red"}}>
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="form-group text-white">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error" style={{color: "red"}}>
                {errors.password}
              </p>
            ) : null}
          </div>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-secondary btn-block mt-4 mb-4"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginTrial;
