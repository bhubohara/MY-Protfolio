import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/get",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-12 px-4 sm:px-8">
      <h1
        className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 
            text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[2.5rem] 
            font-extrabold mx-auto w-fit tracking-wide leading-[1.2] 
            transition-all ease-in-out duration-300 transform hover:text-pink-400 hover:scale-105"
      >
        SKILLS
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills &&
          skills.map((element) => {
            return (
              <Card
                className="relative h-fit p-5 flex flex-col justify-center items-center gap-4 
              transform transition-all hover:scale-105 hover:shadow-2xl 
              rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              hover:bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 
              hover:text-white hover:ring-4 ring-indigo-500"
                key={element._id}
              >
                {/* Skill Icon */}
                <div className="h-20 w-20 sm:h-24 sm:w-24 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-md transition-all transform hover:rotate-6 hover:scale-110">
                  <img
                    src={element.svg && element.svg.url}
                    alt="skill"
                    className="h-12 sm:h-20 w-auto transition-all"
                  />
                </div>

                {/* Skill Title */}
                <p className="text-center font-semibold text-lg transition-all text-gray-800 dark:text-gray-200">
                  {element.title}
                </p>

                {/* Skill Proficiency */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-md hover:scale-110">
                  Proficiency: {element.proficiency || "N/A"}
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
