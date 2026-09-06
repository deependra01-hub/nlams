import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { NationalDashboardPage } from "../../features/dashboard/NationalDashboardPage";
import { NotFoundPage } from "./NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<NationalDashboardPage />} />
        <Route path="/foundation" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
