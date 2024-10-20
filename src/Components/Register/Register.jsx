import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  let [type, setType] = useState({
    name: false,
    email: false,
    password: false,
    rePassword: false,
    phone: false,
  });

  let [errorMsg, setErrorMsg] = useState(""); // State for error messages

  let validationSchema = yup.object({
    name: yup
      .string()
      .matches(
        /^[A-Z][A-Za-z0-9_\s]{7,29}$/,
        "Username must start with a capital letter and be in the range of 8 to 29 characters."
      )
      .required(),
    email: yup
      .string()
      .matches(
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        "Invalid email format"
      )
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long."
      )
      .required(),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    phone: yup
      .string()
      .matches(
        /^\+?01[0125][0-9]{8}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required(),
  });

  const navigation = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      try {
        let response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (response.data.message === "success") {
          navigation("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMsg(
            "Email or Username already exists! Please try a different one."
          );
        } else {
          setErrorMsg("An unexpected error occurred. Please try again later.");
        }
      }
    },
  });

  function formSubmit(event) {
    formik.handleSubmit(event);
    setType({
      name: true,
      email: true,
      password: true,
      rePassword: true,
      phone: true,
    });
  }

  function inputChange(event) {
    setType({ ...type, [event.target.id]: true });
    formik.handleChange(event);
  }

  function isNotValid(value) {
    return formik.errors[value] && formik.touched[value] && type[value];
  }

  return (
      <section className="register">
      <div className="container py-5">
        <h2 className=" text-capitalize fw-normal">Register Now</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {/* Display error message */}
        <form className=" py-3" onSubmit={formSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                isNotValid("name") ? "is-invalid" : ""
              }`}
              id="name"
              placeholder="Username"
              onChange={inputChange}
            />
            <label htmlFor="name">Username</label>
            {isNotValid("name") && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                isNotValid("email") ? "is-invalid" : ""
              }`}
              id="email"
              placeholder="Email"
              onChange={inputChange}
            />
            <label htmlFor="email">Email</label>
            {isNotValid("email") && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                isNotValid("password") ? "is-invalid" : ""
              }`}
              id="password"
              placeholder="Password"
              onChange={inputChange}
            />
            <label htmlFor="password">Password</label>
            {isNotValid("password") && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                isNotValid("rePassword") ? "is-invalid" : ""
              }`}
              id="rePassword"
              placeholder="Re-enter Password"
              onChange={inputChange}
            />
            <label htmlFor="rePassword">Re-enter Password</label>
            {isNotValid("rePassword") && (
              <div className="invalid-feedback">{formik.errors.rePassword}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                isNotValid("phone") ? "is-invalid" : ""
              }`}
              id="phone"
              placeholder="Phone"
              onChange={inputChange}
            />
            <label htmlFor="phone">Phone</label>
            {isNotValid("phone") && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>

          <button
            type="submit"
            className={`btn text-capitalize d-block ms-auto`}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
