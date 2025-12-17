import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Package,
  Search,
  LayoutGrid,
  List,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  CheckCircle2,
  Users,
  TrendingUp,
  Check,
  X,
  PlusCircle,
  Award,
  Building,
  Server,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./Subscriptions.scss";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | string;
  apiCalls: number | string;
  overage: string;
  features: string[];
  status: "Active" | "Inactive";
  subscribers: number;
  icon: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Starter",
    price: 20.0,
    apiCalls: 25000,
    overage: "$0.10/call",
    features: [
      "Basic SAGE API access",
      "Email support",
      "Standard rate limiting",
      "Basic group engagement analytics",
      "Community forums support",
      "API documentation",
    ],
    status: "Active",
    subscribers: 45,
    icon: "star",
  },
  {
    id: "2",
    name: "Professional",
    price: 65.0,
    apiCalls: 100000,
    overage: "$0.08/call",
    features: [
      "Advanced SAGE API features",
      "Priority support",
      "Enhanced rate limiting",
      "Advanced group engagement analytics",
      "Custom group engagement tools",
      "API webhooks & integrations",
      "Real-time engagement tracking",
    ],
    status: "Active",
    subscribers: 128,
    icon: "award",
  },
  {
    id: "3",
    name: "Enterprise",
    price: 200.0,
    apiCalls: 500000,
    overage: "$0.05/call",
    features: [
      "Full SAGE API access",
      "24/7 phone support",
      "Custom rate limiting",
      "Enterprise group management",
      "White-label SAGE solutions",
      "SLA guarantee (99.9% uptime)",
      "Dedicated account manager",
      "Advanced security features",
    ],
    status: "Active",
    subscribers: 52,
    icon: "building",
  },
  {
    id: "4",
    name: "Custom/On-Premise",
    price: "Custom",
    apiCalls: "Unlimited",
    overage: "N/A",
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
    status: "Inactive",
    subscribers: 8,
    icon: "server",
  },
  {
    id: "5",
    name: "Basic",
    price: 10.0,
    apiCalls: 10000,
    overage: "$0.15/call",
    features: [
      "Limited SAGE API access",
      "Email support (48hr response)",
      "Basic rate limiting",
      "Standard documentation",
      "Community support",
    ],
    status: "Active",
    subscribers: 89,
    icon: "star",
  },
  {
    id: "6",
    name: "Business",
    price: 120.0,
    apiCalls: 250000,
    overage: "$0.06/call",
    features: [
      "Full SAGE API access",
      "Priority email & chat support",
      "Enhanced rate limiting",
      "Advanced analytics dashboard",
      "Custom integrations",
      "API webhooks",
      "Monthly review calls",
    ],
    status: "Active",
    subscribers: 73,
    icon: "award",
  },
  {
    id: "7",
    name: "Team",
    price: 45.0,
    apiCalls: 75000,
    overage: "$0.09/call",
    features: [
      "Team SAGE API access",
      "Priority support",
      "Team collaboration tools",
      "Enhanced analytics",
      "Multi-user access",
      "Shared API keys",
    ],
    status: "Active",
    subscribers: 95,
    icon: "award",
  },
  {
    id: "8",
    name: "Premium",
    price: 350.0,
    apiCalls: 1000000,
    overage: "$0.04/call",
    features: [
      "Unlimited SAGE API features",
      "24/7 premium support",
      "Custom rate limits",
      "Advanced security",
      "Dedicated infrastructure",
      "SLA guarantee (99.99% uptime)",
      "White-label options",
      "Priority feature requests",
    ],
    status: "Active",
    subscribers: 28,
    icon: "building",
  },
  {
    id: "9",
    name: "Developer",
    price: 35.0,
    apiCalls: 50000,
    overage: "$0.10/call",
    features: [
      "Developer SAGE API access",
      "Developer support",
      "Standard rate limiting",
      "Developer tools & SDKs",
      "Code examples",
      "API playground access",
    ],
    status: "Active",
    subscribers: 112,
    icon: "star",
  },
  {
    id: "10",
    name: "Lite",
    price: 5.0,
    apiCalls: 5000,
    overage: "$0.20/call",
    features: [
      "Basic SAGE API access",
      "Community support only",
      "Standard rate limiting",
      "Basic documentation",
    ],
    status: "Inactive",
    subscribers: 15,
    icon: "star",
  },
  {
    id: "11",
    name: "Scale",
    price: 500.0,
    apiCalls: 2000000,
    overage: "$0.03/call",
    features: [
      "Unlimited SAGE API access",
      "24/7 dedicated support",
      "Custom infrastructure",
      "Enterprise security",
      "SLA guarantee (99.99% uptime)",
      "Dedicated account team",
      "Custom development",
      "Training & onboarding",
      "Advanced compliance features",
    ],
    status: "Active",
    subscribers: 19,
    icon: "building",
  },
  {
    id: "12",
    name: "Growth",
    price: 85.0,
    apiCalls: 150000,
    overage: "$0.07/call",
    features: [
      "Advanced SAGE API features",
      "Priority support",
      "Enhanced rate limiting",
      "Growth analytics",
      "API webhooks",
      "Integration support",
      "Quarterly business reviews",
    ],
    status: "Active",
    subscribers: 64,
    icon: "award",
  },
];

export default function Subscriptions() {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    apiCalls: "",
    overage: "",
    status: "Active" as "Active" | "Inactive",
    subscribers: "",
    features: [] as string[],
  });
  const [newFeature, setNewFeature] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const filteredPlans = subscriptionPlans.filter((plan) => {
    const matchesSearch = plan.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || plan.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlans = filteredPlans.slice(startIndex, endIndex);

  const totalPlans = subscriptionPlans.length;
  const activePlans = subscriptionPlans.filter(
    (p) => p.status === "Active",
  ).length;
  const totalSubscribers = subscriptionPlans.reduce(
    (sum, p) => sum + p.subscribers,
    0,
  );
  const mostPopularPlan = subscriptionPlans.reduce((prev, current) =>
    prev.subscribers > current.subscribers ? prev : current,
  );

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      apiCalls: plan.apiCalls.toString(),
      overage: plan.overage,
      status: plan.status,
      subscribers: plan.subscribers.toString(),
      features: [...plan.features],
    });
    setIsEditDialogOpen(true);
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: "",
      apiCalls: "",
      overage: "",
      status: "Active",
      subscribers: "0",
      features: [],
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPlanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      console.log("Delete subscription plan:", planToDelete);
      // In a real application, you would call an API to delete the plan here.
      // For now, we'll just log and close the dialog.
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const handleSave = () => {
    console.log("Saving plan:", formData);
    // TODO: Implement save functionality
    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <AppLayout
      title="Subscription Plans"
      subtitle="Manage your SAGE subscription plans and features"
    >
      <div className="cls-subscriptions-container">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Plans</p>
                <h3 className="cls-stat-value">{totalPlans}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +0 from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-purple">
                <Package size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Plans</p>
                <h3 className="cls-stat-value">{activePlans}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +1 from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-green">
                <CheckCircle2 size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Subscribers</p>
                <h3 className="cls-stat-value">{totalSubscribers}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +15% from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-purple-light">
                <Users size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card cls-popular">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Most Popular Plan</p>
                <h3 className="cls-stat-value">{mostPopularPlan.name}</h3>
                <p className="cls-stat-subscribers">
                  {mostPopularPlan.subscribers} subscribers
                </p>
              </div>
              <div className="cls-stat-icon cls-gold">
                <Star size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="cls-filters-section">
          <div className="cls-search-container">
            {/* <Search
              className="cls-search-icon"
              size={18}
              onClick={() => {
                console.log(searchQuery);
              }}
            /> */}
            <Input
              placeholder="Search by plan name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cls-search-input"
            />
          </div>

          <div className="cls-actions-container">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="cls-filter-select">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="cls-view-toggle">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="cls-view-button"
              >
                <LayoutGrid size={16} />
                Card View
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="cls-view-button"
              >
                <List size={16} />
                List View
              </Button>
            </div>

            <Button className="cls-new-plan-button" onClick={handleAddPlan}>
              <Plus size={16} />
              New Plan
            </Button>
          </div>
        </div>

        {/* Card View */}
        {viewMode === "card" && (
          <>
            <div className="cls-plans-grid">
              {paginatedPlans.map((plan) => (
                <Card key={plan.id} className="cls-plan-card">
                  <CardContent className="cls-plan-content">
                    <div className="cls-plan-header">
                      <div className="cls-plan-title-row">
                        <div className="cls-plan-icon">
                          {plan.icon === "star" && <Star size={20} />}
                          {plan.icon === "award" && <Award size={20} />}
                          {plan.icon === "building" && <Building size={20} />}
                          {plan.icon === "server" && <Server size={20} />}
                        </div>
                        <h3 className="cls-plan-name">{plan.name}</h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cls-menu-button"
                          >
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(plan)}>
                            <Edit size={16} />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(plan.id)}
                            className="cls-delete-item"
                          >
                            <Trash2 size={16} />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="cls-plan-pricing">
                      <h2 className="cls-plan-price">
                        {typeof plan.price === "number"
                          ? `$${plan.price.toFixed(2)}`
                          : plan.price}
                      </h2>
                      <p className="cls-plan-period">
                        {typeof plan.price === "number" ? "/month" : ""}
                      </p>
                    </div>

                    <div className="cls-plan-api">
                      <p className="cls-api-calls">
                        {typeof plan.apiCalls === "number"
                          ? `${plan.apiCalls.toLocaleString()} SAGE API calls`
                          : `${plan.apiCalls} SAGE API calls`}
                      </p>
                    </div>

                    <div className="cls-plan-overage">
                      <p className="cls-overage-text">
                        Overage:{" "}
                        <span className="cls-overage-price">
                          {plan.overage}
                        </span>
                      </p>
                    </div>

                    <div className="cls-plan-features">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="cls-feature-item">
                          <Check size={16} className="cls-feature-check" />
                          <span className="cls-feature-text">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="cls-plan-footer">
                      <Badge
                        className={
                          plan.status === "Active"
                            ? "cls-badge-active"
                            : "cls-badge-inactive"
                        }
                      >
                        {plan.status}
                      </Badge>
                      <p className="cls-subscribers">
                        {plan.subscribers} subscribers
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <>
            <Card className="cls-table-card">
              <CardContent className="cls-table-content">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No.</TableHead>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>API Calls</TableHead>
                      <TableHead>Overage</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Subscribers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="cls-actions-head"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPlans.map((plan, index) => (
                      <TableRow key={plan.id}>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell className="cls-plan-name-cell">
                          {plan.name}
                        </TableCell>
                        <TableCell>
                          {typeof plan.price === "number"
                            ? `$${plan.price.toFixed(2)}/month`
                            : plan.price}
                        </TableCell>
                        <TableCell>
                          {typeof plan.apiCalls === "number"
                            ? plan.apiCalls.toLocaleString()
                            : plan.apiCalls}
                        </TableCell>
                        <TableCell>{plan.overage}</TableCell>
                        <TableCell>{plan.features.length} features</TableCell>
                        <TableCell>{plan.subscribers}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              plan.status === "Active"
                                ? "cls-badge-active"
                                : "cls-badge-inactive"
                            }
                          >
                            {plan.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cls-menu-button"
                              >
                                <MoreVertical size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(plan)}
                              >
                                <Edit size={16} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(plan.id)}
                                className="cls-delete-item"
                              >
                                <Trash2 size={16} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Pagination Controls */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPlans.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          startIndex={startIndex}
          endIndex={endIndex}
        />

        {/* Edit Plan Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="cls-edit-dialog">
            <DialogHeader>
              <DialogTitle>Edit Subscription Plan</DialogTitle>
              <DialogDescription>
                Update the details for this subscription plan.
              </DialogDescription>
            </DialogHeader>

            <div className="cls-dialog-form">
              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "Active" | "Inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="subscribers">Subscribers</Label>
                  <Input
                    id="subscribers"
                    type="number"
                    value={formData.subscribers}
                    onChange={(e) =>
                      setFormData({ ...formData, subscribers: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="api-calls">API Calls</Label>
                  <Input
                    id="api-calls"
                    type="number"
                    value={formData.apiCalls}
                    onChange={(e) =>
                      setFormData({ ...formData, apiCalls: e.target.value })
                    }
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="overage">Overage ($)</Label>
                  <Input
                    id="overage"
                    value={formData.overage}
                    onChange={(e) =>
                      setFormData({ ...formData, overage: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="cls-form-field-full">
                <Label>Features</Label>
                <div className="cls-features-list">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="cls-feature-row">
                      <Input value={feature} readOnly />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                        className="cls-remove-feature"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="cls-add-feature-row">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="cls-add-feature-button"
                  >
                    <PlusCircle size={16} />
                    Add Feature
                  </Button>
                </div>
                {formData.features.length > 0 && (
                  <div className="cls-new-feature-input">
                    <Input
                      placeholder="Enter new feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Plan Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="cls-edit-dialog">
            <DialogHeader>
              <DialogTitle>Add New Subscription Plan</DialogTitle>
              <DialogDescription>
                Create a new subscription plan with custom features.
              </DialogDescription>
            </DialogHeader>

            <div className="cls-dialog-form">
              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="add-plan-name">Plan Name</Label>
                  <Input
                    id="add-plan-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter plan name"
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="add-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "Active" | "Inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="add-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="add-price">Price ($)</Label>
                  <Input
                    id="add-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="add-subscribers">Subscribers</Label>
                  <Input
                    id="add-subscribers"
                    type="number"
                    value={formData.subscribers}
                    onChange={(e) =>
                      setFormData({ ...formData, subscribers: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="add-api-calls">API Calls</Label>
                  <Input
                    id="add-api-calls"
                    type="number"
                    value={formData.apiCalls}
                    onChange={(e) =>
                      setFormData({ ...formData, apiCalls: e.target.value })
                    }
                    placeholder="25000"
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="add-overage">Overage ($)</Label>
                  <Input
                    id="add-overage"
                    value={formData.overage}
                    onChange={(e) =>
                      setFormData({ ...formData, overage: e.target.value })
                    }
                    placeholder="0.10"
                  />
                </div>
              </div>

              <div className="cls-form-field-full">
                <Label>Features</Label>
                <div className="cls-features-list">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="cls-feature-row">
                      <Input value={feature} readOnly />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                        className="cls-remove-feature"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="cls-new-feature-input">
                  <Input
                    placeholder="Enter feature and press Enter or click Add"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="cls-add-feature-button"
                  >
                    <PlusCircle size={16} />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">Warning!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Do you want to delete this subscription plan? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}