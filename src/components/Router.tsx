import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import WorkspacePage from "../pages/workspace";
import ContainerPage from "../pages/my/dashboard/containers";
import SharedContainerPage from "../pages/my/dashboard/containers/SharedContainers";
import MyContainerPage from "../pages/my/dashboard/containers/MyContainers";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/my/dashboard/containers" element={<ContainerPage />} />
          <Route
            path="/my/dashboard/containers/own"
            element={<MyContainerPage />}
          />
          <Route
            path="/my/dashboard/containers/shared"
            element={<SharedContainerPage />}
          />
          <Route path="/workspace/:workid" element={<WorkspacePage />} />
          <Route
            path="*"
            element={<Navigate replace to="/my/dashboard/containers" />}
          />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
}
