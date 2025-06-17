import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import SplashScreenPage from "../pages/Auth/SplashScreenPage";
import CreateAccountStep1 from "../pages/Auth/CreateAccountStep1";
import CreateAccountStep2 from "../pages/Auth/CreateAccountStep2";
import DepositFundsPage from "../pages/Auth/DepositFundsPage";
import TokenPage from "../pages/Tokenpage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<SplashScreenPage />} />
      {/* auth flow */}
      <Route path="/create-account/step-1" element={<CreateAccountStep1 />} />
      <Route path="/create-account/step-2" element={<CreateAccountStep2 />} />
      <Route path="/create-account/step-3" element={<DepositFundsPage />} />
      {/* home screen  */}
      <Route path="/token" element={<TokenPage />} />
    </Routes>
  );
}
