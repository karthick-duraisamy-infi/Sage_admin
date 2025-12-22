import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Activity,
  Users,
  Zap,
  Database,
  Globe,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import "./Dashboard.scss";
import {
  useLazyGetApiCallDataQuery,
  useLazyGetCommonDashboardDataQuery,
  useLazyGetResponseTimeDataQuery,
} from "@/service/dashboard/dashboard";
// If api call fails or is loading, use static data as fallback
import commonDashboardData from '../../../../public/staticData/dashboard/commonDashboard.json';
import apiData from '../../../../public/staticData/dashboard/api_calls_over_time.json';
import performancedData from '../../../../public/staticData/dashboard/response_time_analytics.json';

export default function Dashboard() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("all");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("30");
  const [selectedApi, setSelectedApi] = useState("all");
  const [selectedAnalyticsTimePeriod, setSelectedAnalyticsTimePeriod] = useState("30");

  const [dashboardCommonData, dashboardCommonDataResponse] =
    useLazyGetCommonDashboardDataQuery();
  const [getApiCall, getApiCallResponse] = useLazyGetApiCallDataQuery();
  const [getResponseTimeData, getResponseTimeDataResponse] =
    useLazyGetResponseTimeDataQuery();

  // State to store API data
  const [commonData, setCommonData] = useState<any>(null);
  const [apiCallData, setApiCallData] = useState<any>(null);
  const [responseTimeData, setResponseTimeData] = useState<any>(null);

  // The following useEffect is used to trigger the API at initial rendering
  useEffect(() => {
    dashboardCommonData({});
  }, []);

  // To trigger the API call based on user selection
  useEffect(() => {
    getApiCall({
      endpointName: selectedEndpoint,
      range: `last_${selectedTimePeriod}_days`,
    });
  }, [selectedEndpoint, selectedTimePeriod])

  // To trigger the API call based on user selection
  useEffect(() => {
    getResponseTimeData({
      endPointApi: selectedApi,
      range:`last_${selectedAnalyticsTimePeriod}_days`
    });
  }, [selectedApi, selectedAnalyticsTimePeriod]);

  // The following useEffect is triggered when dashboardCommonDataResponse api is completed
  useEffect(() => {
    if (dashboardCommonDataResponse?.isSuccess && dashboardCommonDataResponse?.data) {
      setCommonData(dashboardCommonDataResponse.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
      setCommonData(commonDashboardData);
    }
  }, [dashboardCommonDataResponse]);

  // The following useEffect is triggered when getApiCallResponse api is completed
  useEffect(() => {
    if (getApiCallResponse?.isSuccess && getApiCallResponse?.data) {
      setApiCallData(getApiCallResponse.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
      setApiCallData(apiData);
    }
  }, [getApiCallResponse]);

  // The following useEffect is triggered when getResponseTimeDataResponse api is completed
  useEffect(() => {
    if (getResponseTimeDataResponse?.isSuccess && getResponseTimeDataResponse?.data) {
      setResponseTimeData(getResponseTimeDataResponse.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
      setResponseTimeData(performancedData);
    }
  }, [getResponseTimeDataResponse]);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Real-time analytics, AI insights, and system health monitoring"
    >
      <div className="cls-dashboard-container">
        {/* Header */}
        <div className="cls-dashboard-header">
          {/* <div>
          <h1 className="cls-page-title">Dashboard</h1>
          <p className="cls-page-subtitle">
            Real-time analytics, AI insights, and system health monitoring
          </p>
        </div> */}
          {/* <div className="cls-header-actions">
            <Button variant="outline" size="sm">
              <Clock className="cls-icon" />
            </Button>
            <Button variant="outline" size="sm">
              <AlertCircle className="cls-icon" />
            </Button>
          </div> */}
        </div>

        {/* Metrics Cards */}
        <div className="cls-metrics-grid">
          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Total API Calls</p>
                <h2 className="cls-metric-value">
                  {commonData?.summaryCards?.totalApiCalls
                    ? (commonData.summaryCards.totalApiCalls / 1000000).toFixed(1) + 'M'
                    : 'N/A'}
                </h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 5.2%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-blue">
                <Activity size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Avg. Response Time</p>
                <h2 className="cls-metric-value">
                  {commonData?.summaryCards?.avgResponseTimeMs
                    ? commonData.summaryCards.avgResponseTimeMs + 'ms'
                    : 'N/A'}
                </h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 3.1%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-green">
                <Zap size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Current Usage</p>
                <h2 className="cls-metric-value">
                  {commonData?.summaryCards?.currentUsagePercent
                    ? commonData.summaryCards.currentUsagePercent + '%'
                    : 'N/A'}
                </h2>
                <p className="cls-metric-change cls-negative">
                  <TrendingDown size={14} /> 2.3%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-yellow">
                <Cpu size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Error Rate</p>
                <h2 className="cls-metric-value">
                  {commonData?.summaryCards?.errorRatePercent
                    ? commonData.summaryCards.errorRatePercent + '%'
                    : 'N/A'}
                </h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 0.3%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-red">
                <AlertCircle size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Alert Banner */}
        {JSON.parse(localStorage?.getItem("user") as string).role == "superadmin" && <div className="cls-alert-banner">
          <AlertCircle className="cls-alert-icon" />
          <div className="cls-alert-content">
            <p className="cls-alert-text">
              You're approaching your usage cap - {commonData?.summaryCards?.currentUsagePercent || 84}% of your quota is used.
            </p>
            <p className="cls-alert-subtext">
              Upgrade your plan to prevent service disruption.
            </p>
          </div>
          <div className="cls-alert-actions">
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
            <Button size="sm" className="cls-upgrade-button">
              Upgrade Plan
            </Button>
          </div>
        </div>}

        {/* AI Insights & Recommendations */}
        {JSON.parse(localStorage?.getItem("user") as string).role == "superadmin" && <div className="cls-section">
          <div className="cls-section-header">
            <h2 className="cls-section-title">AI Insights & Recommendations</h2>
            <p className="cls-section-subtitle">
              Proactive insights to improve performance and reduce costs
            </p>
          </div>

          <div className="cls-insights-grid">
            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Zap className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Optimize Rate Limiting
                    <Badge className="cls-badge-urgent">Urgent</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Detected spikes 25% above average. Consider adding rate
                    limits.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Scale Resources
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Database className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Database Query Lag
                    <Badge className="cls-badge-high">High</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Slow DB queries detected. Add index on 'users.email' for
                    best perf.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Investigate
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Activity className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Performance Optimization
                    <Badge className="cls-badge-medium">Medium</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    CDN options for /images/* endpoints can cut load time by ~
                    32%.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Optimize Now
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Shield className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Cost Optimization
                    <Badge className="cls-badge-low">Low</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Reduce resource use by caching during off-peak hours to save
                    ~15%.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Adjust Instance
              </Button>
            </Card>
          </div>
        </div>}

        {/* Charts Row */}
        <div className="cls-charts-row">
          {/* API Calls Over Time */}
          <Card className="cls-chart-card">
            <div className="cls-chart-header">
              <h3 className="cls-chart-title">
                {apiCallData?.data?.chartTitle || 'API Calls Over Time'}
              </h3>
              <div className="cls-chart-filters">
                <Select
                  value={selectedEndpoint}
                  onValueChange={setSelectedEndpoint}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Endpoints</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedTimePeriod}
                  onValueChange={setSelectedTimePeriod}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="cls-chart-placeholder">
              <svg viewBox="0 0 400 200" className="cls-line-chart">
                {apiCallData?.data?.points && apiCallData.data.points.length > 0 ? (
                  <polyline
                    points={apiCallData.data.points.map((point: any, index: number) => {
                      const x = 10 + (360 / (apiCallData.data.points.length - 1)) * index;
                      const maxCount = Math.max(...apiCallData.data.points.map((p: any) => p.count));
                      const y = 180 - (point.count / maxCount) * 120;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                  />
                ) : (
                  <polyline
                    points="10,150 40,120 70,140 100,80 130,100 160,60 190,90 220,70 250,100 280,80 310,110 340,90 370,100"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                  />
                )}
              </svg>
              <div className="cls-chart-labels">
                {apiCallData?.data?.points && apiCallData.data.points.length > 0
                  ? apiCallData.data.points.map((point: any, index: number) => {
                    if (index % Math.ceil(apiCallData.data.points.length / 5) === 0 || index === apiCallData.data.points.length - 1) {
                      const date = new Date(point.date);
                      return <span key={index}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>;
                    }
                    return null;
                  })
                  : (
                    <>
                      <span>Oct 01</span>
                      <span>Oct 20</span>
                      <span>Nov 8</span>
                      <span>Nov 16</span>
                      <span>Nov 30</span>
                    </>
                  )
                }
              </div>
            </div>
          </Card>

          {/* Response Time Analytics */}
          <Card className="cls-chart-card">
            <div className="cls-chart-header">
              <h3 className="cls-chart-title">
                {responseTimeData?.title || 'Response Time Analytics'}
              </h3>
              <div className="cls-chart-filters">
                <Select
                  value={selectedApi}
                  onValueChange={setSelectedApi}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All APIs</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedAnalyticsTimePeriod}
                  onValueChange={setSelectedAnalyticsTimePeriod}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="cls-chart-placeholder">
              <svg viewBox="0 0 400 200" className="cls-area-chart">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10,100 Q 100,80 190,90 T 370,85 L 370,200 L 10,200 Z"
                  fill="url(#grad1)"
                />
                <path
                  d="M 10,120 Q 100,105 190,110 T 370,105 L 370,200 L 10,200 Z"
                  fill="url(#grad2)"
                />
                <path
                  d="M 10,140 Q 100,130 190,135 T 370,130 L 370,200 L 10,200 Z"
                  fill="url(#grad3)"
                />
                <path
                  d="M 10,160 Q 100,155 190,158 T 370,155 L 370,200 L 10,200 Z"
                  fill="url(#grad4)"
                />
              </svg>
              <div className="cls-chart-legend">
                {responseTimeData?.metrics?.map((metric: any, index: number) => (
                  <div className="cls-legend-item" key={index}>
                    <span className={`cls-legend-dot cls-${metric.color}`}></span>
                    {metric.api}
                  </div>
                )) || (
                    <>
                      <div className="cls-legend-item">
                        <span className="cls-legend-dot cls-red"></span>
                        Payments
                      </div>
                      <div className="cls-legend-item">
                        <span className="cls-legend-dot cls-orange"></span>
                        Analytics
                      </div>
                      <div className="cls-legend-item">
                        <span className="cls-legend-dot cls-green"></span>
                        User Data
                      </div>
                      <div className="cls-legend-item">
                        <span className="cls-legend-dot cls-blue"></span>
                        Authentication
                      </div>
                    </>
                  )}
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Summary & System Services */}
        <div className="cls-bottom-row">
          {/* Performance Summary */}
          <Card className="cls-performance-card">
            <h3 className="cls-card-title">Performance Summary</h3>
            <div className="cls-performance-list">
              {dashboardCommonDataResponse?.isLoading ? (
                <>
                  {[1, 2, 3, 4].map((index) => (
                    <div className="cls-performance-item" key={index}>
                      <div className="cls-performance-info">
                        <div className="animate-pulse bg-gray-200 h-4 w-24 rounded mb-2"></div>
                        <div className="animate-pulse bg-gray-200 h-6 w-16 rounded mb-1"></div>
                        <div className="animate-pulse bg-gray-200 h-3 w-20 rounded"></div>
                      </div>
                      <div className="cls-performance-status">
                        <div className="animate-pulse bg-gray-200 h-5 w-12 rounded mb-1"></div>
                        <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                commonData?.performanceSummary?.map((item: any, index: number) => (
                  <div className="cls-performance-item" key={index}>
                    <div className="cls-performance-info">
                      <p className="cls-performance-name">{item.service}</p>
                      <p className="cls-performance-value">{item.responseTimeMs}ms</p>
                      <p className="cls-performance-prev">Prev: {item.previousResponseTimeMs}ms</p>
                    </div>
                    <div className="cls-performance-status">
                      <Badge className={item.status === 'Improved' ? 'cls-badge-improved' : 'cls-badge-slower'}>
                        {item.change}
                      </Badge>
                      <span className={`cls-status-text ${item.status === 'Improved' ? 'cls-improved' : 'cls-slower'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* System Services Status */}
          <Card className="cls-services-card">
            <h3 className="cls-card-title">System Services Status</h3>
            <p className="cls-card-subtitle">
              Real-time status of all critical system services.
            </p>
            <div className="cls-services-list">
              {commonData?.systemServicesStatus?.map((service: any, index: number) => {
                const getServiceIcon = (name: string) => {
                  if (name.includes('Gateway')) return <Globe className="cls-service-icon" />;
                  if (name.includes('Database')) return <Database className="cls-service-icon" />;
                  if (name.includes('Load')) return <Shield className="cls-service-icon" />;
                  if (name.includes('Cache')) return <HardDrive className="cls-service-icon" />;
                  if (name.includes('Auth')) return <Zap className="cls-service-icon" />;
                  return <Activity className="cls-service-icon" />;
                };

                const getBadgeClass = (status: string) => {
                  if (status === 'Healthy') return 'cls-badge-healthy';
                  if (status === 'Warning') return 'cls-badge-warning';
                  if (status === 'Critical') return 'cls-badge-critical';
                  return 'cls-badge-healthy';
                };

                return (
                  <div className="cls-service-item" key={index}>
                    <div className="cls-service-header">
                      {getServiceIcon(service.name)}
                      <div className="cls-service-info">
                        <p className="cls-service-name">{service.name}</p>
                        <Badge className={getBadgeClass(service.status)}>{service.status}</Badge>
                      </div>
                    </div>
                    <div className="cls-service-details">
                      <div className="cls-service-metric">
                        <span className="cls-metric-name">Response Time:</span>
                        <span className="cls-metric-val">{service.responseTimeMs}ms</span>
                      </div>
                      <div className="cls-service-metric">
                        <span className="cls-metric-name">Uptime:</span>
                        <span className="cls-metric-val">{service.uptime}</span>
                      </div>
                      <div className="cls-service-metric">
                        <span className="cls-metric-name">Last Check:</span>
                        <span className="cls-metric-val">{service.lastCheck} ago</span>
                      </div>
                    </div>
                  </div>
                );
              }) || null}
            </div>
          </Card>
        </div>

        {/* Resource Usage & Recent Incidents */}
        <div className="cls-bottom-row">
          {/* Resource Usage */}
          <Card className="cls-resource-card">
            <div className="cls-resource-header">
              <Activity className="cls-resource-icon" />
              <h3 className="cls-card-title">Resource Usage</h3>
            </div>
            <div className="cls-resource-list">
              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Cpu className="cls-resource-type-icon" />
                  <span className="cls-resource-name">CPU Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: `${commonData?.resourceUsage?.cpuPercent || 0}%` }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">{commonData?.resourceUsage?.cpuPercent || 0}%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Database className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Memory Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: `${commonData?.resourceUsage?.memoryPercent || 0}%` }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">{commonData?.resourceUsage?.memoryPercent || 0}%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <HardDrive className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Disk Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill cls-warning"
                      style={{ width: `${commonData?.resourceUsage?.diskPercent || 0}%` }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">{commonData?.resourceUsage?.diskPercent || 0}%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Wifi className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Network I/O</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: `${commonData?.resourceUsage?.networkPercent || 0}%` }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">{commonData?.resourceUsage?.networkPercent || 0}%</span>
                </div>
              </div>
            </div>
            <div className="cls-system-health">
              <span className="cls-health-label">Overall System Health</span>
              <Badge className="cls-badge-operational">{commonData?.resourceUsage?.overallHealth || 'Operational'}</Badge>
            </div>
          </Card>

          {/* Recent Incidents */}
          <Card className="cls-incidents-card">
            <div className="cls-incidents-header">
              <AlertCircle className="cls-incidents-icon" />
              <h3 className="cls-card-title">Recent Incidents</h3>
              <Button variant="ghost" size="sm" className="cls-view-all">
                View All
              </Button>
            </div>
            <div className="cls-incidents-list">
              {commonData?.recentIncidents?.map((incident: any, index: number) => {
                const getBadgeClass = (status: string) => {
                  if (status === 'warning') return 'cls-badge-warning-small';
                  if (status === 'resolved') return 'cls-badge-resolved';
                  if (status === 'info') return 'cls-badge-info';
                  return 'cls-badge-success';
                };

                const getTimeAgo = (daysAgo: number) => {
                  if (daysAgo === 0) return '';
                  if (daysAgo < 7) return `${daysAgo} days ago`;
                  return `${Math.floor(daysAgo / 7)} week ago`;
                };

                return (
                  <div className={`cls-incident-item ${incident.daysAgo === 0 ? 'cls-no-incidents' : ''}`} key={index}>
                    <div className="cls-incident-info">
                      <p className="cls-incident-title">{incident.title}</p>
                      <p className="cls-incident-description">{incident.subtitle}</p>
                      {incident.daysAgo > 0 && (
                        <p className="cls-incident-time">{getTimeAgo(incident.daysAgo)}</p>
                      )}
                    </div>
                    <Badge className={getBadgeClass(incident.status)}>
                      {incident.status === 'resolved' ? 'Resolved' : incident.status}
                    </Badge>
                  </div>
                );
              }) || null}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
