import InputField from "./InputField";
import {Form, Formik} from "formik"
import * as Yup from "yup";
import {useAuth} from "../context/AuthContext"

const SignUp = () => {
    const {signUp} = useAuth()

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must be 8-20 characters')
            .required('You have to enter password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm your password'),
    })

    return (
        <div>
            <Formik
                initialValues={
                    {
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                validationSchema={validationSchema}
                onSubmit={async (values, onSubmitProps) => {
                    signUp(values.email, values.password)
                    onSubmitProps.setSubmitting(false)
                    onSubmitProps.resetForm()
                }}
            >
                {formik => (
                    <Form>
                        <div>
                            <InputField label="First Name" name="firstName"
                                        type="text"/>
                            <InputField label="Last Name" name="lastName"
                                        type="text"/>
                            <InputField label="Email" name="email"
                                        type="email"/>
                            <InputField label="Password" name="password"
                                        type="password"/>
                            <InputField label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"/>
                            <button
                                disabled={!formik.isValid || formik.isSubmitting}
                                type="submit">Sign Up
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default SignUp;

