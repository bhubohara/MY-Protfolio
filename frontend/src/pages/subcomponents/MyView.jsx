import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import { getUserForPortfolio } from "../store/slice";

const MyView = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user); // Accessing user from Redux state

  useEffect(() => {
    dispatch(getUserForPortfolio()); // Corrected action name
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if there's any
  }

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 animate__animated animate__fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p className="text-gray-600">Online</p>
      </div>

      {/* Introduction Section */}
      <div className="text-center mb-8 animate__animated animate__fadeInUp animate__delay-1s">
        <h1 className="text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] font-bold text-gray-600">
          Hey, I'm BHUPENDRA BOHARA
        </h1>
        <h1 className="text-tubeLight-effect text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] overflow-hidden whitespace-nowrap">
          <Typewriter
            words={[
              "FULL-STACK DEVELOPER",
              "IT SUPPORT ENGINEER",
              "FREELANCER",
            ]}
            loop={50}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </div>

      {/* Social Links Section */}
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mx-auto mt-4 md:mt-8 lg:mt-10 animate__animated animate__fadeInUp animate__delay-1.5s">
        <Link
          to={user?.instagramURL}
          target="_blank"
          className="hover:text-pink-500 transition-all transform hover:scale-110"
        >
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link
          to={user?.twitterURL}
          target="_blank"
          className="hover:text-blue-800 transition-all transform hover:scale-110"
        >
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
        <Link
          to={user?.linkedInURL}
          target="_blank"
          className="hover:text-sky-500 transition-all transform hover:scale-110"
        >
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link
          to={user?.githubURL}
          target="_blank"
          className="hover:text-gray-700 transition-all transform hover:scale-110"
        >
          <Github className="text-gray-700 w-7 h-7" />
        </Link>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-8 md:mt-12 lg:mt-16 flex gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
        <Link to={user?.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row py-2 px-4 transition-all hover:bg-gray-200 transform hover:scale-110">
            <Github className="w-6 h-6" />
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user?.linkedInURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row py-2 px-4 transition-all hover:bg-gray-200 transform hover:scale-110">
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn </span>
          </Button>
        </Link>
        <Link to={user?.resume?.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row py-2 px-4 transition-all hover:bg-gray-200 transform hover:scale-110">
            <ExternalLink className="w-6 h-6" />
            <span>Resume</span>
          </Button>
        </Link>
      </div>

      {/* About Me Section */}
      <div className="mt-12 animate__animated animate__fadeInUp animate__delay-2.5s">
        <p className="text-xl tracking-[2px] leading-relaxed ">
          {user?.aboutMe}
        </p>
      </div>

      <hr className="my-8 md:my-10" />
    </div>
  );
};

export default MyView;
