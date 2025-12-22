import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Clock,
  HardDrive,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Zap,
} from "lucide-react";
import "./Analytics.scss";
import {
  useLazyGetCommonAnalyticsDataQuery,
  useLazyGetMenuApiAnalyticsDataQuery,
  useLazyGetMenuPerformanceAnalyticsDataQuery,
} from "@/service/analytics/analytics";
// If api call fails or is loading, use static data as fallback
import commonAnalytics from '../../../../public/staticData/analytics/commonAnalytics.json';
import apiEndPointData from '../../../../public/staticData/analytics/Analytics_Menu_API_Endpoint_Details_section.json';
import performancedData from '../../../../public/staticData/analytics/Analytics_Menu_System_Performance_Metrics.json';

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24H");
  const [selectedEndpointFilter, setSelectedEndpointFilter] = useState("all");

  const [analyticsCommonData, analyticsCommonDataResponse] =
    useLazyGetCommonAnalyticsDataQuery();

  const [GetMenuApiAnalyticsData, GetMenuApiAnalyticsDataResponse] =
    useLazyGetMenuApiAnalyticsDataQuery();

  const [GetMenuPerformanceData, GetMenuPerformanceDataResponse] =
    useLazyGetMenuPerformanceAnalyticsDataQuery();

  // State to store API data
  const [commonData, setCommonData] = useState<any>(null);
  const [apiEndpointData, setApiEndpointData] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any>(null);

  // Fetch data on initial render
  useEffect(() => {
    analyticsCommonData();
  }, []);

  // To trigger the filter based selections
  useEffect(()=>{
    GetMenuApiAnalyticsData({
      endPointName : selectedEndpointFilter,
      range : "30"
    });
  },[selectedEndpointFilter]);

  // To trigger the timeframe selection
  useEffect(()=>{
    GetMenuPerformanceData({
      range : selectedTimeframe
    });
  },[selectedTimeframe]);

  // Handle common analytics data response
  useEffect(() => {
    if (analyticsCommonDataResponse?.isSuccess && analyticsCommonDataResponse?.data) {
      setCommonData(analyticsCommonDataResponse.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
       setCommonData(commonAnalytics);
    }
  }, [analyticsCommonDataResponse]);

  // Handle API endpoint details response
  useEffect(() => {
    if (GetMenuApiAnalyticsDataResponse?.isSuccess && GetMenuApiAnalyticsDataResponse?.data) {
      setApiEndpointData(GetMenuApiAnalyticsDataResponse?.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
      setApiEndpointData(apiEndPointData);
    }
  }, [GetMenuApiAnalyticsDataResponse]);

  // Handle performance metrics response
  useEffect(() => {
    if (GetMenuPerformanceDataResponse?.isSuccess && GetMenuPerformanceDataResponse?.data) {
      setPerformanceData(GetMenuPerformanceDataResponse.data);
    }
    // If api call fails or is loading, use static data as fallback
    else{
      setPerformanceData(performancedData);
    }
  }, [GetMenuPerformanceDataResponse]);

  // Filter endpoints based on selected filter
  const filteredEndpoints = apiEndpointData?.api_endpoint_details?.filter((endpoint: any) => {
    if (selectedEndpointFilter === "all") return true;
    return endpoint.status === selectedEndpointFilter;
  }) || [];

  return (
    <AppLayout
      title="API Analytics"
      subtitle="Detailed insights on API performance, usage patterns, and endpoint analytics"
    >
      <div className="cls-analytics-container">
        {/* Metrics Cards */}
        <div className="cls-metrics-grid">
          {analyticsCommonDataResponse?.isLoading ? (
            <>
              {[1, 2, 3, 4].map((index) => (
                <Card className="cls-metric-card" key={index}>
                  <div className="cls-metric-content">
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-4 w-24 rounded mb-2"></div>
                      <div className="bg-gray-200 h-8 w-20 rounded"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card className="cls-metric-card">
                <div className="cls-metric-content">
                  <div>
                    <p className="cls-metric-label">System Uptime</p>
                    <h2 className="cls-metric-value">
                      {commonData?.Overall_System_Status?.System_Uptime || "N/A"}
                    </h2>
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
                      {commonData?.Overall_System_Status?.Avg_Response_Time || "N/A"}
                    </h2>
                  </div>
                  <div className="cls-metric-icon cls-icon-green">
                    <Clock size={24} />
                  </div>
                </div>
              </Card>

              <Card className="cls-metric-card">
                <div className="cls-metric-content">
                  <div>
                    <p className="cls-metric-label">Storage Used</p>
                    <h2 className="cls-metric-value">
                      {commonData?.Overall_System_Status?.Storage_Used || "N/A"}
                    </h2>
                  </div>
                  <div className="cls-metric-icon cls-icon-yellow">
                    <HardDrive size={24} />
                  </div>
                </div>
              </Card>

              <Card className="cls-metric-card">
                <div className="cls-metric-content">
                  <div>
                    <p className="cls-metric-label">Overall Health</p>
                    <h2 className="cls-metric-value cls-operational-text">
                      {commonData?.Overall_System_Status?.Overall_Health || "N/A"}
                    </h2>
                  </div>
                  <div className="cls-metric-icon cls-icon-red">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Top Performing APIs */}
        <Card className="cls-section-card">
          <div className="cls-section-header">
            <div className="cls-section-title-row">
              <TrendingUp className="cls-section-icon" size={20} />
              <h2 className="cls-section-title">Top Performing APIs</h2>
            </div>
          </div>
          <CardContent className="cls-section-content">
            {analyticsCommonDataResponse?.isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="cls-api-row">
                    <div className="cls-api-left">
                      <div className="animate-pulse bg-gray-200 w-10 h-10 rounded"></div>
                      <div className="cls-api-info">
                        <div className="animate-pulse bg-gray-200 h-4 w-32 rounded mb-2"></div>
                        <div className="animate-pulse bg-gray-200 h-3 w-40 rounded"></div>
                      </div>
                    </div>
                    <div className="cls-api-right">
                      <div className="cls-api-metrics">
                        {[1, 2, 3, 4].map((i) => (
                          <div className="cls-metric-item" key={i}>
                            <div className="animate-pulse bg-gray-200 h-3 w-16 rounded mb-1"></div>
                            <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                          </div>
                        ))}
                      </div>
                      <div className="cls-performance-score-section">
                        <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              commonData?.Top_Performing_APIs?.map((api: any, index: number) => (
                <div key={index} className="cls-api-row">
                  <div className="cls-api-left">
                    <div className="cls-api-icon">
                      <Zap size={20} />
                    </div>
                    <div className="cls-api-info">
                      <h3 className="cls-api-name">{api.API_Name}</h3>
                      <p className="cls-api-endpoint">{api.API_Endpoint}</p>
                    </div>
                  </div>
                  <div className="cls-api-right">
                    <div className="cls-api-metrics">
                      <div className="cls-metric-item">
                        <span className="cls-metric-label">Requests</span>
                        <span className="cls-metric-value">{api.Requests?.toLocaleString()}</span>
                      </div>
                      <div className="cls-metric-item">
                        <span className="cls-metric-label">Avg Response</span>
                        <span className="cls-metric-value">{api.Avg_Response_ms}ms</span>
                      </div>
                      <div className="cls-metric-item">
                        <span className="cls-metric-label">Success Rate</span>
                        <span className="cls-metric-value">{api.Success_Rate}</span>
                      </div>
                      <div className="cls-metric-item">
                        <span className="cls-metric-label">Growth</span>
                        <span className="cls-metric-value cls-growth">{api.Growth}</span>
                      </div>
                    </div>
                    <div className="cls-performance-score-section">
                      <Badge className={`cls-status-badge cls-${api.Performance_Status}`}>
                        {api.Performance_Status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* API Endpoint Details */}
        <Card className="cls-endpoint-card">
          <div className="cls-section-header">
            <div className="cls-section-title-row">
              <Activity className="cls-section-icon" size={20} />
              <div>
                <h2 className="cls-section-title">API Endpoint Details</h2>
              </div>
            </div>
            <Select value={selectedEndpointFilter} onValueChange={setSelectedEndpointFilter}>
              <SelectTrigger className="cls-filter-select">
                <SelectValue placeholder="All Endpoints" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Endpoints</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="cls-endpoint-content">
            {GetMenuApiAnalyticsDataResponse?.isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="cls-endpoint-item">
                    <div className="cls-endpoint-main-row">
                      <div className="cls-endpoint-left-section">
                        <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-5 w-16 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-3 w-24 rounded"></div>
                      </div>
                      <div className="cls-endpoint-stats-row">
                        {[1, 2, 3, 4].map((i) => (
                          <div className="cls-stat-column" key={i}>
                            <div className="animate-pulse bg-gray-200 w-4 h-4 rounded"></div>
                            <div className="cls-stat-info">
                              <div className="animate-pulse bg-gray-200 h-3 w-16 rounded mb-1"></div>
                              <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              filteredEndpoints.map((endpoint: any, index: number) => (
                <div key={index} className="cls-endpoint-item">
                  <div className="cls-endpoint-main-row">
                    <div className="cls-endpoint-left-section">
                      <span className={`cls-method cls-${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </span>
                      <span className="cls-endpoint-path">{endpoint.endpoint}</span>
                      <Badge className={`cls-status-badge cls-${endpoint.status}`}>
                        {endpoint.status}
                      </Badge>
                      <p className="cls-last-checked">
                        <Clock size={12} className="cls-clock-icon" />
                        Last error: {endpoint.last_error_ago}
                      </p>
                    </div>
                    <div className="cls-endpoint-stats-row">
                      <div className="cls-stat-column">
                        <Zap size={16} className="cls-stat-icon-purple" />
                        <div className="cls-stat-info">
                          <span className="cls-stat-label">Requests</span>
                          <span className="cls-stat-value">
                            {endpoint.metrics.requests?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="cls-stat-column">
                        <Clock size={16} className="cls-stat-icon-yellow" />
                        <div className="cls-stat-info">
                          <span className="cls-stat-label">Avg Response</span>
                          <span className="cls-stat-value">
                            {endpoint.metrics.avg_response_ms}ms
                          </span>
                        </div>
                      </div>
                      <div className="cls-stat-column">
                        <CheckCircle2 size={16} className="cls-stat-icon-green" />
                        <div className="cls-stat-info">
                          <span className="cls-stat-label">Success Rate</span>
                          <span className="cls-stat-value">
                            {endpoint.metrics.success_rate_percent}%
                          </span>
                        </div>
                      </div>
                      <div className="cls-stat-column">
                        <Activity size={16} className="cls-stat-icon-red" />
                        <div className="cls-stat-info">
                          <span className="cls-stat-label">Error Rate</span>
                          <span className="cls-stat-value">
                            {endpoint.metrics.error_rate_percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Two Column Layout: Rate Limiting & Geographic */}
        <div className="cls-two-column-layout">
          {/* Rate Limiting Status */}
          <Card className="cls-rate-limit-card">
            <div className="cls-section-header">
              <div className="cls-section-title-row">
                <Activity className="cls-section-icon" size={20} />
                <h2 className="cls-section-title">Rate Limiting Status</h2>
              </div>
            </div>
            <div className="cls-rate-limit-content">
              {analyticsCommonDataResponse?.isLoading ? (
                <>
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="cls-rate-limit-item">
                      <div className="cls-rate-limit-header">
                        <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-5 w-16 rounded"></div>
                      </div>
                      <div className="cls-rate-stats">
                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                      </div>
                      <div className="animate-pulse bg-gray-200 h-3 w-24 rounded"></div>
                    </div>
                  ))}
                </>
              ) : (
                commonData?.Rate_Limiting_Status?.map((rate: any, index: number) => (
                  <div key={index} className="cls-rate-limit-item">
                    <div className="cls-rate-limit-header">
                      <span className="cls-rate-endpoint">{rate?.API_Endpoint}</span>
                      <Badge className={`cls-status-badge cls-${rate?.Status}`}>
                        {rate?.Status}
                      </Badge>
                    </div>
                    <div className="cls-rate-stats">
                      <span>
                        <strong>{rate?.Usage}</strong> requests
                      </span>
                    </div>
                    <p className="cls-reset-time">Resets in {rate?.Reset_Time}</p>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Geographic Usage Distribution */}
          {JSON.parse(localStorage?.getItem('user') as string).role == 'superadmin' && <Card className="cls-geographic-card">
            <div className="cls-section-header">
              <div className="cls-section-title-row">
                <Activity className="cls-section-icon" size={20} />
                <h2 className="cls-section-title">
                  Geographic Usage Distribution
                </h2>
              </div>
            </div>
            <div className="cls-geographic-content">
              {analyticsCommonDataResponse?.isLoading ? (
                <>
                  <div className="animate-pulse bg-gray-200 h-4 w-48 rounded mb-6"></div>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="cls-country-row">
                      <div className="cls-country-info">
                        <div className="animate-pulse bg-gray-200 w-6 h-6 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                      </div>
                      <div className="cls-country-stats">
                        <div className="animate-pulse bg-gray-200 h-3 w-24 rounded"></div>
                      </div>
                      <div className="cls-country-bar-container">
                        <div className="animate-pulse bg-gray-200 h-2 w-full rounded"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <p className="cls-total-requests">
                    Total Global Requests:{" "}
                    {commonData?.Geographic_Usage_Distribution?.Total_Global_Requests?.toLocaleString()}
                  </p>
                  {commonData?.Geographic_Usage_Distribution?.Countries?.map(
                    (country: any, index: number) => (
                      <div key={index} className="cls-country-row">
                        <div className="cls-country-info">
                          <span className="cls-country-flag">
                            {country.Country === "United States"
                              ? "🇺🇸"
                              : country.Country === "United Kingdom"
                              ? "🇬🇧"
                              : country.Country === "Germany"
                              ? "🇩🇪"
                              : country.Country === "Canada"
                              ? "🇨🇦"
                              : country.Country === "Australia"
                              ? "🇦🇺"
                              : "🌍"}
                          </span>
                          <span className="cls-country-name">{country?.Country}</span>
                        </div>
                        <div className="cls-country-stats">
                          <span className="cls-country-percentage">
                            {country?.Usage_Percentage}
                          </span>
                          <span>•</span>
                          <span>{country?.Requests?.toLocaleString()} requests</span>
                          <span>•</span>
                          <span>{country?.Avg_Response_ms}ms avg</span>
                        </div>
                        <div className="cls-country-bar-container">
                          <div
                            className="cls-country-bar"
                            style={{ width: country?.Usage_Percentage }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </Card>}
        </div>

        {/* System Monitoring */}
        <Card className="cls-monitoring-card">
          <div className="cls-monitoring-content">
            <div className="cls-chart-header">
              <div className="cls-chart-title-row">
                <Activity className="cls-chart-icon" size={20} />
                <h2 className="cls-chart-title">System Performance Metrics</h2>
              </div>
              <div className="cls-chart-actions">
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="cls-timeframe-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1H">Last Hour</SelectItem>
                    <SelectItem value="24H">24 Hours</SelectItem>
                    <SelectItem value="7D">7 Days</SelectItem>
                    <SelectItem value="30D">30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <button className="cls-refresh-button" onClick={() => {
                  GetMenuPerformanceData({range : selectedTimeframe})
                  }}>
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            {GetMenuPerformanceDataResponse?.isLoading ? (
              <div className="cls-chart-placeholder">
                <div className="animate-pulse bg-gray-200 h-64 w-full rounded"></div>
              </div>
            ) : (
              <>
                <div className="cls-chart-placeholder">
                  <div className="cls-performance-chart">
                    <svg viewBox="0 0 800 300" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,150 Q100,120 200,140 T400,130 T600,145 T800,135 L800,300 L0,300 Z"
                        fill="url(#gradient1)"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,180 Q100,160 200,170 T400,165 T600,175 T800,170 L800,300 L0,300 Z"
                        fill="url(#gradient2)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,210 Q100,190 200,200 T400,195 T600,205 T800,200 L800,300 L0,300 Z"
                        fill="url(#gradient3)"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="cls-chart-labels">
                    {performanceData?.data?.map((item: any, index: number) => (
                      <span key={index}>{item.time_label}</span>
                    ))}
                  </div>
                </div>
                <div className="cls-chart-legend">
                  <div className="cls-legend-item">
                    <div className="cls-legend-dot cls-green" />
                    <span>
                      {performanceData?.series_legend?.metric_a_green || "Response Time"}
                    </span>
                  </div>
                  <div className="cls-legend-item">
                    <div className="cls-legend-dot cls-blue" />
                    <span>
                      {performanceData?.series_legend?.metric_b_blue || "Throughput"}
                    </span>
                  </div>
                  <div className="cls-legend-item">
                    <div className="cls-legend-dot cls-purple" />
                    <span>
                      {performanceData?.series_legend?.metric_c_orange || "Error Rate"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}