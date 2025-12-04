import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import OTPPage from "./pages/otp";
import Home from "./pages/home";
import "../src/index.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
