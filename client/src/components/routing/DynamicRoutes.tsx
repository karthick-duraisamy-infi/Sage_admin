
import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import AppLayout from "@/components/layout/AppLayout";
import { StatCardSkeleton, TableSkeleton } from "../SkeletonLoaders/SkeletonLoaders";

// Lazy load all components
const componentsMap: Record<string, any> = {
  Login: lazy(() => import("@/pages/unAuthPages/login/Login")),
  ForgotPassword: lazy(() => import("@/pages/unAuthPages/forgot-password/Forgot-password")),
  ResetPassword: lazy(() => import("@/pages/unAuthPages/reset-password/Reset-password")),
  Dashboard: lazy(() => import("@/pages/AuthPages/Dashboard/Dashboard")),
  ApiKeys: lazy(() => import("@/pages/AuthPages/ApiKeys/ApiKeys")),
  ApiDocs: lazy(() => import("@/pages/AuthPages/ApiDocs/ApiDocs")),
  ApiDocDetail: lazy(() => import("@/pages/AuthPages/ApiDocs/ApiDocDetail")),
  UsersPage: lazy(() => import("@/pages/AuthPages/Users/Users")),
  RolesPage: lazy(() => import("@/pages/AuthPages/Roles/Roles")),
  OrganizationsPage: lazy(() => import("@/pages/AuthPages/Organizations/Organizations")),
  Billing: lazy(() => import("@/pages/AuthPages/Billing/Billing")),
  Subscriptions: lazy(() => import("@/pages/AuthPages/Subscriptions/Subscriptions")),
  Analytics: lazy(() => import("@/pages/AuthPages/Analytics/Analytics")),
  Settings: lazy(() => import("@/pages/AuthPages/Settings/Settings")),
};

// Skeleton loader for authenticated pages
function AuthPageSkeleton() {
  return (
    <AppLayout title="Loading..." subtitle="">
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginBottom: "1.5rem" }}>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <TableSkeleton columns={4} />
      </div>
    </AppLayout>
  );
}

// Skeleton loader for unauthenticated pages
function UnauthPageSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Skeleton className="h-96 w-96" />
    </div>
  );
}

interface RouteConfig {
  id: number;
  path: string;
  component: string;
  default?: boolean;
}

interface DynamicRoutesProps {
  routes: RouteConfig[];
  isAuthenticated?: boolean;
}

function RedirectToDefault({ defaultRoute }: { defaultRoute: string }) {
  const [, setLocation] = useLocation();

  // Redirect to default route
  useEffect(() => {
    setLocation(defaultRoute);
  }, [defaultRoute, setLocation]);

  return null;
}

export default function DynamicRoutes({ routes, isAuthenticated = false }: DynamicRoutesProps) {
  const defaultRoute = routes?.find((route) => route.default)?.path || "/";
  const LoadingFallback = isAuthenticated ? AuthPageSkeleton : UnauthPageSkeleton;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        {routes?.map((route) => {
          const Component = componentsMap[route.component];

          if (!Component) {
            console.warn(`Component ${route.component} not found`);
            return null;
          }

          return (
            <Route key={route.id} path={route.path} component={Component} />
          );
        })}

        {/* Redirect root to default route */}
        <Route path="/">
          <RedirectToDefault defaultRoute={defaultRoute} />
        </Route>

        {/* Fallback for non-existent routes */}
        <Route>
          <RedirectToDefault defaultRoute={defaultRoute} />
        </Route>
      </Switch>
    </Suspense>
  );
}
