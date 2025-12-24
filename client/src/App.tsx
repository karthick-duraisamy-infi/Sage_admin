import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import {
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
    (state) => state.MenuDataReducer
  );

  const [getLandingRoute, getLandingRouteResponse] =
    useLazyGetLandingRouteQuery();
  
  const [isLoadingAuthRoutes, setIsLoadingAuthRoutes] = useState(false);

  // Check for query parameter authentication or localStorage on initial load
  useEffect(() => {
    const checkAuthentication = async () => {
      // Check for query parameter first
      const fullPath = window.location.search;
      // Extract the hash/token after the '?' (e.g., ?21232f297a57a5a743894a0e4a801fc3)
      const queryParamKey = fullPath.startsWith('?') ? fullPath.substring(1) : '';
      
      // If there's a query parameter, try to authenticate with it
      if (queryParamKey && queryParamKey.length > 0) {
        try {
          const configResponse = await fetch('./staticData/config.json');
          const config = await configResponse.json();
          
          // Check if the query parameter matches a valid user ID
          if (config.credentials && config.credentials[queryParamKey]) {
            const userConfig = config.credentials[queryParamKey];
            const user = {
              id: queryParamKey,
              email: userConfig.username,
              name: userConfig.username,
              role: queryParamKey === '17c4520f6cfd1ab53d8745e84681eb49' ? 'superadmin' : 
                    queryParamKey === '21232f297a57a5a743894a0e4a801fc3' ? 'admin' : 'user'
            };
            
            // Store authentication data
            const mockToken = 'auto-auth-token-' + Date.now();
            localStorage.setItem('authToken', mockToken);
            localStorage.setItem('userId', queryParamKey);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Update Redux state with user data AND menu/routes
            dispatch(setAuthenticated({ value: true, user }));
            dispatch(setMenuReponse({ 
              value: {
                menu: userConfig.menu,
                route: userConfig.route
              }
            }));
            
            // Clean up URL by removing query parameter
            window.history.replaceState({}, '', window.location.pathname);
            return;
          }
        } catch (error) {
          console.error('Error during query parameter authentication:', error);
        }
      }
      
      // Fall back to localStorage authentication
      const authToken = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("user");

      if (authToken && !isAuthenticated) {
        const user = userStr ? JSON.parse(userStr) : undefined;
        dispatch(setAuthenticated({ value: true, user }));
      }
    };
    
    checkAuthentication();
  }, [dispatch]);

  // Load routes based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        // Load menu and routes directly from config.json
        setIsLoadingAuthRoutes(true);
        fetch('./staticData/config.json')
          .then(response => response.json())
          .then(config => {
            if (config.credentials && config.credentials[userId]) {
              const userConfig = config.credentials[userId];
              dispatch(setMenuReponse({ 
                value: {
                  menu: userConfig.menu,
                  route: userConfig.route
                }
              }));
            } else {
              console.error('User configuration not found for ID:', userId);
            }
          })
          .catch(error => {
            console.error('Error loading user configuration:', error);
          })
          .finally(() => {
            setIsLoadingAuthRoutes(false);
          });
      } else {
        console.error("No userId found in localStorage");
      }
    } else {
      getLandingRoute();
    }
  }, [isAuthenticated, dispatch]);

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
    if (isLoadingAuthRoutes) {
      return <div>Loading routes...</div>;
    }

    // If no routes available after loading
    if (!authRoutes || authRoutes.length === 0) {
      console.error("No routes found for authenticated user");
      console.error("User ID:", localStorage.getItem("userId"));
      return <div>Loading routes...</div>;
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
  return <div>Loading...</div>;
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
