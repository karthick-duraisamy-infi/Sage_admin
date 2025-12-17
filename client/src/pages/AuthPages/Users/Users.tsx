import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UsersForm from "./UsersForm/UsersForm";
import * as XLSX from "xlsx";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users as UsersIcon,
  UserCheck,
  UserPlus,
  UserX,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Settings2,
  Download,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./Users.scss";
import { useLazyGetUsersListQuery } from "@/service/users/users";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  organization: string;
  role: string;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useState<number>(0);

  const defaultFilterData = {
    page: 1,
    page_size: 6,
  };

  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>(defaultFilterData);

  const [getUsersList, getUsersListStatus] = useLazyGetUsersListQuery();

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    organization: true,
    role: true,
    status: true,
    lastActive: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Filter users based on search, role, and status
  const filteredUsers = usersData.filter((user: any) => {
    const matchesSearch =
      user?.first_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      user?.email_id.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats
  const totalUsers = usersCount;
  const activeUsers = usersData.filter((u: any) => u.r_status === 1).length;
  const pendingUsers = usersData.filter((u: any) => u.r_status === 2).length;
  const suspendedUsers = usersData.filter(
    (u: any) => u.r_status === 3,
  ).length;

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleCreateUser = (userData: any) => {
    console.log(isEditMode ? "User updated:" : "User created:", userData);
    const data = {
      "email_id": userData?.email_id,
      "password": userData?.password,
      "first_name": userData?.first_name,
      "last_name": userData?.last_name,
      "phone_number": userData?.phone_number || "",
      "is_active": userData?.is_active,
      "organization_id": userData?.organization_id,
      "role_id": userData?.role_id,
      "address": userData?.address,
      "enforce_rate_limits": false,
      "allow_emails": false,
      "allow_api_access": false,
      "r_user_type": null,
      "r_status": null
    };
    if (isEditMode) {
      // TODO: Update user in list
      console.log("Updating user:", editUser?.id);
    } else {
      // TODO: Add user to list
    }
    setIsEditMode(false);
    setEditUser(null);
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setEditUser(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setIsEditMode(false);
      setEditUser(null);
    }
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      console.log("Delete user:", userToDelete);
      // TODO: Implement actual delete logic
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredUsers.map((user: any, index: any) => ({
      "S.No.": index + 1,
      "Name": user?.first_name,
      "Email": user.email,
      "Organization": user.organization,
      "Role": user.role,
      "Status": user.status,
      "Last Active": user.lastActive,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Generate Excel file and download
    XLSX.writeFile(wb, `users-export-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  useEffect(() => {
    getUsersList(filterData);
  }, [filterData]);

  useEffect(() => {
    if (getUsersListStatus.isSuccess) {
      // Handle successful data fetching
      setUsersData((getUsersListStatus as any)?.data?.results || []);
      setUsersCount((getUsersListStatus as any)?.data?.count)
    }
  }, [getUsersListStatus]);

  return (
    <AppLayout title="Users" subtitle="Manage users and their permissions">
      <div className="cls-users-page">
        {/* Stats Cards */}
        <div className="cls-stats-grid m-[2rem] mb-0">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Users</p>
                <h3 className="cls-stat-value">{totalUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <UsersIcon />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Users</p>
                <h3 className="cls-stat-value">{activeUsers}</h3>
                <div className="cls-stat-change cls-stat-negative">
                  <TrendingDown size={14} />
                  <span>-4% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <UserCheck />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Pending Users</p>
                <h3 className="cls-stat-value">{pendingUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+25% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <UserPlus />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Suspended Users</p>
                <h3 className="cls-stat-value">{suspendedUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-red">
                <UserX />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card className="cls-management-card">
          <CardContent className="cls-management-content">
            <div className="cls-management-header pt-2 pb-4">
              <div className="cls-header-left">
                <UsersIcon className="cls-header-icon" />
                <h2 className="cls-header-title">All Users</h2>
              </div>
              <div className="cls-header-actions">
                <div className="cls-search-container">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>

                <Select
                  value={roleFilter}
                  onValueChange={(value) => {
                    setRoleFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Billing Manager">
                      Billing Manager
                    </SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
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
                    <div className="cls-column-options">
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-organization"
                          checked={columnVisibility.organization}
                          onCheckedChange={() => toggleColumn("organization")}
                        />
                        <Label htmlFor="col-organization">Organization</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-role"
                          checked={columnVisibility.role}
                          onCheckedChange={() => toggleColumn("role")}
                        />
                        <Label htmlFor="col-role">Role</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-status"
                          checked={columnVisibility.status}
                          onCheckedChange={() => toggleColumn("status")}
                        />
                        <Label htmlFor="col-status">Status</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-lastactive"
                          checked={columnVisibility.lastActive}
                          onCheckedChange={() => toggleColumn("lastActive")}
                        />
                        <Label htmlFor="col-lastactive">Last Active</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="cls-export-button"
                >
                  <Download size={16} />
                  Export Users
                </Button>

                <Button
                  onClick={handleAddUser}
                  className="cls-add-user-button"
                >
                  <Plus size={16} />
                  Add User
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="cls-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No.</TableHead>
                    <TableHead>User</TableHead>
                    {columnVisibility.organization && (
                      <TableHead>Organization</TableHead>
                    )}
                    {columnVisibility.role && <TableHead>Role</TableHead>}
                    {columnVisibility.status && <TableHead>Status</TableHead>}
                    {/* {columnVisibility.lastActive && (
                      <TableHead>Last Active</TableHead>
                    )} */}
                    <TableHead className="cls-actions-head"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user: any, index: any) => (
                      <TableRow key={user?.id}>
                        <TableCell className="cls-sno-cell">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="cls-user-cell">
                            {/* <img
                              src={user.avatar}
                              alt={user.name}
                              className="cls-user-avatar"
                            /> */}
                            <div className="cls-user-info">
                              <p className="cls-user-name">{user?.first_name}</p>
                              <p className="cls-user-email">{user?.email_id}</p>
                            </div>
                          </div>
                        </TableCell>
                        {/* {columnVisibility.organization && ( */}
                        <TableCell>
                          {user?.organization_details?.name ? <span className="cls-organization">
                            {user?.organization_details?.name}
                          </span> : "-"}
                        </TableCell>
                        {/* )} */}
                        {/* {columnVisibility.role && ( */}
                        <TableCell>
                          {user?.role_details?.name ? <Badge
                            className={`${user?.role_details?.name !== null && "cls-role-badge"} cls-role-${user?.role_details?.name?.toLowerCase()}`}
                          >
                            {user?.role_details?.name}
                          </Badge> : "-"}
                        </TableCell>
                        {/* )} */}
                        {/* {columnVisibility.status && ( */}
                        <TableCell>
                          <Badge
                            className={`cls-status-badge cls-status-${user?.r_status === 1 ? "active" : "in-active"}`}
                          >
                            {user?.r_status === 1 ? "Active" : "In-Active"}
                            {/* {user?.r_status?.toUpperCase()} */}
                          </Badge>
                        </TableCell>
                        {/* )} */}
                        {/* {columnVisibility.lastActive && (
                          <TableCell>
                            <span className="cls-last-active">
                              {user.lastActive}
                            </span>
                          </TableCell>
                        )} */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cls-actions-button"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(user)}
                                className="cls-menu-item"
                              >
                                <Edit size={16} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(user.id)}
                                className="cls-delete-item"
                              >
                                <Trash2 size={16} />
                                Delete
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
                          (columnVisibility.organization ? 1 : 0) +
                          (columnVisibility.role ? 1 : 0) +
                          (columnVisibility.status ? 1 : 0) +
                          1
                        }
                        className="cls-no-results"
                      >
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <TablePagination
          currentPage={filterData?.page || 1}
          totalPages={Math.ceil(usersCount / (filterData?.page_size || 1))}
          totalItems={filteredUsers.length}
          itemsPerPage={filterData?.page_size || 6}
          onPageChange={(page: any) => { setFilterData({ ...filterData, page }); }}
          onItemsPerPageChange={(page_size: any) => { setFilterData({ ...filterData, page_size }); }}
          startIndex={startIndex}
          endIndex={endIndex}
        />

        {/* User Form Modal */}
        <UsersForm
          open={isFormOpen}
          onOpenChange={handleCloseForm}
          onSubmit={handleCreateUser}
          editData={editUser}
          isEdit={isEditMode}
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
              <AlertDialogTitle className="text-center">Warning!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Do you want to delete this user? This action cannot be undone.
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