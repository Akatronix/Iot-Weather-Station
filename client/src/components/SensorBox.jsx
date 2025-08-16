import { useState } from "react";
import { toast } from "sonner";

const SensorBox = () => {
  const [value, setValue] = useState("");
  const [lowerValue, setLowValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();

    if (!Number(value.trim())) return toast("please enter a number");
    if (!Number(lowerValue.trim())) return toast("please enter a number");

    if (!value || !lowerValue) return toast("fields are required !");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/control/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "68a02a16df1659b5e4463445",
            setTemp: Number(value.trim() || 0),
            lowerValue: Number(lowerValue.trim() || 0),
          }),
        }
      );

      if (!response.ok) {
        toast("Login Failed!");

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setValue("");
      setLowValue("");
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Temperature Level Updated Successfully!");
    } catch (error) {
      console.error("Error logging-in:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Something Went Wrong!");
      return null;
    }
  };

  return (
    <div className="flex-1 rounded-md py-7 md:py-[50px] px-6 my-3 md:my-0 text-black w-full h-full bg-white">
      <div className="flex items-center justify-between gap-4 flex-wrap md:pr-[100px] pr-0 md:pl-[20px] pl-0">
        {isLoading && <p className="text-gray-400">Loading....</p>}

        <form onSubmit={handleRequest}>
          <p>Set Temperature Level</p>
          <div>
            <input
              type="text"
              placeholder="60"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="md:w-[420px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3 mr-2"
            />
            <input
              type="text"
              placeholder="23"
              value={lowerValue}
              onChange={(e) => setLowValue(e.target.value)}
              className="md:w-[420px] text-[#333] w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3 mr-2"
            />
            <br />
            <button className="py-3 px-6 border-none  outline-none rounded-md my-3 bg-red-400 hover:bg-red-500 hover:cursor-pointer text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SensorBox;
