import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import SplashScreenPage from "../pages/Auth/SplashScreenPage";
import CreateAccountStep1 from "../pages/Auth/CreateAccountStep1";
import CreateAccountStep2 from "../pages/Auth/CreateAccountStep2";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<SplashScreenPage />} />
      <Route path="/create-account/step-1" element={<CreateAccountStep1 />} />
      <Route path="/create-account/step-2" element={<CreateAccountStep2 />} />
    </Routes>
  );
}
