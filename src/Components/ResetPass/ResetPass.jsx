import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resetPass.css";

function ResetPass() {
  let navigate = useNavigate();
  let [codeSent, setCodeSent] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [isCodeVerified, setCodeVerified] = useState(false);

  let submitResetMail = async (values) => {
    setLoading(true); 
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      setLoading(false); 

      if (response.data.statusMsg === "success") {
        toast.success(response.data.message, {
          position: "top-right",
        });
        setCodeSent(true); 
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
      setCodeSent(false);
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),
  });

  let formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitResetMail,
  });

  async function verifyCode(values) {
    setLoading(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      setLoading(false);

      if (response.data.status === "Success") {
        toast.success(response.data.message, {
          position: "top-right",
        });
        setCodeVerified(true);
      }
    } catch (error) {
      setLoading(false); 
      toast.error(error.response?.data?.message || "Verification failed", {
        position: "top-right",
      });
    }
  }

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Reset code is required."),
  });

  let formikCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verifyCode,
  });

  let submitNewPassword = async (values) => {
    setLoading(true); 
    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      setLoading(false); 

      if (response.data.status === "Success") {
        toast.success("Password updated successfully", {
          position: "top-right",
        });
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  let validationSchema3 = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  let formikNewPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema3,
    onSubmit: submitNewPassword,
  });

  return (
    <section className="reset py-5">
      <ToastContainer />

      {!codeSent && !isCodeVerified && (
        <div className="container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}

          <h2 className="fw-normal mb-4 text-capitalize">Reset Password</h2>
          <form onSubmit={formikEmail.handleSubmit}>
            <label htmlFor="email" className="mb-1 ms-1">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              onChange={formikEmail.handleChange}
              onBlur={formikEmail.handleBlur}
            />
            {formikEmail.errors.email && formikEmail.touched.email ? (
              <div className="alert alert-danger z-3 py-2" role="alert">
                {formikEmail.errors.email}
              </div>
            ) : null}

            <button
              type="submit"
              className={`btn d-block ms-auto ${isLoading ? "disabled" : ""}`}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {codeSent && !isCodeVerified && (
        <div className="container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}

          <h2 className="fw-normal mb-4 text-capitalize">Verify Reset Code</h2>
          <form onSubmit={formikCode.handleSubmit}>
            <label htmlFor="resetCode" className="mb-1 ms-1">
              Reset code
            </label>
            <input
              type="text"
              id="resetCode"
              className="form-control mb-3"
              placeholder="Enter Reset Code"
              onChange={formikCode.handleChange}
              onBlur={formikCode.handleBlur}
            />
            {formikCode.errors.resetCode && formikCode.touched.resetCode ? (
              <div className="alert alert-danger z-3 py-2" role="alert">
                {formikCode.errors.resetCode}
              </div>
            ) : null}

            <button
              type="submit"
              className={`btn d-block ms-auto ${isLoading ? "disabled" : ""}`}
            >
              Verify
            </button>
          </form>
        </div>
      )}

      {isCodeVerified && (
        <div className="container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}

          <h2 className="fw-normal mb-4 text-capitalize">Enter New Password</h2>
          <form onSubmit={formikNewPass.handleSubmit}>
            <label htmlFor="email" className="mb-1 ms-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control mb-3"
              placeholder="Enter Your Email"
              onChange={formikNewPass.handleChange}
              onBlur={formikNewPass.handleBlur}
            />
            {formikNewPass.errors.email && formikNewPass.touched.email ? (
              <div className="alert alert-danger z-3 py-2" role="alert">
                {formikNewPass.errors.email}
              </div>
            ) : null}

            <label htmlFor="newPassword" className="mb-1 ms-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control mb-3"
              placeholder="Enter Your New Password"
              onChange={formikNewPass.handleChange}
              onBlur={formikNewPass.handleBlur}
            />
            {formikNewPass.errors.newPassword &&
            formikNewPass.touched.newPassword ? (
              <div className="alert alert-danger z-3 py-2" role="alert">
                {formikNewPass.errors.newPassword}
              </div>
            ) : null}

            <button
              type="submit"
              className={`btn d-block ms-auto ${isLoading ? "disabled" : ""}`}
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default ResetPass;
