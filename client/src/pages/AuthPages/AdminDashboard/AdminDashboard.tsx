import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, DollarSign, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useLazyGetAdminDashboardDataQuery } from "@/service/admin_dashboard/admin_dashboard";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [getAdminDashboardData, adminDashboardResponse] = useLazyGetAdminDashboardDataQuery();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    getAdminDashboardData();
  }, []);

  useEffect(() => {
    if (adminDashboardResponse?.isSuccess && adminDashboardResponse?.data) {
      setDashboardData(adminDashboardResponse.data);
    }
  }, [adminDashboardResponse]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "groupIcon":
        return <Users className="cls-metric-icon-svg" />;
      case "dollarIcon":
        return <DollarSign className="cls-metric-icon-svg" />;
      case "graphIcon":
        return <TrendingUp className="cls-metric-icon-svg" />;
      case "decreaseIcon":
        return <TrendingDown className="cls-metric-icon-svg" />;
      default:
        return null;
    }
  };

  const getIconBgClass = (iconName: string) => {
    switch (iconName) {
      case "groupIcon":
        return "cls-icon-blue";
      case "dollarIcon":
        return "cls-icon-green";
      case "graphIcon":
        return "cls-icon-yellow";
      case "decreaseIcon":
        return "cls-icon-red";
      default:
        return "cls-icon-blue";
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case "Professional":
        return "cls-badge-professional";
      case "Enterprise":
        return "cls-badge-enterprise";
      case "Starter":
        return "cls-badge-starter";
      case "Paid":
        return "cls-badge-paid";
      case "Pending":
        return "cls-badge-pending";
      case "Overdue":
        return "cls-badge-overdue";
      default:
        return "";
    }
  };

  const getMaxValue = () => {
    if (!dashboardData?.monthlyRevenue?.data) return 100000;
    const values = dashboardData.monthlyRevenue.data.map((item: any) => 
      parseInt(item.value.replace('K', '')) * 1000
    );
    const max = Math.max(...values);
    // Round up to nearest 10k for better scaling
    return Math.ceil(max / 10000) * 10000;
  };

  return (
    <AppLayout
      title="Admin Dashboard"
      subtitle="Global overview of customers, revenue, and platform health."
    >
      <div className="cls-admin-dashboard-container">
        {/* Main Info Cards */}
        <div className="cls-main-info-grid">
          {dashboardData?.mainInfo?.map((item: any, index: number) => (
            <Card key={index} className="cls-info-card">
              <div className="cls-info-card-content">
                <div className="cls-info-text">
                  <p className="cls-info-title">{item.title}</p>
                  <h2 className="cls-info-count">{item.count}</h2>
                  <p className="cls-info-value">{item.value}</p>
                </div>
                <div className={`cls-info-icon ${getIconBgClass(item.icon)}`}>
                  {getIconComponent(item.icon)}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="cls-charts-row">
          {/* Monthly Revenue Chart */}
          <Card className="cls-chart-card">
            <div className="cls-chart-header">
              <div>
                <h3 className="cls-chart-title">{dashboardData?.monthlyRevenue?.title}</h3>
                <p className="cls-chart-subtitle">{dashboardData?.monthlyRevenue?.subtitle}</p>
              </div>
            </div>
            <div className="cls-chart-content">
              <svg viewBox="0 0 600 250" className="cls-bar-chart">
                {dashboardData?.monthlyRevenue?.data?.map((item: any, index: number) => {
                  const value = parseInt(item.value.replace('K', '')) * 1000;
                  const maxValue = getMaxValue();
                  const chartHeight = 180;
                  const chartBottom = 200;
                  const barHeight = (value / maxValue) * chartHeight;
                  const x = 50 + index * 45;
                  const y = chartBottom - barHeight;

                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={y}
                        width="32"
                        height={barHeight}
                        fill="#6366F1"
                        rx="4"
                      />
                      <text
                        x={x + 16}
                        y="225"
                        textAnchor="middle"
                        fontSize="11"
                        fill="#6B7280"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}
                {/* Y-axis labels - dynamically calculated */}
                {(() => {
                  const maxValue = getMaxValue();
                  const steps = 5;
                  const chartHeight = 180;
                  const chartTop = 20;
                  return Array.from({ length: steps }, (_, i) => {
                    const value = (maxValue / 1000) * (1 - i / (steps - 1));
                    const y = chartTop + (chartHeight * i / (steps - 1));
                    return (
                      <text key={i} x="5" y={y + 4} fontSize="10" fill="#9CA3AF" textAnchor="start">
                        ${Math.round(value)}k
                      </text>
                    );
                  });
                })()}
                {/* Horizontal grid lines */}
                {Array.from({ length: 5 }, (_, i) => {
                  const y = 20 + (180 * i / 4);
                  return (
                    <line key={i} x1="40" y1={y} x2="590" y2={y} stroke="#F3F4F6" strokeWidth="1" />
                  );
                })}
              </svg>
            </div>
          </Card>

          {/* Recent Customer Sign-ups */}
          <Card className="cls-customers-card">
            <div className="cls-customers-header">
              <div>
                <h3 className="cls-card-title">{dashboardData?.recentCustomer?.title}</h3>
                <p className="cls-card-subtitle">{dashboardData?.recentCustomer?.subtitle}</p>
              </div>
            </div>
            <div className="cls-customers-list">
              {dashboardData?.recentCustomer?.data?.slice(0, 5).map((customer: any, index: number) => (
                <div key={index} className="cls-customer-item">
                  <Avatar className="cls-customer-avatar">
                    <AvatarFallback>
                      {customer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="cls-customer-info">
                    <p className="cls-customer-name">{customer.name}</p>
                    <p className="cls-customer-email">{customer.mailId}</p>
                  </div>
                  <div className="cls-customer-meta">
                    <Badge className={getBadgeClass(customer.employeeType)}>
                      {customer.employeeType}
                    </Badge>
                    <p className="cls-customer-time">{customer.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="cls-view-all-button"
              onClick={() => setLocation('/users')}
            >
              View All Customers <ArrowRight className="cls-arrow-icon" />
            </Button>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="cls-bottom-row">
          {/* Top Customers by API Usage */}
          <Card className="cls-usage-card">
            <div className="cls-card-header">
              <div>
                <h3 className="cls-card-title">{dashboardData?.topCustomer?.title}</h3>
                <p className="cls-card-subtitle">{dashboardData?.topCustomer?.subtitle}</p>
              </div>
            </div>
            <div className="cls-usage-table">
              <div className="cls-table-header">
                <span className="cls-th-organization">Organization</span>
                <span className="cls-th-plan">Plan</span>
                <span className="cls-th-usage">Usage</span>
              </div>
              {dashboardData?.topCustomer?.data?.map((customer: any, index: number) => {
                const usagePercent = (parseInt(customer.Usage.replace(/,/g, '')) / parseInt(customer.total.replace(/,/g, ''))) * 100;

                return (
                  <div key={index} className="cls-table-row">
                    <span className="cls-td-organization">{customer.Organization}</span>
                    <Badge className={getBadgeClass(customer.plan)}>{customer.plan}</Badge>
                    <div className="cls-td-usage">
                      <div className="cls-usage-bar-container">
                        <div 
                          className="cls-usage-bar-fill"
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                      <span className="cls-usage-text">
                        {customer.Usage} / {customer.total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Billing Activity */}
          <Card className="cls-billing-card">
            <div className="cls-card-header">
              <div>
                <h3 className="cls-card-title">{dashboardData?.recentBilling?.title}</h3>
                <p className="cls-card-subtitle">{dashboardData?.recentBilling?.subtitle}</p>
              </div>
            </div>
            <div className="cls-billing-list">
              {dashboardData?.recentBilling?.data?.map((billing: any, index: number) => (
                <div key={index} className="cls-billing-item">
                  <div className="cls-billing-info">
                    <p className="cls-billing-org">{billing.organizations}</p>
                    <p className="cls-billing-time">{billing.time}</p>
                  </div>
                  <div className="cls-billing-meta">
                    <p className="cls-billing-amount">{billing.amount}</p>
                    <Badge className={getBadgeClass(billing.status)}>{billing.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}