import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "https://my-protfolio-ghj2.onrender.com/api/v1/timeline/getTimeline",
        { withCredentials: true }
      );
      setTimeline(data.timeline);
    };
    getMyTimeline();
  }, []);
  return (
    <div className="px-5 py-10 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Timeline
        </h1>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {timeline &&
            timeline.map((element, index) => (
              <li className="mb-10 ml-6" key={element._id}>
                <div
                  className={`absolute w-6 h-6 ${
                    index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                  } rounded-full -left-3 flex items-center justify-center ring-4 ring-white dark:ring-gray-900`}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.93 4.91-4.48 4.48-1.77-1.77a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06z" />
                  </svg>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h3>
                <time className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {element.timeline.from} -{" "}
                  {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {element.description}
                </p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
