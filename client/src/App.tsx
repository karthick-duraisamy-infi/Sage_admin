import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import {
  useLazyGetMenuDataQuery,
  useLazyGetLandingRouteQuery,
} from "@/service/menu/menu";
import { setMenuReponse, setLandingRoutes } from "@/store/menu.store";
import { setAuthenticated } from "@/store/auth.store";
import DynamicRoutes from "@/components/routing/DynamicRoutes";
import { Router, Route, Switch } from "wouter";

const BASE_PATH = "/sageAdmin";

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.AuthReducer);
  const { landingRoutes, authRoutes } = useAppSelector(
    (state) => state.MenuDataReducer,
  );

  const [getMenuData, getMenuResponseStatus] = useLazyGetMenuDataQuery();
  const [getLandingRoute, getLandingRouteResponse] =
    useLazyGetLandingRouteQuery();

  // Check localStorage and set authentication state on initial load
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");

    if (authToken && !isAuthenticated) {
      const user = userStr ? JSON.parse(userStr) : undefined;
      dispatch(setAuthenticated({ value: true, user }));
    }
  }, []);

  // Load routes based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        getMenuData(userId);
      }
    } else {
      getLandingRoute();
    }
  }, [isAuthenticated]);

  // Handle menu data response (authenticated routes)
  useEffect(() => {
    if (getMenuResponseStatus?.isSuccess && getMenuResponseStatus?.data) {
      dispatch(setMenuReponse({ value: getMenuResponseStatus.data }));
    }
  }, [getMenuResponseStatus?.isSuccess, getMenuResponseStatus?.data]);

  // Handle landing routes response (unauthenticated routes)
  useEffect(() => {
    if (getLandingRouteResponse?.isSuccess && getLandingRouteResponse?.data) {
      dispatch(setLandingRoutes({ value: getLandingRouteResponse.data }));
    }
  }, [getLandingRouteResponse?.isSuccess, getLandingRouteResponse?.data]);

  // Render routes based on authentication
  if (isAuthenticated) {
    if (authRoutes && authRoutes.length > 0) {
      return <DynamicRoutes routes={authRoutes} isAuthenticated={true} />;
    }
    // If authenticated but routes are still loading
    if (getMenuResponseStatus?.isLoading) {
      return <div>Loading routes...</div>;
    }
    // If there was an error loading routes
    if (getMenuResponseStatus?.isError) {
      return <div>Error loading routes. Please try logging in again.</div>;
    }
  }

  if (!isAuthenticated) {
    if (landingRoutes && landingRoutes.length > 0) {
      return <DynamicRoutes routes={landingRoutes} isAuthenticated={false} />;
    }
    // If unauthenticated and routes are loading
    if (getLandingRouteResponse?.isLoading) {
      return <div>Loading routes...</div>;
    }
  }

  // Default loading state
  return <div>Loading routes...</div>;
}

function App() {
  return (
    <Router base={BASE_PATH}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
