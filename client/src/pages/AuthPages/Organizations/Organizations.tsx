import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TablePagination } from "@/components/ui/table-pagination";
import {
  Building2,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Settings2,
  Copy,
} from "lucide-react";
import OrganizationForm from "./OrganizationForm/OrganizationForm";
import "./Organizations.scss";
import {
  useLazyGetOrganisationDataQuery,
  useCreateOrganizationsMutation,
  useUpdateOrganizationsMutation,
} from "@/service/organisation/organisation";
import { truncateString } from "@/Utils/commonFunction";

interface Organization {
  id: number;
  name: string;
  email: string;
  subscriptionPlan: string;
  userCount: number;
  apiUsage: {
    percentage: number;
    used: number;
    total: number;
  };
  status: "Active" | "Inactive";
  lastActive: string;
  billingStatus: "Paid" | "Pending" | "Overdue";
  lastBillDate: string;
}

export default function Organizations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<number | null>(null);

  // The following line is used to define the service for getting the list of organisation
  const [organisationList, organisationListResponse] =
    useLazyGetOrganisationDataQuery();

  // Mutation hooks for create and update
  const [createOrganization, createOrganizationResponse] =
    useCreateOrganizationsMutation();
  const [updateOrganization, updateOrganizationResponse] =
    useUpdateOrganizationsMutation();

  // State to hold organization data from API
  const [organizationData, setOrganizationData] = useState<any>(null);

  // The following useEffect is used to triggered the list service at initial rendering
  useEffect(() => {
    organisationList({ page: currentPage, page_size: itemsPerPage });
  }, [currentPage, itemsPerPage]);

  // The following useEffect is used to set the response from the API.
  useEffect(() => {
    if (organisationListResponse?.isSuccess && organisationListResponse?.data) {
      console.log("Organization API Response:", organisationListResponse?.data);
      setOrganizationData(organisationListResponse?.data);
    }
  }, [organisationListResponse]);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    apiKey: true,
    environment: true,
    createdAt: true,
    // plan: true,
    // users: true,
    // usage: true,
    // status: true,
    // billingStatus: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Map API response to match the Organization interface
  const mappedOrganizations: any[] =
    organizationData?.results?.map((org: any) => ({
      id: org.id,
      name: org.name,
      apiKey: org.api_keys[0]?.key || "N/A",
      environment: org.api_keys[0]?.environment || "N/A",
      createdAt: new Date(org.created_at).toLocaleDateString(),
      // subscriptionPlan: "Enterprise",
      // userCount: 1,
      // apiUsage: { percentage: 0, used: 0, total: 1000000 },
      // status: "Active" as const,
      // billingStatus: "Pending" as const,
    })) || [];

  const totalOrganizations = organizationData?.count || 0;
  const activeOrganizations = mappedOrganizations.length;
  const enterprisePlans = 0; // Will be calculated when subscriptionPlan is available
  const highApiUsage = 0; // Will be calculated when apiUsage is available

  // Filter organizations based on search query (client-side filtering for current page)
  const filteredOrganizations = mappedOrganizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate total pages based on API count and items per page
  const totalPages = Math.ceil(totalOrganizations / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Use filtered organizations for display (already paginated from API)
  const paginatedOrganizations = filteredOrganizations;

  const handleEditOrganization = (org: Organization) => {
    setEditingOrganization(org);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteOrganization = (orgId: number) => {
    setOrgToDelete(orgId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orgToDelete) {
      console.log("Delete organization:", orgToDelete);
      setDeleteDialogOpen(false);
      setOrgToDelete(null);
    }
  };

  const handleCreateOrganization = () => {
    setEditingOrganization(null);
    setIsCreateDialogOpen(true);
  };

  const handleCopyKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // Prepare common payload fields
      const basePayload = {
        name: data.organizationName,
        owner_email: data.ownerEmail,
        subscription_plan: data.subscriptionPlan,
        api_limit: parseInt(data.customApiLimit) || 0,
        number_of_users: parseInt(data.numberOfUsers) || 1,
        status: data.status,
        billing_status: data.billingStatus,
        send_invitation: data.sendInvitation,
        require_password_reset: data.requirePasswordReset,
        notes: data.notes || "",
      };

      let payload = {
        name: basePayload?.name,
        limit_month: basePayload?.api_limit,
        is_active: (basePayload?.status as string)?.toLowerCase() === "active",
      };

      if (editingOrganization) {
        // Update existing organization
        const updatePayload = {
          id: editingOrganization ? editingOrganization.id : undefined,
          ...payload,
        };
        await updateOrganization(updatePayload).unwrap();
        console.log("Organization updated successfully");
      } else {
        // Create new organization
        await createOrganization(payload).unwrap();
        console.log("Organization created successfully");
      }

      // Refresh the organization list
      organisationList({ page: currentPage, page_size: itemsPerPage });

      // Close the dialog
      setIsCreateDialogOpen(false);
      setEditingOrganization(null);
    } catch (error) {
      console.error("Error saving organization:", error);
    }
  };

  return (
    <AppLayout
      title="Organizations"
      subtitle="Manage organizations within your SAGE ecosystem"
    >
      <div className="cls-organizations-container">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Organizations</p>
                <h3 className="cls-stat-value">{totalOrganizations}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <Building2 />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Organizations</p>
                <h3 className="cls-stat-value">{activeOrganizations}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+1 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <Activity />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Enterprise Plans</p>
                <h3 className="cls-stat-value">{enterprisePlans}</h3>
                <div className="cls-stat-change cls-stat-neutral">
                  <span>Stable from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-purple">
                <Shield />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">High API Usage</p>
                <h3 className="cls-stat-value">{highApiUsage}</h3>
                <div className="cls-stat-change cls-stat-negative">
                  <TrendingDown size={14} />
                  <span>-1 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <TrendingUp />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organizations Table */}
        <Card className="cls-organizations-card">
          <div className="cls-organizations-header">
            <div className="cls-header-left">
              <Building2 className="cls-header-icon" />
              <h2 className="cls-header-title">All Organizations</h2>
            </div>
            <div className="cls-header-right">
              <div className="cls-search-wrapper">
                <Search
                  className="cls-search-icon cursor-pointer"
                  onClick={() => {
                    organisationList({
                      page: 1,
                      page_size: itemsPerPage,
                      search: searchQuery,
                    });
                    setCurrentPage(1);
                  }}
                />
                <Input
                  placeholder="Enter to search overall Organizations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value?.length === 0) {
                      organisationList({
                        page: 1,
                        page_size: itemsPerPage,
                        search: undefined,
                      });
                      setCurrentPage(1);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      organisationList({
                        page: 1,
                        page_size: itemsPerPage,
                        search: searchQuery,
                      });
                      setCurrentPage(1);
                    }
                  }}
                  className="cls-search-input"
                />
              </div>

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
                  <div className="cls-column-options">
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-apikey"
                        checked={columnVisibility.apiKey}
                        onCheckedChange={() => toggleColumn("apiKey")}
                      />
                      <Label htmlFor="col-apikey">API Key</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-environment"
                        checked={columnVisibility.environment}
                        onCheckedChange={() => toggleColumn("environment")}
                      />
                      <Label htmlFor="col-environment">Environment</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-created"
                        checked={columnVisibility.createdAt}
                        onCheckedChange={() => toggleColumn("createdAt")}
                      />
                      <Label htmlFor="col-created">Created Date</Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                className="cls-create-btn"
                onClick={handleCreateOrganization}
              >
                <Plus size={18} />
                New Organization
              </Button>
            </div>
          </div>

          <div className="cls-table-wrapper">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cls-th-sno">S.No.</TableHead>
                  <TableHead className="cls-th-name">
                    Organization Name
                  </TableHead>
                  {columnVisibility.apiKey && (
                    <TableHead className="cls-th-apikey">API Key</TableHead>
                  )}
                  {columnVisibility.environment && (
                    <TableHead className="cls-th-environment">
                      Environment
                    </TableHead>
                  )}
                  {columnVisibility.createdAt && (
                    <TableHead className="cls-th-created">
                      Created Date
                    </TableHead>
                  )}
                  <TableHead className="cls-th-actions">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrganizations.length > 0 ? (
                  paginatedOrganizations.map((org, index) => (
                    <TableRow key={org.id} className="cls-table-row">
                      <TableCell className="cls-td-sno">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="cls-td-name">
                        <div className="cls-org-info">
                          <span className="cls-org-name">{org.name}</span>
                          {/* <span className="cls-org-id">ID: {org.id}</span> */}
                        </div>
                      </TableCell>
                      {columnVisibility.apiKey && (
                        <TableCell className="cls-td-apikey">
                          <div className="cls-api-key-cell">
                            <code className="cls-api-key-code">
                              {truncateString(org?.apiKey, 20)}
                            </code>
                            <button
                              onClick={() => handleCopyKey(org?.apiKey)}
                              className="cls-copy-button"
                              title="Copy API Key"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </TableCell>
                      )}
                      {/* {columnVisibility.environment && (
                        <TableCell className="cls-td-environment">
                          <Badge variant="outline">{org.environment}</Badge>
                        </TableCell>
                      )} */}
                      {columnVisibility.environment && (
                        <TableCell>
                          <Badge
                            className={`cls-env-badge cls-env-${org.environment.toLowerCase()}`}
                          >
                            {org.environment}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.createdAt && (
                        <TableCell className="cls-td-created">
                          {org.createdAt}
                        </TableCell>
                      )}
                      <TableCell className="cls-td-actions">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cls-actions-btn"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditOrganization(org)}
                              className="cls-menu-item"
                            >
                              <Pencil size={16} />
                              Edit Organization
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteOrganization(org.id)}
                              className="cls-menu-item cls-delete-item"
                            >
                              <Trash2 size={16} />
                              Delete Organization
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={
                        2 +
                        (columnVisibility.apiKey ? 1 : 0) +
                        (columnVisibility.environment ? 1 : 0) +
                        (columnVisibility.createdAt ? 1 : 0) +
                        1
                      }
                      className="cls-no-results"
                    >
                      No organizations found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalOrganizations}
            startIndex={startIndex}
            endIndex={Math.min(startIndex + itemsPerPage, totalOrganizations)}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </Card>

        <OrganizationForm
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleFormSubmit}
          editData={editingOrganization}
          isEdit={!!editingOrganization}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Warning!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Do you want to delete this organization? This action cannot be
                undone.
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
