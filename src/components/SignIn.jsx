import { useState } from "react";
import InputField from "./InputField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import HouseImage from "../assets/house_searching.svg";

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
    <div className="flex flex-col-reverse p-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:py-8 lg:px-5 lg:bg-white lg:w-10/12 lg:justify-items-center lg:items-center lg:mt-8  lg:m-auto shadow-xl rounded-md">
      <div className="mb-4 w-full flex flex-col justify-center items-center">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 py-2 px-5 my-3 w-full">
            {errorMessage}
          </div>
        )}
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
            <Form className="w-full px-2">
              <div>
                <InputField label="Email" name="email" type="email" />
                <InputField label="Password" name="password" type="password" />
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
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mb-1">
          <Link className="text-lg text-blue-500" to="/forgotPassword">
            Forgot Password?
          </Link>
        </div>
        <div>
          <p className="text-lg text-gray-700">
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
        <h2 className="text-3xl mb-4 lg:text-right">Bari Chai</h2>
        <img src={HouseImage} alt="House" className="my-2 lg:p-20" />
      </div>
    </div>
  );
};
export default SignIn;
