import React, { useEffect, useState } from "react";
import DataBox from "../components/DataBox";
import SensorBox from "../components/SensorBox";
import getData from "@/utils/getData";
import validateToken from "@/utils/isTokenExpired";
import { useNavigate } from "react-router";

const Homepage = () => {
  const [sensor, setSonsor] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(async () => {
      const isValid = validateToken();
      if (!isValid) {
        navigate("/auth/login", { replace: true });
        return;
      }

      const data = await getData();
      if (!data) {
        setError("Error: failed to fetch data");
        return;
      }
      setSonsor(data.sensor[0]);

      error &&
        setTimeout(() => {
          setError("");
        }, 1000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className=" w-full h-[90vh] ">
        <p className="mb-3 text-red-500">{error}</p>
        <div className="md:flex items-start justify-between gap-2 w-full flex-wrap ">
          <DataBox data={sensor} />
          <SensorBox />
        </div>
      </div>
    </>
  );
};

export default Homepage;
