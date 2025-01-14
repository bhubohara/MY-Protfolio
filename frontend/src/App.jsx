import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ProjectView from "./pages/ProjectView";
import { ModeToggle } from "./components/mode-toggle";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        {/* <footer className="w-full bg-gray-100 sticky top-0 z-50"> */}
        <Footer />
        {/* </footer> */}
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
