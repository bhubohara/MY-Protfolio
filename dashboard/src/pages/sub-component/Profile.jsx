import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-full p-6 bg-gray-50 dark:bg-gray-800">
        <div>
          <div className="grid w-full gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Profile
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Full Profile Preview
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Profile Image
                  </Label>
                  <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover"
                  />
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Resume
                  </Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
                  >
                    <img
                      src={user && user.resume && user.resume.url}
                      alt="resume"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.fullName}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Email
                  </Label>
                  <Input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Phone
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.phone}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    About Me
                  </Label>
                  <Textarea
                    defaultValue={user.aboutMe}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Portfolio URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.portfolioURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Github URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.githubURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    LinkedIn URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.linkedInURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Instagram URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.instagramURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Twitter(X) URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.twitterURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Facebook URL
                  </Label>
                  <Input
                    type="text"
                    defaultValue={user.facebookURL}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
