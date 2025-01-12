import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProject from "./pages/ManageProject";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slice/userSlice";
import Check from "./pages/check";
import "./App.css";
// import { Check } from "lucide-react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/skills" element={<ManageSkills />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/projects" element={<ManageProject />} />
          <Route path="/view/projects/:id" element={<ViewProject />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
        </Routes>
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </div>
  );
};

export default App;
