import { useState } from "react";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
  });

  return (
    <div>
      {errorMessage && <div className="alert">{errorMessage}</div>}
      {message && <div>{message}</div>}
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, onSubmitProps) => {
          try {
            setErrorMessage("");
            setMessage("");
            await resetPassword(values.email);
            setMessage("Check you inbox to reset password");
          } catch {
            setErrorMessage("Email not found");
          }
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <div>
              <InputField label="Email" name="email" type="email" />
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/signIn">Sign In</Link>
      </div>
      <div>
        <p>
          Need an Account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
