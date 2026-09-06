import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { FoundationPage } from "../../features/foundation/FoundationPage";
import { NotFoundPage } from "../../features/misc/NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/foundation" replace />} />
        <Route path="/foundation" element={<FoundationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
