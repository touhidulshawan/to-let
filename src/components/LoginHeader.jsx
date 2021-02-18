import Banner from "../assets/house_searching.svg";
import Logo from "../assets/Logo.svg";
const LoginHeader = () => {
  return (
    <div>
      <div className="mt-3 px-4 w-full m-auto border-b-2 pb-6">
        <img src={Banner} alt="Banner" />
      </div>
      <div>
        <div className="flex items-center justify-center text-center mt-4">
          <img className="w-14 h-14 mr-3 ml-auto" src={Logo} alt="logo" />
          <h1 className="mr-auto text-3xl">Bari Chai</h1>
        </div>
      </div>
    </div>
  );
};
export default LoginHeader;
