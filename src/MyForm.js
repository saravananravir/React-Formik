import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

const MyForm = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  // Google reCAPTCHA Site Key (replace with your own)
  const RECAPTCHA_SITE_KEY = "your-recaptcha-site-key";

  // Formik form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (!captchaValue) {
          alert("Please complete the reCAPTCHA");
          return;
        }

        console.log("Form data:", values);
        alert("Form submitted successfully");
        resetForm();
        setCaptchaValue(null); // Reset captcha
      }}
    >
      {() => (
        <Form>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" style={{ color: "red" }} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
          </div>

          <button type="submit" disabled={!captchaValue} style={{ marginTop: "20px" }}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
