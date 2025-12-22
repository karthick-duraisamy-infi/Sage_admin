import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Code,
  Users,
  CreditCard,
  Package,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Activity,
  PanelLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "./AppLayout.scss";
import {
  useLazyGetLandingRouteQuery,
  useLazyGetMenuDataQuery,
} from "@/service/menu/menu";
import { useDispatch, useSelector } from "react-redux";
import { setMenuReponse } from "@/store/menu.store";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth.store";

interface MenuItem {
  title: string;
  icon: any;
  href?: string;
  items?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "API Management",
    icon: Code,
    items: [
      { title: "API Keys", href: "/api-keys" },
      { title: "API Docs", href: "/api-docs" },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "Users", href: "/users" },
      { title: "Roles & Privileges", href: "/roles" },
      { title: "Organizations", href: "/organizations" },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    title: "Subscription Plans",
    icon: Package,
    href: "/subscriptions",
  },
  {
    title: "Analytics",
    icon: Activity,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

function SidebarHeaderComponent() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <SidebarHeader className="cls-sidebar-header">
      <div
        className={`cls-logo ${
          state === "collapsed" ? "cls-collapsed-state" : ""
        }`}
      >
        <div className="cls-logo-icon">
          {state === "collapsed" ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </div>
        <div className="cls-logo-text">
          <h1>SAGE</h1>
          <p>Seamless API for Group Engagement</p>
        </div>
      </div>
      <button
        className="cls-collapse-button"
        onClick={toggleSidebar}
        aria-label={
          state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"
        }
      >
        {state === "collapsed" ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </SidebarHeader>
  );
}

function AppLayoutContent({ children, title, subtitle }: AppLayoutProps) {
  const [location] = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { state: sidebarState, toggleSidebar } = useSidebar();
  const dispatch = useDispatch();
  const [_, setLocation] = useLocation();

  // Get menu items and user data from Redux store
  const { menuItems: userMenuItems } = useAppSelector(
    (state) => state.MenuDataReducer
  );
  const { user } = useAppSelector((state) => state.AuthReducer);
  const menuItemsToRender = userMenuItems || menuItems;

  // Format role for display (capitalize first letter)
  const formatRole = (role: string | undefined | null) => {
    if (!role) return "User";
    if (role === "superadmin") return "Super Admin";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const displayRole = user && user.role ? formatRole(user.role) : "User";
  const displayName = user ? user.name || user.email || "User" : "User";

  // Map icon strings to actual icon components
  const iconMap: Record<string, any> = {
    LayoutDashboard,
    Code,
    Users,
    CreditCard,
    Package,
    Activity,
    Settings,
  };

  // Convert menu items with icon strings to icon components
  const processedMenuItems = menuItemsToRender.map((item: any) => ({
    ...item,
    icon:
      typeof item.icon === "string"
        ? iconMap[item.icon] || LayoutDashboard
        : item.icon,
  }));

  // Initialize open menu based on current location
  React.useEffect(() => {
    const currentMenu = processedMenuItems.find((item: any) =>
      item.items?.some((subItem: any) => subItem.href === location)
    );
    if (currentMenu && !openMenus.includes(currentMenu.title)) {
      setOpenMenus([currentMenu.title]);
    }
  }, [location, processedMenuItems]);

  const toggleMenu = (title: string) => {
    // debugger
    if (sidebarState === "collapsed") return;
    setOpenMenus((prev) => {
      // If the menu is already open, close it
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      }
      // Otherwise, close all other menus and open this one
      return [title];
    });
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // Update Redux state
    dispatch(logout());

    // Navigate to login
    setLocation("/login");
  };

  return (
    <div className="cls-app-layout">
      <Sidebar className="cls-sidebar" collapsible="icon">
        <SidebarHeaderComponent />

        <SidebarContent className="cls-sidebar-content">
          <SidebarMenu>
            {processedMenuItems.map((item: any) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible
                    open={
                      sidebarState !== "collapsed" &&
                      openMenus.includes(item?.title)
                    }
                    onOpenChange={() => toggleMenu(item?.title)}
                  >
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="cls-menu-button"
                          tooltip={item.title}
                          style={{
                            justifyContent:
                              sidebarState === "collapsed" ? "center" : "",
                          }}
                        >
                          <item.icon className="cls-menu-icon" />
                          {sidebarState !== "collapsed" && (
                            <span>{item?.title}</span>
                          )}
                          {sidebarState !== "collapsed" &&
                            (openMenus?.includes(item.title) ? (
                              <ChevronDown className="cls-chevron" />
                            ) : (
                              <ChevronRight className="cls-chevron" />
                            ))}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {sidebarState !== "collapsed" && (
                        <CollapsibleContent className="cls-submenu">
                          {item.items.map((subItem: any) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <SidebarMenuButton
                                isActive={location === subItem.href}
                                className="cls-submenu-button"
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuButton>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      )}
                    </>
                  </Collapsible>
                ) : (
                  <Link href={item?.href!}>
                    <SidebarMenuButton
                      isActive={location === item?.href}
                      className="cls-menu-button"
                      tooltip={item?.title}
                      style={{
                        justifyContent:
                          sidebarState === "collapsed" ? "center" : "",
                      }}
                      onClick={
                        sidebarState === "collapsed" ? toggleSidebar : undefined
                      }
                    >
                      <item.icon className="cls-menu-icon" />
                      {sidebarState !== "collapsed" && (
                        <span>{item?.title}</span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="cls-sidebar-footer">
          <div className="cls-user-profile">
            <Avatar
              className="cls-avatar"
              style={{
                justifyContent: sidebarState === "collapsed" ? "center" : "",
              }}
            >
              <AvatarFallback>
                {displayName && displayName.length > 0
                  ? displayName.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div
              className="cls-user-info"
              style={{ display: sidebarState === "collapsed" ? "none" : "" }}
            >
              <p className="cls-user-name">{displayName}</p>
              <p className="cls-user-role">{displayRole}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="cls-logout-button"
          >
            <LogOut className="cls-logout-icon" />
            {sidebarState !== "collapsed" && <span>Logout</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="cls-main-content">
        <header className="cls-header">
          <div className="cls-header-left">
            <SidebarTrigger className="cls-sidebar-trigger" />
            <div className="cls-header-info">
              <h1 className="cls-header-title">{title}</h1>
              {subtitle && <p className="cls-header-subtitle">{subtitle}</p>}
            </div>
          </div>
          <div className="cls-header-actions">
            <Button variant="ghost" size="icon" className="cls-header-button">
              <Bell className="cls-icon" />
            </Button>
            <Button variant="ghost" size="icon" className="cls-header-button">
              <Settings className="cls-icon" />
            </Button>
          </div>
        </header>

        <main className="cls-content">{children}</main>
      </SidebarInset>
    </div>
  );
}

export default function AppLayout(props: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutContent {...props} />
    </SidebarProvider>
  );
}
