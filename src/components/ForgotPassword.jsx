import { useState } from "react";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ForgotImg from "../assets/forgot_password.svg";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
  });

  return (
    <div className="flex flex-col-reverse p-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:py-1 lg:px-5 lg:bg-white lg:w-10/12 lg:justify-items-center lg:items-center  lg:mt-3 lg:m-auto shadow-xl rounded-md">
      <div className="mb-4 w-full flex flex-col justify-center items-center">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 py-2 px-5 my-3 w-full">
            {errorMessage}
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-700 py-2 px-5 my-3 w-full">
            {message}
          </div>
        )}
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
            <Form className="w-full px-2">
              <div>
                <InputField label="Email" name="email" type="email" />
                <button
                  disabled={!formik.isValid || formik.isSubmitting}
                  type="submit"
                  className={`  my-4 text-lg py-2 w-full px-6 uppercase tracking-wide focus:ring-offset-blue-500 ${
                    !formik.isValid || formik.isSubmitting
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    !formik.isValid || formik.isSubmitting
                      ? "bg-gray-300 text-gray-800"
                      : "bg-blue-500 text-blue-100"
                  }`}
                >
                  Reset Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <Link className="text-blue-600 text-lg uppercase" to="/signIn">
            Sign In
          </Link>
        </div>
        <div>
          <p>
            Need an Account?{" "}
            <Link
              className="text-indigo-700 underline cursor-pointer"
              to="/signUp"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 border-double pb-4 mb-4 lg:col-span-2 lg:border-none">
        <h2 className="text-3xl mb-4 lg:text-right lg:mt-3 lg:mr-2 lg:text-gray-600">
          Bari Chai
        </h2>
        <img src={ForgotImg} alt="registration" className="my-2 lg:p-1" />
      </div>
    </div>
  );
};
export default ForgotPassword;
