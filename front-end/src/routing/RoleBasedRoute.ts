import { Alert, AlertTitle, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModuleRole, useMultipleModuleRole } from "../hooks";
import { logoutAction } from "../redux/Auth/action";
import { getProjectRoleAction } from "../redux/Project/action";
import { getTaskTimerDetailsAction } from "../redux/Timer/action";

export function ProjectRoleBasedRoute({
  accessibleRoles,
  children,
  module = "PMS",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectID } = useParams();

  const token = localStorage.getItem("token");
  const moduleRole = useModuleRole(module);

  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const ProjectStates = useSelector((state) => state?.Project);
  const { isFetchingCurrentRole } = ProjectStates;
  const currentRole =
    ProjectStates?.currentProjectRole?.name ?? "ACCESS_DENIED";

  const currentProject = ProjectStates?.currentProjectRole?.projectId ?? "";

  useEffect(() => {
    isAuthenticated && dispatch(getTaskTimerDetailsAction());
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    if (token === null) {
      dispatch(logoutAction());
    }
    if (projectID != currentProject && moduleRole != "ADMIN") {
      dispatch(getProjectRoleAction(projectID));
    }
  }, [projectID, token]);

  const PermissionDenied = () => {
    return (
      <>
        <Container>
          <Alert severity="error">
            <AlertTitle>Permission Denied</AlertTitle>
            You do not have permission to access this page
          </Alert>
        </Container>
      </>
    );
  };

  if (
    !isFetchingCurrentRole &&
    (currentProject == projectID || currentProject == "")
  ) {
    if (
      !accessibleRoles[module].includes(currentRole) &&
      moduleRole != "ADMIN"
    ) {
      return <PermissionDenied />;
    }

    return <>{children}</>;
  }
}

export function ModuleRoleBasedRoute({ accessibleRoles, children, module }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moduleRole = useMultipleModuleRole(module);

  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const token = localStorage.getItem("token");

  useEffect(() => {
    isAuthenticated && dispatch(getTaskTimerDetailsAction());
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    if (token === null) {
      dispatch(logoutAction());
    }
  }, []);

  const roleManagement = module.map(
    (module, index) =>
      accessibleRoles[module]?.includes(moduleRole[module]) ?? false
  );

  if (!roleManagement?.includes(true)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}

export function ConditionBasedRoute({
  accessibleRoles,
  children,
  module,
  condition,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moduleRole = useModuleRole(module);

  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const token = localStorage.getItem("token");

  useEffect(() => {
    isAuthenticated && dispatch(getTaskTimerDetailsAction());
    !isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    if (token === null) {
      dispatch(logoutAction());
      return () => {};
    }
  }, []);

  if (
    !accessibleRoles[module].includes(moduleRole[module]) &&
    moduleRole != "ADMIN" &&
    !condition
  ) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
