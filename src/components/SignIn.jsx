import { useState } from "react";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { signIn } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 8-20 characters")
      .required("You have to enter password"),
  });

  return (
    <div>
      {errorMessage && <div className="alert">{errorMessage}</div>}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, onSubmitProps) => {
          try {
            setErrorMessage("");
            await signIn(values.email, values.password);
            history.push("/");
          } catch {
            setErrorMessage("Failed to Sign In");
          }
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <div>
              <InputField label="Email" name="email" type="email" />
              <InputField label="Password" name="password" type="password" />
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </div>
      <div>
        <p>
          Need an Account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
