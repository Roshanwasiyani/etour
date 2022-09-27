import {useFormik} from "formik";
import React from "react";
import AuthService from "../Services/auth.service";
import {signUpSchema} from "./schemas/registerSchema";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  password: "",
  confirm_password: "",
};
function RegisterTrial() {
  const {values, errors, handleBlur, handleChange, handleSubmit, touched} =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
        AuthService.register(
          values.firstName,
          values.lastName,
          values.email,
          values.mobile,
          values.dob,
          values.gender,
          values.password
        );
      },
    });
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <img src="/Images/giphy.gif"
            alt="profile-img"
            className="img-fluid"
          />
        </div>
        <div className="col-6">
          <img
            src="/Images/logo5.png"
            alt="profile-img"
            className="cprofile-img-card img-fluid"
          />
          <h3 className="text-center text-color:#232062">tripiFy</h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div class="form-group text-black col-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="form-error" style={{color: "red"}}>
                    {errors.firstName}
                  </p>
                ) : null}
              </div>
              <div class="form-group text-black col-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <p className="form-error" style={{color: "red"}}>
                    {errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
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
              <div className="form-group col-12">
                <label htmlFor="mobile">Mobile No.</label>
                <input
                  type="text"
                  class="form-control"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobile && touched.mobile ? (
                  <p className="form-error" style={{color: "red"}}>
                    {errors.mobile}
                  </p>
                ) : null}
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    class="form-control"
                    name="dob"
                    id="dob"
                    placeholder="Date of Birth"
                    min="1947-01-01"
                    max="2004-09-31"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group col-6">
                  <div>
                    <label htmlFor="gender">Gender</label>

                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input mt-3"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label class="form-check-label" for="inlineRadio1">
                        Male
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input mt-3"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label class="form-check-label" for="inlineRadio2">
                        Female
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input mt-3"
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label class="form-check-label" for="inlineRadio3">
                        Others
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Password"
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

                  <div className="form-group col-6">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error" style={{color: "red"}}>
                        {errors.confirm_password}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block mt-4 mb-4"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTrial;
