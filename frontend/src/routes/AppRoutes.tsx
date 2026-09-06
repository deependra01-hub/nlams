import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Login } from "../pages/auth/Login";
import { NationalDashboard } from "../pages/dashboard/NationalDashboard";
import { GISExplorer } from "../pages/gis/GISExplorer";
import { CompensationDashboard } from "../pages/compensation/CompensationDashboard";
import { Payments } from "../pages/compensation/Payments";
import { AcquisitionDashboard } from "../pages/acquisition/AcquisitionDashboard";
import { Awards } from "../pages/acquisition/Awards";
import { Hearings } from "../pages/acquisition/Hearings";
import { Notifications as AcquisitionNotifications } from "../pages/acquisition/Notifications";
import { Objections } from "../pages/acquisition/Objections";
import { Possession } from "../pages/acquisition/Possession";
import { DocumentDetails } from "../pages/documents/DocumentDetails";
import { DocumentRepository } from "../pages/documents/DocumentRepository";
import { LandVerification } from "../pages/land/LandVerification";
import { ParcelDetails } from "../pages/land/ParcelDetails";
import { ParcelList } from "../pages/land/ParcelList";
import { Families } from "../pages/rehabilitation/Families";
import { RRDashboard } from "../pages/rehabilitation/RRDashboard";
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
            path="/acquisition"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <AcquisitionDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/acquisition/awards"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <Awards />
              </RoleRoute>
            }
          />
          <Route
            path="/acquisition/hearings"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <Hearings />
              </RoleRoute>
            }
          />
          <Route
            path="/acquisition/objections"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <Objections />
              </RoleRoute>
            }
          />
          <Route
            path="/acquisition/possession"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <Possession />
              </RoleRoute>
            }
          />
          <Route
            path="/acquisition/notifications"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer"]}>
                <AcquisitionNotifications />
              </RoleRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <RoleRoute
                allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer", "reviewer"]}
              >
                <DocumentRepository />
              </RoleRoute>
            }
          />
          <Route
            path="/documents/:documentId"
            element={
              <RoleRoute
                allowedRoles={["central_admin", "state_officer", "district_officer", "project_agency_officer", "field_officer", "reviewer"]}
              >
                <DocumentDetails />
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
          <Route
            path="/compensation"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer"]}>
                <CompensationDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/compensation/payments"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer"]}>
                <Payments />
              </RoleRoute>
            }
          />
          <Route
            path="/rr"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "field_officer"]}>
                <RRDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/rr/families"
            element={
              <RoleRoute allowedRoles={["central_admin", "state_officer", "district_officer", "field_officer"]}>
                <Families />
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
