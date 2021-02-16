import { useState } from "react";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import RegistrationImg from "../assets/authentication.svg";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { signUp } = useAuth();

  const userRef = firebase.database().ref("users");

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 8-20 characters")
      .required("You have to enter password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm your password"),
  });

  return (
    <div className="flex flex-col-reverse p-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:py-2 lg:px-5 lg:bg-white lg:w-10/12 lg:justify-items-center lg:items-center  lg:mt-3  lg:m-auto shadow-xl rounded-md">
      <div className="mb-4 w-full flex flex-col justify-center items-center">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 py-2 px-5 my-3 w-full">
            {errorMessage}
          </div>
        )}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, onSubmitProps) => {
            try {
              setErrorMessage("");
              await signUp(values.email, values.password);
              let userData = { ...values, id: uuidv4() };
              await userRef.push(userData);
              history.push("/");
            } catch {
              setErrorMessage("Failed to Sign Up");
            }
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
          }}
        >
          {(formik) => (
            <Form className="w-full px-2">
              <div>
                <InputField label="First Name" name="firstName" type="text" />
                <InputField label="Last Name" name="lastName" type="text" />
                <InputField label="Email" name="email" type="email" />
                <InputField label="Password" name="password" type="password" />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
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
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <p>
            Already Have an Account?{" "}
            <Link
              className="text-indigo-700 underline cursor-pointer"
              to="/signIn"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 border-double pb-4 mb-4 lg:col-span-2 lg:border-none">
        <h2 className="text-3xl mb-4 lg:text-right lg:mt-3 lg:text-gray-600">
          Bari Chai
        </h2>
        <img
          src={RegistrationImg}
          alt="registration"
          className="my-2  lg:p-10"
        />
      </div>
    </div>
  );
};
export default SignUp;
