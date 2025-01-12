import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const toastShown = useRef(false); // Flag to check if toast has been shown

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Update Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Profile Image
                  </Label>
                  <img
                    src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label className="text-gray-800 dark:text-gray-200">
                    Resume
                  </Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                      alt="resume"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={resumeHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Full Name
                </Label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="Your Full Name"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="Your Email Address"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Phone
                </Label>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="Phone Number"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  About Me
                </Label>
                <Textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="About Me"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Portfolio URL
                </Label>
                <Input
                  type="text"
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                  className="Portfolio URL"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  LinkedIn URL
                </Label>
                <Input
                  type="text"
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                  className="LinkedIn URL"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Github URL
                </Label>
                <Input
                  type="text"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                  className="Github URL"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Instagram URL
                </Label>
                <Input
                  type="text"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                  className="Instagram URL"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Twitter(X) URL
                </Label>
                <Input
                  type="text"
                  value={twitterURL}
                  onChange={(e) => setTwitterURL(e.target.value)}
                  className="Twitter(X) URL"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-800 dark:text-gray-200">
                  Facebook URL
                </Label>
                <Input
                  type="text"
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                  className="Facebook URL"
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
