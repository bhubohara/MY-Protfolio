import { clearAllUserErrors, logout } from "@/store/slice/userSlice";
import Typewriter from "typewriter-effect";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  FolderCode,
  FolderGit,
  Home,
  LayoutGrid,
  LucideLayoutGrid,
  MessageSquareText,
  SquareChartGantt,
  User,
  LogOut,
  PencilRulerIcon,
  Moon,
  Sun,
  CircleUserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "./sub-component/Dashboard";
import AddProject from "./sub-component/AddProject";
import AddSkill from "./sub-component/AddSkill";
import AddTimeline from "./sub-component/AddTimeline";
import Account from "./sub-component/Account";
import Message from "./sub-component/Message";
import SoftwareApplication from "./sub-component/AddSoftwareApplications";
import "../App.css";
import Contact from "./sub-component/Contact";

const Homepage = () => {
  const [active, setActive] = useState("Dashboard");
  const [isNightMode, setIsNightMode] = useState(false);
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigateTo("/login");
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  // Check local storage for theme preference on initial load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsNightMode(storedTheme === "dark");
    }
  }, []);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    const theme = !isNightMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
  };

  return (
    <div
      id="homePage"
      className={`flex min-h-screen w-full flex-col ${
        isNightMode ? "bg-black text-white" : "bg-muted/40 text-black"
      }`}
    >
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-7">
          <Link className="group flex items-center justify-center gap-2 rounded-full">
            <img
              src={user?.avatar?.url || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full transition-all group-hover:scale-110"
            />
            <span className="sr-only">Profile</span>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-white bg-blue-600"
                      : "text-muted-foreground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="w-5 h-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add similar Tooltip components for other navigation links */}
          {/* ... */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Project"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="w-5 h-5" />
                  <span className="sr-only">Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Skill"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Add Skill")}
                >
                  <LucideLayoutGrid className="w-5 h-5" />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Timeline"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <SquareChartGantt className="w-5 h-5" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Software Application"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Add Software Application")}
                >
                  <FolderCode className="w-5 h-5" />
                  <span className="sr-only">Add Software</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Software</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Message"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Message")}
                >
                  <MessageSquareText className="w-5 h-5" />
                  <span className="sr-only">Message</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Message</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Contact"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Contact")}
                >
                  <CircleUserRound className="w-5 h-5" />
                  <span className="sr-only">Contact</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Contact</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Account"
                      ? "text-white bg-blue-600"
                      : "text-muted-forground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={() => setActive("Account")}
                >
                  <User className="w-5 h-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg py-6 ${
                    active === "Logout"
                      ? "text-white bg-blue-600"
                      : "text-muted-foreground hover:text-white hover:bg-blue-500"
                  } transition-color md:h-8 md:w-8`}
                  onClick={handleLogOut}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-30 flex flex-col h-14 sm:h-auto border-b bg-white-500 px-4 sm:static sm:border-0 sm:bg-white-500 sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="flex flex-col gap-6 text-lg font-medium flex-grow">
              <Link
                className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
              >
                <img
                  src={user?.avatar?.url || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full transition-all group-hover:scale-110"
                />
              </Link>

              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Dashboard"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              {/* Add similar links for other pages */}
              {/* ... */}

              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Project"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Add Project")}
              >
                <FolderGit className="h-5 w-5" />
                Add Project
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Skill"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Add Skill")}
              >
                <PencilRulerIcon className="h-5 w-5" />
                Add Skill
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Timeline"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Add Timeline")}
              >
                <SquareChartGantt className="h-5 w-5" />
                Add Timeline
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Software Application"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Add Software Application")}
              >
                <FolderCode className="h-5 w-5" /> Add Software
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Message"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Message")}
              >
                <MessageSquareText className="h-5 w-5" />
                Message
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Contact"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Contact")}
              >
                <CircleUserRound className="h-5 w-5" />
                Contact
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Account"
                    ? "text-white bg-blue-600"
                    : "text-muted-foreground hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActive("Account")}
              >
                <User className="h-5 w-5" />
                Account
              </Link>

              <footer>
                <button
                  className={`flex items-center gap-4 px-5 py-6 ${
                    active === "Logout"
                      ? "text-white bg-blue-600"
                      : "text-muted-foreground hover:text-white hover:bg-blue-500"
                  }`}
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </footer>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full max-[900px]:hidden"
          />
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#2c3e50",
            }}
          >
            <Typewriter
              options={{
                strings: ["Welcome back", `${user?.fullName}`],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </div>

          {/* Dark/Light Mode Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggleNightMode}
              className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-4"
            >
              {isNightMode ? (
                <>
                  <Sun className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-4">
          {active === "Dashboard" && <Dashboard />}
          {active === "Add Project" && <AddProject />}
          {active === "Add Skill" && <AddSkill />}
          {active === "Add Timeline" && <AddTimeline />}
          {active === "Add Software Application" && <SoftwareApplication />}
          {active === "Message" && <Message />}
          {active === "Contact" && <Contact />}
          {active === "Account" && <Account />}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
