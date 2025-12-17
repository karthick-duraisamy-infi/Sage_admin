
import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import AppLayout from "@/components/layout/AppLayout";

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
      <div style={{ padding: "2rem", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        {/* Top Metrics Cards Row */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "1.5rem", 
          marginBottom: "2rem" 
        }}>
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <Skeleton className="h-4 w-28 mb-3" style={{ animationDelay: `${index * 100}ms` }} />
                  <Skeleton className="h-9 w-20" style={{ animationDelay: `${index * 100 + 50}ms` }} />
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" style={{ animationDelay: `${index * 100}ms` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Performing APIs Section */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
          overflow: "hidden"
        }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
          <div>
            {[1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: index < 5 ? "1px solid #f3f4f6" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: "0 0 280px" }}>
                  <Skeleton className="h-10 w-10 rounded-lg" style={{ animationDelay: `${index * 80}ms` }} />
                  <div style={{ flex: 1 }}>
                    <Skeleton className="h-4 w-32 mb-2" style={{ animationDelay: `${index * 80 + 20}ms` }} />
                    <Skeleton className="h-3 w-40" style={{ animationDelay: `${index * 80 + 40}ms` }} />
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2rem" }}>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <Skeleton className="h-3 w-16" style={{ animationDelay: `${index * 80 + i * 20}ms` }} />
                        <Skeleton className="h-4 w-12" style={{ animationDelay: `${index * 80 + i * 20 + 10}ms` }} />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" style={{ animationDelay: `${index * 80 + 60}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoint Details Section */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
          overflow: "hidden"
        }}>
          <div style={{ 
            padding: "1rem 1.5rem", 
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
          <div>
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                style={{
                  padding: "1rem",
                  borderBottom: index < 4 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2rem", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "nowrap" }}>
                    <Skeleton className="h-6 w-14 rounded" style={{ animationDelay: `${index * 70}ms` }} />
                    <Skeleton className="h-4 w-48" style={{ animationDelay: `${index * 70 + 20}ms` }} />
                    <Skeleton className="h-5 w-16 rounded-full" style={{ animationDelay: `${index * 70 + 40}ms` }} />
                    <Skeleton className="h-3 w-24" style={{ animationDelay: `${index * 70 + 60}ms` }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <Skeleton className="h-4 w-4 rounded" style={{ animationDelay: `${index * 70 + i * 15}ms` }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
                          <Skeleton className="h-3 w-14" style={{ animationDelay: `${index * 70 + i * 15 + 5}ms` }} />
                          <Skeleton className="h-4 w-10" style={{ animationDelay: `${index * 70 + i * 15 + 10}ms` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          {/* Rate Limiting Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
            <div style={{ padding: "1rem" }}>
              {[1, 2, 3].map((index) => (
                <div 
                  key={index}
                  style={{
                    padding: "1rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    marginBottom: index < 3 ? "1rem" : "0"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <Skeleton className="h-4 w-32" style={{ animationDelay: `${index * 60}ms` }} />
                    <Skeleton className="h-5 w-16 rounded-full" style={{ animationDelay: `${index * 60 + 20}ms` }} />
                  </div>
                  <Skeleton className="h-4 w-40 mb-2" style={{ animationDelay: `${index * 60 + 40}ms` }} />
                  <Skeleton className="h-3 w-24" style={{ animationDelay: `${index * 60 + 60}ms` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <Skeleton className="h-4 w-48 mb-6" />
              {[1, 2, 3, 4].map((index) => (
                <div key={index} style={{ marginBottom: index < 4 ? "1.5rem" : "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <Skeleton className="h-6 w-6 rounded" style={{ animationDelay: `${index * 50}ms` }} />
                    <Skeleton className="h-4 w-32" style={{ animationDelay: `${index * 50 + 20}ms` }} />
                  </div>
                  <Skeleton className="h-3 w-64 mb-2" style={{ animationDelay: `${index * 50 + 40}ms` }} />
                  <Skeleton className="h-2 w-full rounded" style={{ animationDelay: `${index * 50 + 60}ms` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Section */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          padding: "1.5rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-52" />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-72 w-full rounded-lg mb-4" style={{ animationDelay: "100ms" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            {[1, 2, 3].map((index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Skeleton className="h-3 w-3 rounded-full" style={{ animationDelay: `${index * 40}ms` }} />
                <Skeleton className="h-4 w-24" style={{ animationDelay: `${index * 40 + 20}ms` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Skeleton loader for unauthenticated pages
function UnauthPageSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "3rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <Skeleton className="h-12 w-48 mx-auto mb-8" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
}

export interface Route {
  path: string;
  component: string;
  isProtected: boolean;
}

interface DynamicRoutesProps {
  routes: Route[];
}

export default function DynamicRoutes({ routes }: DynamicRoutesProps) {
  const [location] = useLocation();

  return (
    <Switch>
      {routes.map(({ path, component, isProtected }) => {
        const Component = componentsMap[component];

        if (!Component) {
          console.warn(`Component "${component}" not found for path "${path}"`);
          return null;
        }

        return (
          <Route key={path} path={path}>
            <Suspense fallback={isProtected ? <AuthPageSkeleton /> : <UnauthPageSkeleton />}>
              <Component />
            </Suspense>
          </Route>
        );
      })}
    </Switch>
  );
}
