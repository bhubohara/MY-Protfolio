import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/software/getSoftware",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 
            text-[2rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[3rem] font-extrabold mx-auto 
            w-fit tracking-wide leading-[1.2] transform transition-all duration-300 ease-in-out 
            hover:scale-105 hover:text-blue-400 relative"
      >
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[20%] h-[3px] bg-blue-600"></span>
        SOFTWARE USE
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[20%] h-[2px] bg-blue-600"></span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
        {apps &&
          apps.map((element) => {
            return (
              <Card
                className="transition-transform transform hover:scale-105 hover:shadow-xl p-7 flex flex-col justify-center items-center gap-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                key={element._id}
              >
                <img
                  src={element.svgImg && element.svgImg.url}
                  alt={element.name}
                  className="h-16 sm:h-24 w-auto transition-transform transform hover:scale-110"
                />
                <p className="text-white text-center font-semibold text-lg mt-4">
                  {element.name}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
