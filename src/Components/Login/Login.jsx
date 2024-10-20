import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function Login() {
  let [type, setType] = useState({
    email: false,
    password: false,
  });

  let [errorMsg, setErrorMsg] = useState(""); // State for error messages

  let validationSchema = yup.object({
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
      .required()
  });

  let navigation = useNavigate("");
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      try {
        let response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (response.status === 200) {
          navigation("/home")
       window.localStorage.setItem("user",response.data.token);
          window.localStorage.setItem("userName",response.data.user.name);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMsg(
            "Please try a different email. OR your pass is invalid"
          );
        }
      }
    },
  });

  function formSubmit(event) {
    formik.handleSubmit(event);
    setType({
      email: true,
      password: true,
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
        <h2 className=" text-capitalize fw-normal">Login Now</h2>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {/* Display error message */}
        <form className=" py-3" onSubmit={formSubmit}>
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
          <button
            type="submit"
            className={`btn text-capitalize d-block ms-auto`}
          >
            Login
          </button>
        </form>
        <p style={{fontSize: "18px" }}>
          Froget your password
          <Link
            to="/resetpass"
            type="submit"
            style={{ color: "green", fontSize: "18px",paddingLeft:"5px" }}
          >
            Reset
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
