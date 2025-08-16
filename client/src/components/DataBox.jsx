import { Underline } from "lucide-react";
import { FaTemperatureLow } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";

const DataBox = ({ data }) => {
  const { Temp, Humidity, Buzzer } = data;

  return (
    <div className="flex-1 rounded-md  px-6 my-3 md:my-0 text-black w-full h-full py-7 md:py-[30px] bg-white">
      <div className="flex items-center justify-between gap-4 md:gap-0  flex-wrap md:pr-[100px] pr-0 md:pl-[20px] pl-0">
        <div>
          <p>
            <FaTemperatureLow
              className={`${
                Number(Temp) > 36 ? "text-red-400 " : "text-blue-400"
              } text-3xl mb-1.5`}
            />
            <span className="text-gray-400">Temperature</span>
          </p>
          <p className="md:text-4xl text-lg font-bold">
            {Temp == undefined ? 0 : Temp} °C
          </p>
          <p className="text-gray-400 my-[10px]">
            Buzzer: {Buzzer == undefined ? 0 : Buzzer}
          </p>
        </div>
        <div>
          <div>
            <IoWaterSharp className="text-3xl text-teal-300" />
            <p className="text-gray-400">Humidity</p>
            <p className="md:text-4xl text-lg font-bold">
              {Humidity == Underline ? 0 : Humidity} %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBox;
