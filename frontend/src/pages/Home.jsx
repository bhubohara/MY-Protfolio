import React from "react";
import MyView from "./subcomponents/MyView";
import About from "./subcomponents/About";
import Contact from "./subcomponents/Contact";
import Skills from "./subcomponents/Skills";
import Timeline from "./subcomponents/Timeline";
import ProjectView from "./ProjectView";
import MyApps from "./subcomponents/MyApp";
import Portfolio from "./subcomponents/Protfolio";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="w-full bg-gray-100 sticky top-0 z-50">
        <nav className="px-9  sm:px-10 lg:px-60 py-4 mx-auto w-full max-w-[1400px] flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          {/* Each nav item */}
          <button
            className="px-8 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("my-view")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Bhu
          </button>
          <button
            className="px-3 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("portfolio")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Portfolio
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("skills")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Skills
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("timeline")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Timeline
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-blue-600 rounded transition-all duration-200"
            onClick={() =>
              document
                .getElementById("my-apps")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Soft Use
          </button>
        </nav>

        <article className="mt-12 mx-auto w-full max-w-[1400px] flex flex-col gap-12 sm:gap-16 lg:gap-20">
          <section id="my-view">
            <MyView />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <section id="portfolio">
            <Portfolio />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="timeline">
            <Timeline />
          </section>
          <section id="my-apps">
            <MyApps />
          </section>
        </article>
        <footer className="w-full bg-gray-100 sticky top-0 z-50">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
