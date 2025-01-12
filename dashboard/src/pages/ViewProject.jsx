import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `https://my-protfolio-ghj2.onrender.com/api/v1/projects/getsingle/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <>
      <div className="flex mt-8 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 bg-gray-100">
        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 px-5 pb-5 bg-white shadow-xl rounded-lg">
          <div className="space-y-8">
            <div className="border-b border-gray-300 pb-8">
              <div className="flex justify-end mb-4">
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>

              <div className="mt-8">
                {/* Project Title and Banner */}
                <div className="w-full sm:col-span-4 mb-6">
                  <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                    {title}
                  </h1>
                  <img
                    src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
                    alt="projectBanner"
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                  />
                </div>

                {/* Project Description */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Description:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {descriptionList.map((item, index) => (
                      <li key={index} className="text-lg text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Technologies */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Technologies:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    {technologiesList.map((item, index) => (
                      <li key={index} className="text-lg text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Stack */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Stack:
                  </p>
                  <p className="text-lg text-gray-600">{stack}</p>
                </div>

                {/* Project Deployment Status */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Deployed:
                  </p>
                  <p className="text-lg text-gray-600">{deployed}</p>
                </div>

                {/* GitHub Repository Link */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Github Repository Link:
                  </p>
                  <Link
                    className="text-sky-700 hover:underline text-lg transition-colors duration-200"
                    target="_blank"
                    to={gitRepoLink}
                  >
                    {gitRepoLink}
                  </Link>
                </div>

                {/* Project Link */}
                <div className="w-full sm:col-span-4 mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-3">
                    Project Link:
                  </p>
                  <Link
                    className="text-sky-700 hover:underline text-lg transition-colors duration-200"
                    target="_blank"
                    to={projectLink}
                  >
                    {projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
