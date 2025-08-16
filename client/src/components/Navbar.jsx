import logo from "../assets/logo.jpg";
import { Link } from "react-router";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="h-full w-[50px] md:w-[80px] bg-slate-500 py-3  mr-2 flex flex-col justify-between">
      <Link to="/">
        <div className="w-full flex items-center justify-center">
          <img
            src={logo}
            alt="company logo"
            className="md:w-[50px] md:h-[50px] w-[30px] h-[30px] rounded-md"
          />
        </div>
      </Link>
      <div
        onClick={() => {
          localStorage.removeItem("token");
        }}
        className="text-center text-white flex items-center justify-center hover:text-red-500 cursor-pointer text-2xl mb-[20px]"
      >
        <RiLogoutCircleRLine />
      </div>
    </div>
  );
};

export default Navbar;
