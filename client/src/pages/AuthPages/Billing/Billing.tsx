import { useState, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Download,
  CreditCard,
  CheckCircle2,
  Info,
  Search,
  Settings2,
  FileDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TablePagination } from "@/components/ui/table-pagination";
import BillingPayment from "./BillingPayment/BillingPayment";
import "./Billing.scss";

interface Invoice {
  id: number;
  invoiceId: string;
  billingDate: string;
  paidDate: string;
  paymentMethod: string;
  amount: number;
  status: string;
}

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceId: "SAGE-INV-001",
    billingDate: "2024-12-01",
    paidDate: "2024-12-01",
    paymentMethod: "Visa **** 4532",
    amount: 20000.0,
    status: "Paid",
  },
  {
    id: 2,
    invoiceId: "SAGE-INV-002",
    billingDate: "2024-11-01",
    paidDate: "2024-11-02",
    paymentMethod: "Visa **** 4532",
    amount: 19150.0,
    status: "Paid",
  },
  {
    id: 3,
    invoiceId: "SAGE-INV-003",
    billingDate: "2024-10-01",
    paidDate: "2024-10-01",
    paymentMethod: "Visa **** 4532",
    amount: 20100.0,
    status: "Paid",
  },
  {
    id: 4,
    invoiceId: "SAGE-INV-004",
    billingDate: "2024-09-01",
    paidDate: "2024-09-03",
    paymentMethod: "Visa **** 4532",
    amount: 22750.0,
    status: "Paid",
  },
  {
    id: 5,
    invoiceId: "SAGE-INV-005",
    billingDate: "2024-08-01",
    paidDate: "2024-08-01",
    paymentMethod: "Visa **** 4532",
    amount: 19610.0,
    status: "Paid",
  },
  {
    id: 6,
    invoiceId: "SAGE-INV-006",
    billingDate: "2024-07-01",
    paidDate: "2024-07-02",
    paymentMethod: "Mastercard **** 8821",
    amount: 21200.0,
    status: "Paid",
  },
  {
    id: 7,
    invoiceId: "SAGE-INV-007",
    billingDate: "2024-06-01",
    paidDate: "",
    paymentMethod: "Visa **** 4532",
    amount: 18900.0,
    status: "Pending",
  },
  {
    id: 8,
    invoiceId: "SAGE-INV-008",
    billingDate: "2024-05-01",
    paidDate: "2024-05-01",
    paymentMethod: "Amex **** 1009",
    amount: 20000.0,
    status: "Paid",
  },
  {
    id: 9,
    invoiceId: "SAGE-INV-009",
    billingDate: "2024-04-01",
    paidDate: "",
    paymentMethod: "Visa **** 4532",
    amount: 19500.0,
    status: "Overdue",
  },
  {
    id: 10,
    invoiceId: "SAGE-INV-010",
    billingDate: "2024-03-01",
    paidDate: "2024-03-03",
    paymentMethod: "Visa **** 4532",
    amount: 22100.0,
    status: "Paid",
  },
  {
    id: 11,
    invoiceId: "SAGE-INV-011",
    billingDate: "2024-02-01",
    paidDate: "",
    paymentMethod: "Mastercard **** 8821",
    amount: 20800.0,
    status: "Pending",
  },
  {
    id: 12,
    invoiceId: "SAGE-INV-012",
    billingDate: "2024-01-01",
    paidDate: "2024-01-01",
    paymentMethod: "Visa **** 4532",
    amount: 19200.0,
    status: "Paid",
  },
];

export default function Billing() {
  const invoicesSectionRef = useRef<HTMLDivElement>(null);
  const plansSectionRef = useRef<HTMLDivElement>(null);
  const [currentPlanName, setCurrentPlanName] = useState("Enterprise"); // The actual current plan
  const [selectedPlan, setSelectedPlan] = useState("Enterprise");
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [columnVisibility, setColumnVisibility] = useState({
    billingDate: true,
    paidDate: true,
    paymentMethod: true,
    amount: true,
    status: true,
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Scroll to invoices section
  const scrollToInvoices = () => {
    invoicesSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Scroll to plans section
  const scrollToPlans = () => {
    plansSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Handle plan switching
  const handleSwitchPlan = (planName: string) => {
    if (planName !== currentPlanName && planName !== "Custom/On-Premise") {
      setCurrentPlanName(planName);
      setSelectedPlan(planName);
    }
  };

  const currentPlan = {
    name: "SAGE Enterprise",
    price: 20000.0,
    apiCalls: 500000,
    used: 420000,
    overage: "$0.05/call",
    percentage: 84,
    billingDate: "August 1st, 2025",
    estimatedAmount: "$20,000.00",
    paymentMethod: "Visa **** 4532",
    overageStatus: "$0.00/call",
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceId
        .toLowerCase()
        .includes(invoiceSearchQuery.toLowerCase()) ||
      invoice.paymentMethod
        .toLowerCase()
        .includes(invoiceSearchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredInvoices.length);
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

  // Export all invoices
  const handleExportAllInvoices = () => {
    const csvContent = [
      [
        "Invoice ID",
        "Billing Date",
        "Paid Date",
        "Payment Method",
        "Amount",
        "Status",
      ],
      ...invoices.map((inv) => [
        inv.invoiceId,
        inv.billingDate,
        inv.paidDate,
        inv.paymentMethod,
        `$${inv.amount.toLocaleString()}`,
        inv.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sage-invoices.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download single invoice PDF
  const handleDownloadPDF = (invoice: Invoice) => {
    // Simulate PDF download
    alert(`Downloading PDF for ${invoice.invoiceId}`);
  };

  const plans = [
    {
      name: "Starter",
      price: "$2,000.00",
      priceValue: 2000,
      apiCalls: "25,000 SAGE API calls",
      overage: "Overage: $0.10/call",
      features: [
        "Basic API access",
        "Email support",
        "Standard rate limiting",
        "Basic group engagement analytics",
        "Community forum access",
        "API documentation",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$6,500.00",
      priceValue: 6500,
      apiCalls: "100,000 SAGE API calls",
      overage: "Overage: $0.08/call",
      features: [
        "Advanced SAGE API features",
        "Priority support",
        "Enhanced rate limiting",
        "Advanced group engagement analytics",
        "Custom group configurations",
        "API webhooks & integrations",
        "Real-time usage monitoring",
      ],
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "$20,000.00",
      priceValue: 20000,
      apiCalls: "500,000 SAGE API calls",
      overage: "Overage: $0.05/call",
      features: [
        "Full SAGE API access",
        "24/7 phone support",
        "Custom rate limiting",
        "Enterprise group management",
        "White-label SAGE solutions",
        "Advanced security features",
        "Dedicated account manager",
        "Enterprise security features",
      ],
      highlighted: true,
    },
    {
      name: "Custom/On-Premise",
      price: "Custom Quote",
      priceValue: 0,
      apiCalls: "Unlimited SAGE API calls",
      overage: "",
      features: [
        "Unlimited SAGE API access",
        "On-premise SAGE deployment",
        "Custom SLA agreements",
        "Dedicated SAGE infrastructure",
        "Custom group engagement features",
        "Advanced security & compliance",
        "Training & onboarding support",
        "Custom development support",
      ],
      highlighted: false,
    },
  ];

  return (
    <AppLayout
      title="SAGE Billing Overview"
      subtitle="Manage your billing, API subscription, usage, and payment methods"
    >
      <div className="cls-billing-container">
        {/* High Usage Alert */}
        <div className="cls-alert-banner">
          <div className="cls-alert-content">
            <AlertTriangle className="cls-alert-icon" />
            <div className="cls-alert-text">
              <strong>High SAGE API Usage Alert</strong>
              <p>
                You've used 84% of your monthly SAGE API calls. Additional calls
                will be charged at $0.05/call.
              </p>
            </div>
          </div>
          <Button variant="outline" className="cls-alert-button" onClick={scrollToPlans}>
            Upgrade Plan
          </Button>
        </div>

        {/* API Usage Insights */}
        <div className="cls-insights-section">
          <h2 className="cls-section-title">SAGE API Usage Insights</h2>
          <p className="cls-section-subtitle">
            Track your group engagement API performance
          </p>

          <div className="cls-stats-grid">
            <Card className="cls-stat-card cls-stat-primary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">
                  {currentPlan.used.toLocaleString()}
                </div>
                <div className="cls-stat-label">SAGE API Calls This Month</div>
              </CardContent>
            </Card>

            <Card className="cls-stat-card cls-stat-secondary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">14,000</div>
                <div className="cls-stat-label">Daily Average Calls</div>
              </CardContent>
            </Card>

            <Card className="cls-stat-card cls-stat-tertiary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">{currentPlan.percentage}%</div>
                <div className="cls-stat-label">Plan Utilization</div>
              </CardContent>
            </Card>
          </div>

          <div className="cls-performance-text-section">
            <p className="cls-performance-label">
              Group Engagement Performance
            </p>
            <p className="cls-performance-description">
              Your SAGE API is enabling seamless group interactions with 84%
              efficiency
            </p>
          </div>
        </div>

        {/* Current Plan & Next Billing */}
        <div className="cls-plan-billing-grid">
          <Card className="cls-current-plan-card">
            <CardContent className="cls-plan-content">
              <div className="cls-plan-header">
                <h3 className="cls-plan-title">Current SAGE Plan</h3>
                <Button variant="outline" size="sm">
                  Modify
                </Button>
              </div>

              <div className="cls-plan-name">{currentPlan.name}</div>
              <div className="cls-plan-price">
                ${currentPlan.price.toLocaleString()}/month
              </div>

              <div className="cls-plan-details">
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Calls This Month</span>
                  <span className="cls-detail-value">
                    {currentPlan.used.toLocaleString()} calls
                  </span>
                </div>
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Remaining</span>
                  <span className="cls-detail-value">
                    {(currentPlan.apiCalls - currentPlan.used).toLocaleString()}{" "}
                    calls
                  </span>
                </div>
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Overage Rate</span>
                  <span className="cls-detail-value cls-overage-rate">
                    {currentPlan.overageStatus}
                  </span>
                </div>
              </div>

              <div className="cls-usage-section">
                <div className="cls-usage-header">
                  <span>Usage</span>
                  <span className="cls-usage-percent">
                    {currentPlan.percentage}%
                  </span>
                </div>
                <Progress
                  value={currentPlan.percentage}
                  className="cls-usage-progress"
                />
              </div>

              <div className="cls-plan-costs">
                <div className="cls-cost-row">
                  <span>Base Monthly Cost:</span>
                  <span>${currentPlan.price.toLocaleString()}</span>
                </div>
                <div className="cls-cost-row cls-cost-total">
                  <span>Total Monthly Cost:</span>
                  <span>${currentPlan.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cls-next-billing-card">
            <CardContent className="cls-billing-content">
              <h3 className="cls-billing-title">Next SAGE Billing</h3>

              <div className="cls-billing-date-label">Next billing date</div>
              <div className="cls-billing-date">{currentPlan.billingDate}</div>

              <div className="cls-billing-details">
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Estimated Amount</span>
                  <span className="cls-billing-value">
                    {currentPlan.estimatedAmount}
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Payment Method</span>
                  <span className="cls-billing-value">
                    {currentPlan.paymentMethod}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cls-default-btn"
                    >
                      Default
                    </Button>
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Estimated Amount</span>
                  <span className="cls-billing-value cls-billing-highlight">
                    {currentPlan.estimatedAmount}
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">
                    Current Overage Status
                  </span>
                  <span className="cls-billing-value cls-overage-status">
                    {currentPlan.overageStatus}
                  </span>
                </div>
              </div>

              <div className="cls-billing-actions">
                <Button 
                  variant="default" 
                  className="cls-billing-action-btn"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  <CreditCard size={16} />
                  Update Payment Method
                </Button>
                <Button 
                  variant="secondary" 
                  className="cls-billing-action-btn"
                  onClick={scrollToInvoices}
                >
                  <Download size={16} />
                  View SAGE Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overage Rate Comparison */}
        <Card className="cls-overage-card">
          <CardContent className="cls-overage-content">
            <div className="cls-overage-header">
              <h3 className="cls-overage-title">Overage Rate Comparison</h3>
              <p className="cls-overage-subtitle">
                Compare average charges when you exceed your monthly limit
              </p>
            </div>

            <div className="cls-overage-grid">
              <div className="cls-overage-plan cls-overage-starter">
                <div className="cls-overage-plan-name">SAGE Starter</div>
                <div className="cls-overage-plan-rate">$0.10</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 25,000 SAGE API calls
                </div>
              </div>

              <div className="cls-overage-plan cls-overage-professional">
                <div className="cls-overage-plan-name">SAGE Professional</div>
                <div className="cls-overage-plan-rate">$0.08</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 100,000 SAGE API calls
                </div>
              </div>

              <div className="cls-overage-plan cls-overage-enterprise">
                <div className="cls-overage-plan-name">SAGE Enterprise</div>
                <div className="cls-overage-plan-rate">$0.05</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 500,000 SAGE API calls
                </div>
              </div>
            </div>

            <div className="cls-overage-note">
              <Info size={16} />
              <p>
                <strong>Cost Savings Tip:</strong> Higher plans have lower
                overage rates. If you consistently exceed your limit, upgrading
                to a higher plan can save you money on overage charges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="cls-plans-section" ref={plansSectionRef}>
          <h2 className="cls-section-title">Available SAGE Plans</h2>
          <p className="cls-section-subtitle">
            Compare all SAGE tiers that best fit your group engagement API needs
          </p>

          <div className="cls-plans-grid">
            {plans.map((plan) => {
              const isCurrentPlan = plan.name === currentPlanName;
              const isSelectedPlan = selectedPlan === plan.name;
              
              return (
                <Card
                  key={plan.name}
                  className={`cls-plan-card ${
                    isCurrentPlan ? "cls-plan-highlighted" : ""
                  } ${isSelectedPlan ? "cls-plan-selected" : ""}`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  <CardContent className="cls-plan-card-content">
                    {isCurrentPlan && (
                      <div className="cls-current-plan-badge">
                        <CheckCircle2 size={14} />
                        Current Plan
                      </div>
                    )}
                    {!isCurrentPlan && isSelectedPlan && (
                      <div className="cls-selected-plan-badge">
                        <CheckCircle2 size={14} />
                        Selected Plan
                      </div>
                    )}

                    <div className="cls-plan-card-body">
                      <div className="cls-plan-card-header">
                        <div className="cls-plan-card-name">{plan.name}</div>
                        <div className="cls-plan-card-price">{plan.price}</div>
                        {plan.priceValue > 0 && (
                          <div className="cls-plan-card-period">per month</div>
                        )}
                      </div>

                      <div className="cls-plan-card-calls">{plan.apiCalls}</div>
                      {plan.overage && (
                        <div className="cls-plan-card-overage">{plan.overage}</div>
                      )}

                      <div className="cls-plan-card-features">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="cls-feature-item">
                            <CheckCircle2 size={16} className="cls-feature-icon" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="cls-plan-select-btn"
                      variant={isCurrentPlan ? "default" : "outline"}
                      disabled={isCurrentPlan}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCurrentPlan) {
                          if (plan.name === "Custom/On-Premise") {
                            // Handle custom plan contact
                            alert("Please contact SAGE Sales for custom pricing");
                          } else {
                            handleSwitchPlan(plan.name);
                          }
                        }
                      }}
                    >
                      {plan.name === "Custom/On-Premise"
                        ? "Contact SAGE Sales"
                        : isCurrentPlan
                        ? "Current Plan"
                        : "Switch Plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Invoices */}
        <Card className="cls-invoices-card" ref={invoicesSectionRef}>
          <CardContent className="cls-invoices-content">
            <div className="cls-invoices-header">
              <div className="cls-invoices-header-left">
                <h3 className="cls-invoices-title">Recent SAGE Invoices</h3>
                <p className="cls-invoices-subtitle">
                  View and manage your billing history
                </p>
              </div>
              <div className="cls-invoices-header-right">
                <div className="cls-search-wrapper">
                  {/* <Search className="cls-search-icon" /> */}
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={invoiceSearchQuery}
                    onChange={(e) => {
                      setInvoiceSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="cls-customize-button">
                      <Settings2 size={16} />
                      Customize
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="cls-customize-popover" align="end">
                    <div className="cls-customize-header">
                      <h4>Customize Columns</h4>
                      <p>Select columns to display</p>
                    </div>
                    <div className="cls-customize-options">
                      <div className="cls-customize-option">
                        <Checkbox
                          id="billingDate"
                          checked={columnVisibility.billingDate}
                          onCheckedChange={(checked) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              billingDate: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="billingDate">Billing Date</Label>
                      </div>
                      <div className="cls-customize-option">
                        <Checkbox
                          id="paidDate"
                          checked={columnVisibility.paidDate}
                          onCheckedChange={(checked) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              paidDate: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="paidDate">Paid Date</Label>
                      </div>
                      <div className="cls-customize-option">
                        <Checkbox
                          id="paymentMethod"
                          checked={columnVisibility.paymentMethod}
                          onCheckedChange={(checked) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              paymentMethod: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                      </div>
                      <div className="cls-customize-option">
                        <Checkbox
                          id="amount"
                          checked={columnVisibility.amount}
                          onCheckedChange={(checked) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              amount: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="amount">Amount</Label>
                      </div>
                      <div className="cls-customize-option">
                        <Checkbox
                          id="status"
                          checked={columnVisibility.status}
                          onCheckedChange={(checked) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              status: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="status">Status</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAllInvoices}
                >
                  <FileDown size={16} />
                  Export All Invoices
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  {columnVisibility.billingDate && (
                    <TableHead>Billing Date</TableHead>
                  )}
                  {columnVisibility.paidDate && (
                    <TableHead>Paid Date</TableHead>
                  )}
                  {columnVisibility.paymentMethod && (
                    <TableHead>Payment Method</TableHead>
                  )}
                  {columnVisibility.amount && <TableHead>Amount</TableHead>}
                  {columnVisibility.status && <TableHead>Status</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice, index) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell className="cls-invoice-id">
                        {invoice.invoiceId}
                      </TableCell>
                      {columnVisibility.billingDate && (
                        <TableCell>{invoice.billingDate}</TableCell>
                      )}
                      {columnVisibility.paidDate && (
                        <TableCell>{invoice.paidDate}</TableCell>
                      )}
                      {columnVisibility.paymentMethod && (
                        <TableCell>{invoice.paymentMethod}</TableCell>
                      )}
                      {columnVisibility.amount && (
                        <TableCell className="cls-invoice-amount">
                          ${invoice.amount.toLocaleString()}
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell>
                          <Badge 
                            className={
                              invoice.status === "Paid" 
                                ? "cls-badge-paid" 
                                : invoice.status === "Pending"
                                ? "cls-badge-pending"
                                : "cls-badge-overdue"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="default"
                          size="sm"
                          className="cls-download-pdf-btn"
                          onClick={() => handleDownloadPDF(invoice)}
                        >
                          <Download size={16} />
                          Download PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="cls-no-data">
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredInvoices.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}

        {/* Payment Modal */}
        <BillingPayment
          open={isPaymentModalOpen}
          onOpenChange={setIsPaymentModalOpen}
        />
      </div>
    </AppLayout>
  );
}
