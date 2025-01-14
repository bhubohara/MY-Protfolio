import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://my-protfolio-ghj2.onrender.com/api/v1/projects/get",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div className="overflow-hidden bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-5 lg:px-20">
        {/* Heading Section */}
        <div className="relative mb-10">
          {/* For larger screens */}
          <h1 className="hidden sm:flex gap-3 items-center text-[2.5rem] sm:text-[3.5rem] md:text-[3rem] lg:text-[4rem] leading-[60px] lg:leading-[90px] tracking-wide mx-auto w-fit font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 hover:text-teal-300 transition-all duration-500 ease-in-out">
            MY{" "}
            <span className="font-extrabold text-shadow-md text-indigo-700">
              PORTFOLIO
            </span>
          </h1>

          {/* For smaller screens */}
          <h1 className="block text-center text-[2rem] sm:text-[2.5rem] md:text-[1.8rem] lg:text-[2.2rem] leading-tight tracking-wide mx-auto font-semibold text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-clip bg-clip-text shadow-lg transition-all duration-300">
            MY <span className="text-gray-800 dark:text-gray-100">WORK</span>
          </h1>
        </div>

        {/* Portfolio Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 md:p-10">
          {viewAll
            ? projects &&
              projects.map((element) => (
                <Link
                  to={`/project/${element._id}`}
                  key={element._id}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  {/* Image */}
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full h-72 object-cover rounded-t-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-t-xl"></div>

                  {/* Title and Description */}
                  <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
                      {element.title}
                    </h3>
                  </div>
                </Link>
              ))
            : projects &&
              projects.slice(0, 9).map((element) => (
                <Link
                  to={`/project/${element._id}`}
                  key={element._id}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  {/* Image */}
                  <img
                    src={element.projectBanner && element.projectBanner.url}
                    alt={element.title}
                    className="w-full h-72 object-cover rounded-t-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-t-xl"></div>

                  {/* Title and Description */}
                  <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
                      {element.title}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>

        {/* Show More / Show Less Button */}
        {projects && projects.length > 9 && (
          <div className="w-full text-center my-9">
            <Button
              className="w-52 py-2 px-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg font-bold shadow-md hover:from-teal-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
