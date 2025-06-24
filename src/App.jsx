import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, setUser } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import AuthRoute from "./components/fragments/AuthRoute";
import Companies from "./pages/recruiter/Companies";
import CreateCompany from "./pages/recruiter/CreateCompany";
import CompanySetup from "./pages/recruiter/CompanySetup";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import CreateJob from "./pages/recruiter/CreateJob";
import Applicants from "./pages/recruiter/Applicants";
import ProtectedProfileUser from "./components/fragments/ProtectedProfileUser";
import ProtectedUserRoute from "./components/fragments/ProtectedUserRoute";
import ProtectedRecruiterRoute from "./components/fragments/ProtectedRecruiterRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          {/* user */}
          <Route
            path="/"
            element={
              <ProtectedUserRoute>
                <Home />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/all-jobs"
            element={
              <ProtectedUserRoute>
                <Jobs />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/browse"
            element={
              <ProtectedUserRoute>
                <Browse />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedProfileUser>
                <Profile />
              </ProtectedProfileUser>
            }
          />
          <Route
            path="/job-details/:id"
            element={
              <ProtectedUserRoute>
                <JobDetails />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/jobs/saved"
            element={
              <ProtectedUserRoute>
                <JobDetails />
              </ProtectedUserRoute>
            }
          />
          {/* recruiter */}
          <Route
            path="/recruiter/companies"
            element={
              <ProtectedRecruiterRoute>
                <Companies />
              </ProtectedRecruiterRoute>
            }
          />
          <Route
            path="/recruiter/companies/create"
            element={
              <ProtectedRecruiterRoute>
                <CreateCompany />
              </ProtectedRecruiterRoute>
            }
          />
          <Route
            path="/recruiter/companies/:id"
            element={
              <ProtectedRecruiterRoute>
                <CompanySetup />
              </ProtectedRecruiterRoute>
            }
          />
          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRecruiterRoute>
                <RecruiterJobs />
              </ProtectedRecruiterRoute>
            }
          />
          <Route
            path="/recruiter/jobs/create"
            element={
              <ProtectedRecruiterRoute>
                <CreateJob />
              </ProtectedRecruiterRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:id/applicants"
            element={
              <ProtectedRecruiterRoute>
                <Applicants />
              </ProtectedRecruiterRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
