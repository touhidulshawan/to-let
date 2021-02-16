import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="form-control">
      <label className="block mb-2 text-lg w-full ml-1" htmlFor={field.name}>
        {label}
      </label>
      <input
        className="bg-gray-800 text-gray-200 w-full py-2 px-4 rounded-sm mb-2"
        autoComplete="off"
        {...field}
        {...props}
      />
      <ErrorMessage
        className="my-2 bg-red-100 py-1 px-1 text-red-700 rounded"
        name={field.name}
        component="div"
      />
    </div>
  );
};
export default InputField;
