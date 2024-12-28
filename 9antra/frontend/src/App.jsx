import "./App.css";
import ContactForm from "./components/ContactForm";
import CoursesSection from "./components/CoursesSection";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-white">
              <div className="navbar bg-white p-5">
                <div className="navbar-start">
                  <Link to="/">
                    <img src="/LogoBridge.png" alt="Logo" />
                  </Link>
                </div>

                <div className="navbar-end">
                  <Link to="/admin">
                    <button className="btn bg-custom-pink border-none rounded-full px-10 hover:bg-pink-700 text-white">
                      Admin
                    </button>
                  </Link>
                </div>
              </div>

              <div
                className="hero min-h-screen"
                style={{
                  backgroundImage:
                    "url(https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/408079670_729466782532544_3700533768543572988_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3Z3jA83rsgQQ7kNvgGpBIu4&_nc_zt=23&_nc_ht=scontent.ftun1-2.fna&_nc_gid=AbfY6mGn6mMBxRWvBPatLy8&oh=00_AYA7J5V_CZ0XrsU6B0S6bKhnAC_qgWOvFIi6IBBCGAnEWg&oe=677492A3)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                  <div className="bg-white bg-opacity-50 px-10 py-4">
                    <h1 className="mb-5 text-4xl font-bold text-black text-center">
                      Improve your skills on your own <br />
                      To prepare for a better future
                    </h1>

                    <button className="btn bg-custom-pink border-none rounded-full px-10 hover:bg-pink-700 text-white">
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
              <CoursesSection />
              <ContactForm />
            </div>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
