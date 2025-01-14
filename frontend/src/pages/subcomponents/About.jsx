import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserForPortfolio } from "../store/slice";
import axios from "axios";

const About = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    // const getContact = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       "http://localhost:4000/api/v1/contacts/getcontact",
    //       { withCredentials: true }
    //     );
    //     setContactDetails(data.contact); // Update the state with fetched data
    //     console.log("Fetched Contact Details:", data.contact); // Log the fetched data
    //   } catch (error) {
    //     console.error("Error fetching contact details:", error);
    //   }
    // };

    dispatch(getUserForPortfolio()); // Dispatch action to get user for portfolio
    // getContact(); // Fetch contact details
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );
  }

  return (
    <section className="w-full flex flex-col bg-transparent px-4 py-12 md:py-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text tracking-tight">
          ABOUT <span className="text-yellow-300">ME</span>
        </h1>
        <div className="w-16 h-1 bg-yellow-300 mx-auto mt-4"></div>
      </div>

      {/* Subtext Section */}
      <div className="text-center mb-12">
        <p className="text-lg sm:text-xl text-gray-600 font-medium">
          Know me more about my journey and passion.
        </p>
      </div>

      {/* Avatar and About Me Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mx-4 md:mx-16">
        {/* Avatar Section */}
        <div className="flex justify-center items-center">
          <img
            src={user?.avatar?.url || "default-avatar.jpg"}
            alt="avatar"
            className="rounded-full border-2 border-white shadow-xl w-[700px] sm:w-[300px] md:w-[350px] h-[400px] transition-transform transform hover:scale-105 duration-300"
          />
        </div>

        {/* About Me Content Section */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            A passionate full-stack developer with a diverse background in IT
            support, customer service, and web development, I bring a unique
            blend of technical expertise and strong interpersonal skills. My
            journey began with a curiosity for how websites and applications are
            built, leading me to gain hands-on experience in both frontend and
            backend development. I also specialize in WordPress, creating
            user-friendly, customizable websites. With over a year of IT support
            and customer service experience, I am adept at troubleshooting,
            delivering client-focused solutions, and bridging the gap between
            technical teams and users. I am committed to solving problems and
            enhancing user experiences through effective, impactful solutions.
          </p>
          <p className="text-lg text-gray-500">
            I am passionate about solving problems through technology and
            creative solutions. My expertise lies in both the backend and
            frontend development, making me a versatile and driven professional.
          </p>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="text-center mt-12">
        <p className="text-xl text-gray-600">
          With a strong dedication to timely project delivery, I ensure the
          highest quality of work, ready to face any challenges ahead.
        </p>
      </div>
    </section>
  );
};

export default About;
