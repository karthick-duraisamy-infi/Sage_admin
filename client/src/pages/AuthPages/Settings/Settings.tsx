import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Settings as SettingsIcon,
  Shield,
  Activity,
  Bell,
  RefreshCw,
  Trash2,
  Save,
  Wifi,
} from "lucide-react";
import "./Settings.scss";
import {
  useLazyGetSettingsInfoQuery,
  useUpdateSettingsMutation,
} from "@/service/settings/settings";
import { set } from "date-fns";

export default function Settings() {
  // Active section state
  const [activeSection, setActiveSection] = useState<string>("api");
  const [getSettingsInfo, getSettingsInfoStatus] =
    useLazyGetSettingsInfoQuery();
  const [updateSettings, updateSettingsStatus] = useUpdateSettingsMutation();

  // Quick Actions handlers
  const handleRestartServices = () => {
    console.log("Restarting services...");
  };

  const handleClearCache = () => {
    console.log("Clearing cache...");
  };

  const handleBackupNow = () => {
    console.log("Starting backup...");
  };

  const handleTestConnectivity = () => {
    console.log("Testing connectivity...");
  };

  // API Settings State
  const [apiSettings, setApiSettings] = useState<any>({
    rateLimit: 1000,
    apiVersion: "V1",
    keyRotation: false,
    requestLogging: true,
  });

  const [initialApiSettings] = useState(apiSettings);

  const apiSettingsChanged =
    JSON.stringify(apiSettings) !== JSON.stringify(initialApiSettings);

  const handleSaveApiSettings = () => {
    const apiData = {
      id: (getSettingsInfoStatus as any)?.data?.id || 1,
      default_rate_limit: apiSettings.rateLimit,
      api_version: apiSettings.apiVersion,
      auto_rotate_keys: apiSettings.keyRotation,
      request_logging: apiSettings.requestLogging,
    };
    updateSettings(apiData);
    // Reset initial state after save
  };

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState<any>({
    sessionTimeout: 30,
    twoFactor: false,
    ipWhitelisting: false,
    failedLoginProtection: true,
  });

  const [initialSecuritySettings] = useState(securitySettings);

  const securitySettingsChanged =
    JSON.stringify(securitySettings) !==
    JSON.stringify(initialSecuritySettings);

  const handleSaveSecuritySettings = () => {
    const securityData = {
      id: (getSettingsInfoStatus as any)?.data?.id || 1,
      session_timeout: securitySettings.sessionTimeout,
      require_2fa: securitySettings.twoFactor,
      ip_whitelisting: securitySettings.ipWhitelisting,
      enable_ip_whitelisting: securitySettings.failedLoginProtection,
    };
    updateSettings(securityData);
    // Reset initial state after save
  };

  // Monitoring Settings State
  const [monitoringSettings, setMonitoringSettings] = useState<any>({
    healthCheckInterval: 5,
    alertThreshold: 90,
    realTimeMonitoring: true,
    performanceAnalytics: false,
  });

  const [initialMonitoringSettings] = useState(monitoringSettings);

  const monitoringSettingsChanged =
    JSON.stringify(monitoringSettings) !==
    JSON.stringify(initialMonitoringSettings);

  const handleSaveMonitoringSettings = () => {
    const monitoringData = {
      id: (getSettingsInfoStatus as any)?.data?.id || 1,
      health_check_interval: monitoringSettings.healthCheckInterval,
      alert_threshold: monitoringSettings.alertThreshold,
      realtime_monitoring: monitoringSettings.realTimeMonitoring,
      performance_analytics: monitoringSettings.performanceAnalytics,
    };
    updateSettings(monitoringData);
  };

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    alertEmail: "admin@sage.co",
    systemHealthAlerts: true,
    errorRateAlerts: true,
    performanceAlerts: false,
    usageThresholdAlerts: true,
  });

  const [initialNotificationSettings] = useState(notificationSettings);

  const notificationSettingsChanged =
    JSON.stringify(notificationSettings) !==
    JSON.stringify(initialNotificationSettings);

  const [emailError, setEmailError] = useState("");

  // Screens Settings State
  const [screenSettings, setScreenSettings] = useState({
    adminDashboard: true,
    dashboard: true,
    apiManagement: true,
    apiKeys: true,
    apiDocs: true,
    analytics: true,
    apiLogs: true,
    userManagement: true,
    users: true,
    rolesPrivileges: true,
    organizations: true,
    billing: true,
    subscriptionPlans: true,
    settings: true,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSaveNotificationSettings = () => {
    if (validateEmail(notificationSettings?.alertEmail)) {
      const notificationData = {
        id: (getSettingsInfoStatus as any)?.data?.id || 1,
        alert_email: notificationSettings.alertEmail,
        notify_system_health: notificationSettings.systemHealthAlerts,
        notify_error_rate: notificationSettings.errorRateAlerts,
        notify_performance: notificationSettings.performanceAlerts,
        notify_usage_threshold: notificationSettings.usageThresholdAlerts,
      };
      updateSettings(notificationData);
    }
  };

  // To fetch API keys stats
  useEffect(() => {
    getSettingsInfo({});
  }, []);

  // To set API keys stats data
  useEffect(() => {
    if (getSettingsInfoStatus?.isSuccess && getSettingsInfoStatus?.data) {
      setApiSettings({
        rateLimit:
          (getSettingsInfoStatus as any)?.data?.default_rate_limit || 1000,
        apiVersion: (getSettingsInfoStatus as any)?.data?.api_version || "V1",
        keyRotation:
          (getSettingsInfoStatus as any)?.data?.auto_rotate_keys || false,
        requestLogging:
          (getSettingsInfoStatus as any)?.data?.request_logging || true,
      });
      setSecuritySettings({
        sessionTimeout:
          (getSettingsInfoStatus as any)?.data?.session_timeout || 30,
        twoFactor: (getSettingsInfoStatus as any)?.data?.require_2fa || false,
        ipWhitelisting:
          (getSettingsInfoStatus as any)?.data?.ip_whitelisting || false,
        failedLoginProtection:
          (getSettingsInfoStatus as any)?.data?.enable_ip_whitelisting || false,
      });
      setMonitoringSettings({
        healthCheckInterval:
          (getSettingsInfoStatus as any)?.data?.health_check_interval || 5,
        alertThreshold:
          (getSettingsInfoStatus as any)?.data?.alert_threshold || 90,
        realTimeMonitoring:
          (getSettingsInfoStatus as any)?.data?.realtime_monitoring || true,
        performanceAnalytics:
          (getSettingsInfoStatus as any)?.data?.performance_analytics || false,
      });
      setNotificationSettings({
        alertEmail:
          (getSettingsInfoStatus as any)?.data?.alert_email || "admin@sage.co",
        systemHealthAlerts:
          (getSettingsInfoStatus as any)?.data?.notify_system_health || true,
        errorRateAlerts:
          (getSettingsInfoStatus as any)?.data?.notify_error_rate || true,
        performanceAlerts:
          (getSettingsInfoStatus as any)?.data?.notify_performance || false,
        usageThresholdAlerts:
          (getSettingsInfoStatus as any)?.data?.notify_usage_threshold || true,
      });
    }
  }, [getSettingsInfoStatus]);

  return (
    <AppLayout
      title="Settings"
      subtitle="Configure system settings, security, monitoring, and preferences"
    >
      <div className="cls-settings-container">
        {/* Quick Actions */}
        {localStorage?.getItem("userId") == "17c4520f6cfd1ab53d8745e84681eb49" && <Card className="cls-quick-actions-card">
          <CardContent className="cls-quick-actions-content">
            <div className="cls-quick-actions-header">
              <h3 className="cls-quick-actions-title">Quick Actions</h3>
            </div>
            <div className="cls-quick-actions-grid">
              <button
                className="cls-quick-action-btn cls-action-purple"
                onClick={handleRestartServices}
              >
                <RefreshCw size={18} />
                <span>Restart Services</span>
              </button>
              <button
                className="cls-quick-action-btn cls-action-yellow"
                onClick={handleClearCache}
              >
                <Trash2 size={18} />
                <span>Clear Cache</span>
              </button>
              <button
                className="cls-quick-action-btn cls-action-green"
                onClick={handleBackupNow}
              >
                <Save size={18} />
                <span>Backup Now</span>
              </button>
              <button
                className="cls-quick-action-btn cls-action-blue"
                onClick={handleTestConnectivity}
              >
                <Wifi size={18} />
                <span>Test Connectivity</span>
              </button>
            </div>
          </CardContent>
        </Card>}

        <div className="cls-settings-layout">
          {/* Left Sidebar */}
          <div className="cls-settings-sidebar">
            <nav className="cls-settings-nav">
              <button
                className={`cls-nav-item ${
                  activeSection === "api" ? "cls-nav-item-active" : ""
                }`}
                onClick={() => setActiveSection("api")}
              >
                <SettingsIcon size={16} />
                <span>API</span>
              </button>
              <button
                className={`cls-nav-item ${
                  activeSection === "security" ? "cls-nav-item-active" : ""
                }`}
                onClick={() => setActiveSection("security")}
              >
                <Shield size={16} />
                <span>Security</span>
              </button>
              <button
                className={`cls-nav-item ${
                  activeSection === "monitoring" ? "cls-nav-item-active" : ""
                }`}
                onClick={() => setActiveSection("monitoring")}
              >
                <Activity size={16} />
                <span>Monitoring</span>
              </button>
              <button
                className={`cls-nav-item ${
                  activeSection === "notifications" ? "cls-nav-item-active" : ""
                }`}
                onClick={() => setActiveSection("notifications")}
              >
                <Bell size={16} />
                <span>Notifications</span>
              </button>
              <button
                className={`cls-nav-item ${
                  activeSection === "screens" ? "cls-nav-item-active" : ""
                }`}
                onClick={() => setActiveSection("screens")}
              >
                <SettingsIcon size={16} />
                <span>Screens</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="cls-settings-main">
            {/* API Configuration */}
            {activeSection === "api" && (
              <Card className="cls-settings-card">
                <CardContent className="cls-settings-card-content">
                  <div className="cls-settings-card-header">
                    <SettingsIcon size={18} />
                    <h3>API Configuration</h3>
                  </div>

                  <div className="cls-settings-fields">
                    <div className="cls-field-group">
                      <Label htmlFor="rateLimit">Default Rate Limit</Label>
                      <Select
                        value={apiSettings?.rateLimit}
                        onValueChange={(value) =>
                          setApiSettings({ ...apiSettings, rateLimit: value })
                        }
                      >
                        <SelectTrigger
                          id="rateLimit"
                          className="cls-select-trigger"
                        >
                          <SelectValue placeholder="Select rate limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1000}>
                            1000 requests/min
                          </SelectItem>
                          <SelectItem value={2000}>
                            2000 requests/min
                          </SelectItem>
                          <SelectItem value={5000}>
                            5000 requests/min
                          </SelectItem>
                          <SelectItem value={10000}>
                            10000 requests/min
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="cls-field-group">
                      <Label htmlFor="apiVersion">API Version</Label>
                      <Select
                        value={apiSettings.apiVersion}
                        onValueChange={(value) =>
                          setApiSettings({ ...apiSettings, apiVersion: value })
                        }
                      >
                        <SelectTrigger
                          id="apiVersion"
                          className="cls-select-trigger"
                        >
                          <SelectValue placeholder="Select API version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="V1">V1</SelectItem>
                          <SelectItem value="V2">V2 (beta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="keyRotation">API Key Rotation</Label>
                          <p className="cls-switch-description">
                            Automatically rotate API keys every 90 days
                          </p>
                        </div>
                        <Switch
                          id="keyRotation"
                          checked={apiSettings.keyRotation}
                          onCheckedChange={(checked) =>
                            setApiSettings({
                              ...apiSettings,
                              keyRotation: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="requestLogging">
                            Request Logging
                          </Label>
                          <p className="cls-switch-description">
                            Log all API requests for monitoring
                          </p>
                        </div>
                        <Switch
                          id="requestLogging"
                          checked={apiSettings.requestLogging}
                          onCheckedChange={(checked) =>
                            setApiSettings({
                              ...apiSettings,
                              requestLogging: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cls-settings-actions">
                    <Button
                      className="cls-save-button"
                      disabled={!apiSettingsChanged}
                      onClick={handleSaveApiSettings}
                    >
                      Save API Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <Card className="cls-settings-card">
                <CardContent className="cls-settings-card-content">
                  <div className="cls-settings-card-header">
                    <Shield size={18} />
                    <h3>Security Settings</h3>
                  </div>

                  <div className="cls-settings-fields">
                    <div className="cls-field-group">
                      <Label htmlFor="sessionTimeout">Session Timeout</Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="sessionTimeout"
                          className="cls-select-trigger"
                        >
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={15}>15 minutes</SelectItem>
                          <SelectItem value={30}>30 minutes</SelectItem>
                          <SelectItem value={60}>1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="twoFactor">
                            Two-Factor Authentication
                          </Label>
                          <p className="cls-switch-description">
                            Require 2FA for all admin accounts
                          </p>
                        </div>
                        <Switch
                          id="twoFactor"
                          checked={securitySettings.twoFactor}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              twoFactor: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="ipWhitelisting">
                            IP Whitelisting
                          </Label>
                          <p className="cls-switch-description">
                            Restrict access to specific IP addresses
                          </p>
                        </div>
                        <Switch
                          id="ipWhitelisting"
                          checked={securitySettings.ipWhitelisting}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              ipWhitelisting: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="failedLoginProtection">
                            Failed Login Protection
                          </Label>
                          <p className="cls-switch-description">
                            Lock account after 5 failed attempts
                          </p>
                        </div>
                        <Switch
                          id="failedLoginProtection"
                          checked={securitySettings.failedLoginProtection}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              failedLoginProtection: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cls-settings-actions">
                    <Button
                      className="cls-save-button"
                      disabled={!securitySettingsChanged}
                      onClick={handleSaveSecuritySettings}
                    >
                      Update Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Monitoring Configuration */}
            {activeSection === "monitoring" && (
              <Card className="cls-settings-card">
                <CardContent className="cls-settings-card-content">
                  <div className="cls-settings-card-header">
                    <Activity size={18} />
                    <h3>Monitoring Configuration</h3>
                  </div>

                  <div className="cls-settings-fields">
                    <div className="cls-field-group">
                      <Label htmlFor="healthCheckInterval">
                        Health Check Interval
                      </Label>
                      <Select
                        value={monitoringSettings?.healthCheckInterval}
                        onValueChange={(value) =>
                          setMonitoringSettings({
                            ...monitoringSettings,
                            healthCheckInterval: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="healthCheckInterval"
                          className="cls-select-trigger"
                        >
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1}>1 minute</SelectItem>
                          <SelectItem value={5}>5 minutes</SelectItem>
                          <SelectItem value={15}>15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="cls-field-group">
                      <Label htmlFor="alertThreshold">Alert Threshold</Label>
                      <Select
                        value={monitoringSettings.alertThreshold}
                        onValueChange={(value) =>
                          setMonitoringSettings({
                            ...monitoringSettings,
                            alertThreshold: value,
                          })
                        }
                      >
                        <SelectTrigger
                          id="alertThreshold"
                          className="cls-select-trigger"
                        >
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={90}>90%</SelectItem>
                          <SelectItem value={95}>95%</SelectItem>
                          <SelectItem value={98}>98%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="realTimeMonitoring">
                            Real-time Monitoring
                          </Label>
                          <p className="cls-switch-description">
                            Enable real-time system monitoring
                          </p>
                        </div>
                        <Switch
                          id="realTimeMonitoring"
                          checked={monitoringSettings.realTimeMonitoring}
                          onCheckedChange={(checked) =>
                            setMonitoringSettings({
                              ...monitoringSettings,
                              realTimeMonitoring: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="performanceAnalytics">
                            Performance Analytics
                          </Label>
                          <p className="cls-switch-description">
                            Collect detailed performance metrics
                          </p>
                        </div>
                        <Switch
                          id="performanceAnalytics"
                          checked={monitoringSettings.performanceAnalytics}
                          onCheckedChange={(checked) =>
                            setMonitoringSettings({
                              ...monitoringSettings,
                              performanceAnalytics: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cls-settings-actions">
                    <Button
                      className="cls-save-button"
                      disabled={!monitoringSettingsChanged}
                      onClick={handleSaveMonitoringSettings}
                    >
                      Save Monitoring Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Screens Configuration */}
            {activeSection === "screens" && (
              <Card className="cls-settings-card">
                <CardContent className="cls-settings-card-content">
                  <div className="cls-settings-card-header">
                    <SettingsIcon size={18} />
                    <h3>Screen Configuration</h3>
                  </div>

                  <div className="cls-screens-settings">
                    {/* Admin Dashboard */}
                    <div className="cls-screen-item">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Admin Dashboard</h4>
                          <p className="cls-screen-path">/admin</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.adminDashboard}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, adminDashboard: checked })
                        }
                      />
                    </div>

                    {/* Dashboard */}
                    <div className="cls-screen-item">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Dashboard</h4>
                          <p className="cls-screen-path">/dashboard</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.dashboard}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, dashboard: checked })
                        }
                      />
                    </div>

                    {/* API Management Header */}
                    <div className="cls-screen-item cls-screen-header">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">API Management</h4>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.apiManagement}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, apiManagement: checked })
                        }
                      />
                    </div>

                    {/* API Keys */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">API Keys</h4>
                          <p className="cls-screen-path">/api-keys</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.apiKeys}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, apiKeys: checked })
                        }
                      />
                    </div>

                    {/* API Docs */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">API Docs</h4>
                          <p className="cls-screen-path">/api-docs</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.apiDocs}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, apiDocs: checked })
                        }
                      />
                    </div>

                    {/* Analytics */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <Activity size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Analytics</h4>
                          <p className="cls-screen-path">/analytics</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.analytics}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, analytics: checked })
                        }
                      />
                    </div>

                    {/* API Logs */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <Activity size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">API Logs</h4>
                          <p className="cls-screen-path">/api-logs</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.apiLogs}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, apiLogs: checked })
                        }
                      />
                    </div>

                    {/* User Management Header */}
                    <div className="cls-screen-item cls-screen-header">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">User Management</h4>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.userManagement}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, userManagement: checked })
                        }
                      />
                    </div>

                    {/* Users */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Users</h4>
                          <p className="cls-screen-path">/user-management/users</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.users}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, users: checked })
                        }
                      />
                    </div>

                    {/* Roles & Privileges */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Roles & Privileges</h4>
                          <p className="cls-screen-path">/user-management/roles</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.rolesPrivileges}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, rolesPrivileges: checked })
                        }
                      />
                    </div>

                    {/* Organizations */}
                    <div className="cls-screen-item cls-screen-child">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Organizations</h4>
                          <p className="cls-screen-path">/user-management/organizations</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.organizations}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, organizations: checked })
                        }
                      />
                    </div>

                    {/* Billing */}
                    <div className="cls-screen-item">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Billing</h4>
                          <p className="cls-screen-path">/billing</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.billing}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, billing: checked })
                        }
                      />
                    </div>

                    {/* Subscription Plans */}
                    <div className="cls-screen-item">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Subscription Plans</h4>
                          <p className="cls-screen-path">/subscription-plans</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.subscriptionPlans}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, subscriptionPlans: checked })
                        }
                      />
                    </div>

                    {/* Settings */}
                    <div className="cls-screen-item">
                      <div className="cls-screen-info">
                        <div className="cls-screen-icon">
                          <SettingsIcon size={16} />
                        </div>
                        <div className="cls-screen-content">
                          <h4 className="cls-screen-title">Settings</h4>
                          <p className="cls-screen-path">/settings</p>
                        </div>
                      </div>
                      <Switch
                        checked={screenSettings.settings}
                        onCheckedChange={(checked) =>
                          setScreenSettings({ ...screenSettings, settings: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <Card className="cls-settings-card">
                <CardContent className="cls-settings-card-content">
                  <div className="cls-settings-card-header">
                    <Bell size={18} />
                    <h3>Notification Settings</h3>
                  </div>

                  <div className="cls-settings-fields">
                    <div className="cls-field-group">
                      <Label htmlFor="alertEmail">Alert Email</Label>
                      <Input
                        id="alertEmail"
                        type="email"
                        placeholder="admin@sage.co"
                        value={notificationSettings.alertEmail}
                        onChange={(e) => {
                          setNotificationSettings({
                            ...notificationSettings,
                            alertEmail: e.target.value,
                          });
                          if (emailError) {
                            validateEmail(e.target.value);
                          }
                        }}
                        onBlur={(e) => validateEmail(e.target.value)}
                        className={emailError ? "cls-input-error" : ""}
                      />
                      {emailError && (
                        <p className="cls-error-message">{emailError}</p>
                      )}
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="systemHealthAlerts">
                            System Health Alerts
                          </Label>
                          <p className="cls-switch-description">
                            Alerts when system health degrades
                          </p>
                        </div>
                        <Switch
                          id="systemHealthAlerts"
                          checked={notificationSettings.systemHealthAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              systemHealthAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="errorRateAlerts">
                            Error Rate Alerts
                          </Label>
                          <p className="cls-switch-description">
                            Alerts when error rate exceeds 5%
                          </p>
                        </div>
                        <Switch
                          id="errorRateAlerts"
                          checked={notificationSettings.errorRateAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              errorRateAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="performanceAlerts">
                            Performance Alerts
                          </Label>
                          <p className="cls-switch-description">
                            Alerts when response time increases
                          </p>
                        </div>
                        <Switch
                          id="performanceAlerts"
                          checked={notificationSettings.performanceAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              performanceAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="cls-switch-group">
                      <div className="cls-switch-content">
                        <div className="cls-switch-info">
                          <Label htmlFor="usageThresholdAlerts">
                            Usage Threshold Alerts
                          </Label>
                          <p className="cls-switch-description">
                            Alert at 80% of usage quota
                          </p>
                        </div>
                        <Switch
                          id="usageThresholdAlerts"
                          checked={notificationSettings.usageThresholdAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              usageThresholdAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cls-settings-actions">
                    <Button
                      className="cls-save-button"
                      disabled={!notificationSettingsChanged || !!emailError}
                      onClick={handleSaveNotificationSettings}
                    >
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
