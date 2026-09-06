import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Login } from "../pages/auth/Login";
import { NationalDashboard } from "../pages/dashboard/NationalDashboard";
import { GISExplorer } from "../pages/gis/GISExplorer";
import { LandVerification } from "../pages/land/LandVerification";
import { ParcelDetails } from "../pages/land/ParcelDetails";
import { ParcelList } from "../pages/land/ParcelList";
import { ProjectDetails } from "../pages/projects/ProjectDetails";
import { ProjectList } from "../pages/projects/ProjectList";
import { NotFound } from "./NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { Unauthorized } from "../pages/auth/Unauthorized";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer"]}>
                <NationalDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <RoleRoute
                allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer"]}
              >
                <ProjectList />
              </RoleRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <RoleRoute
                allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer"]}
              >
                <ProjectDetails />
              </RoleRoute>
            }
          />
          <Route
            path="/parcels"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "field_officer"]}>
                <ParcelList />
              </RoleRoute>
            }
          />
          <Route
            path="/parcels/:parcelId"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "field_officer"]}>
                <ParcelDetails />
              </RoleRoute>
            }
          />
          <Route
            path="/land-verification"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "field_officer"]}>
                <LandVerification />
              </RoleRoute>
            }
          />
          <Route
            path="/gis"
            element={
              <RoleRoute
                allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}
              >
                <GISExplorer />
              </RoleRoute>
            }
          />
          <Route path="/foundation" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
