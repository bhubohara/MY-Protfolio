import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/30 p-6 md:gap-8 sm:pl-20">
        <div className="mx-auto grid w-full max-w-6xl gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-6 text-base font-medium text-gray-700">
            <Link
              href="#"
              className={`py-2 px-4 rounded-lg transition-colors ${
                selectedComponent === "Profile"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setSelectedComponent("Profile")}
            >
              Profile
            </Link>
            <Link
              href="#"
              className={`py-2 px-4 rounded-lg transition-colors ${
                selectedComponent === "Update Profile"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setSelectedComponent("Update Profile")}
            >
              Update Profile
            </Link>
            <Link
              href="#"
              className={`py-2 px-4 rounded-lg transition-colors ${
                selectedComponent === "Update Password"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setSelectedComponent("Update Password")}
            >
              Update Password
            </Link>
          </nav>
          <div className="p-6 bg-white shadow rounded-lg">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                default:
                  return <Profile />;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
