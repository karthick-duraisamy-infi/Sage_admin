import { useState } from "react";
import { useLocation } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Search,
  LayoutGrid,
  List,
  Plus,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import "./ApiDocs.scss";

interface ApiCollection {
  id: string;
  name: string;
  version: string;
  status: "active" | "inactive";
  description: string;
  createdBy: string;
  createdDate: string;
}

const apiCollectionsData: ApiCollection[] = [
  {
    id: "1",
    name: "ClearTrip API",
    version: "1.0.0",
    status: "active",
    description:
      "GRM API provides endpoints for authentication, user management, ancillary services, policy management, help desk, and more.",
    createdBy: "admin@sage.co",
    createdDate: "July 20th, 2024",
  },
  {
    id: "2",
    name: "Payment Gateway API",
    version: "1.0.0",
    status: "active",
    description: "A sample API to illustrate OpenAPI concepts.",
    createdBy: "admin@sage.co",
    createdDate: "July 22nd, 2024",
  },
  // {
  //   id: "4",
  //   name: "Analytics API",
  //   version: "1.5.2",
  //   status: "active",
  //   description:
  //     "Real-time analytics and reporting API for tracking user behavior and system metrics.",
  //   createdBy: "admin@sage.co",
  //   createdDate: "September 12th, 2024",
  // },
  // {
  //   id: "5",
  //   name: "Notification Service API",
  //   version: "1.2.0",
  //   status: "inactive",
  //   description:
  //     "Multi-channel notification service supporting email, SMS, and push notifications.",
  //   createdBy: "admin@sage.co",
  //   createdDate: "October 3rd, 2024",
  // },
  // {
  //   id: "6",
  //   name: "User Management API",
  //   version: "3.0.0",
  //   status: "active",
  //   description:
  //     "Comprehensive user management system with role-based access control and audit logging.",
  //   createdBy: "admin@sage.co",
  //   createdDate: "November 8th, 2024",
  // },
  // {
  //   id: "7",
  //   name: "File Storage API",
  //   version: "2.0.1",
  //   status: "active",
  //   description:
  //     "Scalable file storage and retrieval service with CDN integration and versioning support.",
  //   createdBy: "admin@sage.co",
  //   createdDate: "December 1st, 2024",
  // },
];

export default function ApiDocs() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    version: "1.0.0",
    filename: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  // Filter API collections
  const filteredCollections = apiCollectionsData.filter((collection) => {
    const matchesSearch =
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || collection.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCollections = filteredCollections.slice(startIndex, endIndex);

  const handleViewDocumentation = (collectionId: string) => {
    setLocation(`/api-docs/${collectionId}`);
  };

  const handleSave = () => {
    console.log("Creating new API collection:", formData);
    setIsCreateDialogOpen(false);
    setFormData({
      title: "",
      version: "1.0.0",
      filename: "",
      description: "",
      status: "active",
    });
  };

  return (
    <AppLayout
      title="API Documentation"
      subtitle="Explore and interact with the available SAGE APIs."
    >
      <div className="cls-apidocs-container">
        <Card className="cls-collections-card">
          <CardContent className="cls-collections-content pt-6">
            {/* Page Header - First Row */}
            <div className="cls-page-header">
              <div className="cls-header-left">
                <BookOpen className="cls-header-icon" />
                <h2 className="cls-header-title">API Collections</h2>
              </div>
            </div>

            {/* Filter Actions - Second Row */}
            <div className="cls-filter-actions flex items-center gap-4 w-full flex-nowrap">
              {/* Search */}
              <div className="cls-search-container">
                <Input
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="cls-search-input"
                />
              </div>

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="cls-filter-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="cls-view-toggle">
                <Button
                  variant={viewMode === "card" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className="cls-view-btn"
                >
                  <LayoutGrid size={16} />
                  Card View
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="cls-view-btn"
                >
                  <List size={16} />
                  List View
                </Button>
              </div>

              {/* New Collection Button */}
              <Button
                className="cls-new-collection-btn"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus size={16} />
                New API Collection
              </Button>
            </div>

            {/* Collections Grid/List */}
            {paginatedCollections.length === 0 ? (
              <div className="cls-empty-state">
                <BookOpen className="cls-empty-icon" />
                <h3 className="cls-empty-title">No API Collections Found</h3>
                <p className="cls-empty-description">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "card"
                    ? "cls-collections-grid"
                    : "cls-collections-list"
                }
              >
                {paginatedCollections.map((collection) => (
                  <Card
                    key={collection.id}
                    className={
                      viewMode === "card"
                        ? "cls-collection-card"
                        : "cls-collection-list-item"
                    }
                  >
                    <CardContent
                      className={
                        viewMode === "card"
                          ? "cls-collection-card-content pt-6"
                          : "cls-collection-list-content pt-6"
                      }
                    >
                      <div className="cls-collection-header">
                        <div className="cls-collection-icon">
                          <BookOpen size={24} />
                        </div>
                        <div className="cls-collection-title-section">
                          <div className="cls-title-row">
                            <h3 className="cls-collection-name">
                              {collection.name}
                            </h3>
                            {/* <Badge
                              className={
                                collection.status === "active"
                                  ? "cls-status-badge-active"
                                  : "cls-status-badge-inactive"
                              }
                            >
                              {collection.status}
                            </Badge> */}
                          </div>
                          <p className="cls-collection-version">
                            Version {collection.version}
                            <Badge
                              className={
                                collection.status === "active"
                                  ? "ml-3 cls-status-badge-active"
                                  : "ml-3 cls-status-badge-inactive"
                              }
                            >
                              {collection.status}
                            </Badge>
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cls-menu-trigger"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cls-menu-item">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cls-menu-item">
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cls-menu-item cls-menu-item-danger">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="cls-collection-description">
                        {collection.description}
                      </p>

                      <div className="cls-collection-footer">
                        <p className="cls-collection-meta">
                          Created by {collection.createdBy} on{" "}
                          {collection.createdDate}
                        </p>
                        <Button
                          onClick={() => handleViewDocumentation(collection.id)}
                          className="cls-view-docs-btn"
                        >
                          View Documentation
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredCollections.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredCollections.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}

        {/* Create API Specification Dialog */}
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              setFormData({
                title: "",
                version: "1.0.0",
                filename: "",
                description: "",
                status: "active",
              });
            }
          }}
        >
          <DialogContent className="cls-create-dialog">
            <DialogHeader>
              <DialogTitle>Create API Specification</DialogTitle>
              <DialogDescription>
                Enter the details for the new API spec.
              </DialogDescription>
            </DialogHeader>

            <div className="cls-dialog-form">
              {/* First row: Title and Version */}
              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter API title"
                  />
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) =>
                      setFormData({ ...formData, version: e.target.value })
                    }
                    placeholder="1.0.0"
                  />
                </div>
              </div>

              {/* Second row: Filename and Status */}
              <div className="cls-form-row">
                <div className="cls-form-field">
                  <Label htmlFor="filename">Filename</Label>
                  <div className="cls-filename-input">
                    <Input
                      id="filename"
                      value={formData.filename}
                      onChange={(e) =>
                        setFormData({ ...formData, filename: e.target.value })
                      }
                      placeholder=""
                      className="cls-filename-field"
                    />
                    <span className="cls-filename-extension">.yaml</span>
                  </div>
                </div>
                <div className="cls-form-field">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description field */}
              <div className="cls-form-field-full">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter API description"
                  className="cls-description-textarea"
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
