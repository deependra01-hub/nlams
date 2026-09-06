import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { NationalDashboard } from "../pages/dashboard/NationalDashboard";
import { NotFound } from "./NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<NationalDashboard />} />
        <Route path="/foundation" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
