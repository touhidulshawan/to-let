import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="form-control">
      <label htmlFor={field.name}>{label}</label>
      <input autoComplete="off" {...field} {...props} />
      <ErrorMessage name={field.name} component="div" />
    </div>
  );
};
export default InputField;
