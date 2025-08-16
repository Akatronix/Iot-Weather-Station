import { useState } from "react";
import logo from "../assets/logo.jpg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [myFormData, setMyFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const { email, password } = myFormData;
    if (!email || !password) return toast("All fields are required !");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myFormData),
        }
      );

      console.log(response);

      if (!response.ok) {
        toast("Login Failed!");

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMyFormData({ email: "", password: "" });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Login Successfully...");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging-in:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Something Went Wrong!, While Loggin-In");
      return null;
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-4 md:px-0">
        <div className="w-full flex items-center justify-start gap-2.5">
          <img
            src={logo}
            alt="company logo"
            className="md:w-[50px] md:h-[50px] w-[36px] h-[36px] rounded-md border-2"
          />
          <h1 className="md:text-3xl font-bold text-lg text-[#333]">Login</h1>
        </div>
        <h1 className="md:text-md font-normal text-base text-[#333] mb-4 text-nowrap">
          Iot Temperature Control System
        </h1>
        <form onSubmit={handleLoginRequest}>
          <div>
            <label htmlFor="email" className="text-[#333]">
              Email
            </label>
            <br />
            <input
              value={myFormData.email}
              required
              onChange={(e) =>
                setMyFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="xyz@emaple.com"
              id="email"
              className="
              md:w-[400px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[#333]">
              Password
            </label>
            <br />
            <input
              required
              value={myFormData.password}
              onChange={(e) =>
                setMyFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              className="
              md:w-[400px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
            />
          </div>
          <button
            type="submit"
            className="md:w-[400px] w-full py-3 px-6 border-none  outline-none rounded-md my-3 bg-blue-400 hover:bg-blue-500 hover:cursor-pointer text-white"
          >
            {isLoading ? <>Loading...</> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
