import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import SplashScreen from "../pages/SplashScreenPage";
import CreateAccountPage from "../pages/CreateAccountStep1";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<SplashScreen />} />
      <Route path="/create-account/step-1" element={<CreateAccountPage />} />
    </Routes>
  );
}
