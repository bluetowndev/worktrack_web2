import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Header from './compnents/Header';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from './compnents/Footer';
import Dashboard from "./pages/UserDashboard";
import Camera from './compnents/Camera';
import DashboardComponents from "./pages/DashboardComponents"
import AdminDashboard from './pages/AdminDashboard';
import EmailVerification from './pages/EmailVerification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
         {/* <Header></Header>  */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/camera" element={<Camera />}/>
            <Route path="/DashboardComponents" element={<DashboardComponents />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/verify-email" element={<EmailVerification/>}/>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;