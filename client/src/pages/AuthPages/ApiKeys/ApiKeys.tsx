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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Key,
  Search,
  Plus,
  MoreVertical,
  Copy,
  Edit,
  Trash2,
  CheckCircle2,
  Code,
  Shield,
  Clock,
  Settings2,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./ApiKeys.scss";
import { useLazyGetApiKeysListQuery } from "@/service/apiKeys/apiKeys";

interface ApiKey {
  id: string;
  name: string;
  organization: string;
  apiKey: string;
  environment: "Production" | "Development" | "Staging";
  status: "active" | "inactive";
  permissions: string;
  endpoints: number;
  usageToday: number;
  usageLimit: number;
  lastUsed: string;
}

const apiKeysDataStatic: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    organization: "ClearTrip Solutions",
    apiKey: "sk-prod-abc1...d6p4f8",
    environment: "Production",
    status: "active",
    permissions: "GRM-API",
    endpoints: 50,
    usageToday: 12450,
    usageLimit: 100000,
    lastUsed: "2 hours ago",
  },
];

export default function ApiKeys() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "TechCorp Solutions",
    environment: "Development" as "Production" | "Development" | "Staging",
    status: "active" as "active" | "inactive",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

    const defaultFilterData = {
      page: 1,
      page_size: 6,
    };

    // The following line is used to set the filter option for the group list
    const [filterData, setFilterData] = useState<any>(defaultFilterData);

    const [getApiKeysList, getApiKeysListStatus] = useLazyGetApiKeysListQuery();

    const [apiKeysData, setApiKeysData] = useState<any[]>([]);
    const [apiKeysCount, setApiKeysCount] = useState<number>(0);

  // Available endpoint permissions for each API collection
  const apiCollectionEndpoints: Record<string, any[]> = {
    "GRM-API": [
      {
        endpoint: "/checksession/",
        description: "Check Session",
        methods: { GET: true, POST: false, PUT: false },
      },
      {
        endpoint: "/createtoken/",
        description: "Create Token",
        methods: { GET: false, POST: true, PUT: false },
      },
      {
        endpoint: "/forgotpassword/",
        description: "Forgot Password",
        methods: { GET: true, POST: true, PUT: false },
      },
      {
        endpoint: "/grmapi/corporate/",
        description: "Corporate API",
        methods: { GET: true, POST: false, PUT: true },
      },
    ],
    "SAMPLE-API": [
      {
        endpoint: "/ping",
        description: "Ping",
        methods: { GET: true, POST: false, PUT: false },
      },
    ],
  };

  const [apiCollections, setApiCollections] = useState<
    Array<{
      id: string;
      collection: string;
      endpoints: any[];
    }>
  >([]);

  const toggleEndpointMethod = (
    collectionId: string,
    endpointIndex: number,
    method: "GET" | "POST" | "PUT",
  ) => {
    setApiCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              endpoints: collection.endpoints.map((perm, i) =>
                i === endpointIndex
                  ? {
                      ...perm,
                      methods: {
                        ...perm.methods,
                        [method]: !perm.methods[method],
                      },
                    }
                  : perm,
              ),
            }
          : collection,
      ),
    );
  };

  const selectAllMethods = (collectionId: string) => {
    setApiCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              endpoints: collection.endpoints.map((perm) => ({
                ...perm,
                methods: { GET: true, POST: true, PUT: true },
              })),
            }
          : collection,
      ),
    );
  };

  const addNewApiCollection = () => {
    setApiCollections((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        collection: "",
        endpoints: [],
      },
    ]);
  };

  const removeApiCollection = (collectionId: string) => {
    setApiCollections((prev) =>
      prev.filter((collection) => collection.id !== collectionId),
    );
  };

  const updateApiCollection = (
    collectionId: string,
    collectionName: string,
  ) => {
    setApiCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              collection: collectionName,
              endpoints:
                apiCollectionEndpoints[collectionName]?.map((ep) => ({
                  ...ep,
                })) || [],
            }
          : collection,
      ),
    );
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    environment: true,
    status: true,
    permissions: false,
    usage: false,
    lastUsed: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Filter API keys based on search
  const filteredKeys = apiKeysData.filter(
    (key) =>
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.apiKey.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate stats
  const totalKeys = apiKeysData.length;
  const activeKeys = apiKeysData.filter((k) => k.status === "active").length;
  const productionKeys = apiKeysData.filter(
    (k) => k.environment === "Production",
  ).length;
  const developmentKeys = apiKeysData.filter(
    (k) => k.environment === "Development",
  ).length;

  // Pagination
  const startIndex = (filterData.page - 1) * filterData.page_size;
  const endIndex = startIndex + filterData.page_size;
  const paginatedKeys = filteredKeys;

  const handleCopyKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleDelete = (id: string) => {
    setKeyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (keyToDelete) {
      console.log("Delete API key:", keyToDelete);
      setDeleteDialogOpen(false);
      setKeyToDelete(null);
    }
  };

  const handleEdit = (apiKey: ApiKey) => {
    setEditingKey(apiKey);
    setFormData({
      name: apiKey.name,
      organization: apiKey.organization,
      environment: apiKey.environment,
      status: apiKey.status,
    });

    // Set up API collections based on the permissions
    const collections = [
      {
        id: Date.now().toString(),
        collection: apiKey.permissions,
        endpoints:
          apiCollectionEndpoints[apiKey.permissions]?.map((ep) => ({
            ...ep,
          })) || [],
      },
    ];
    setApiCollections(collections);

    setIsCreateDialogOpen(true);
  };

  const handleCreateKey = () => {
    if (editingKey) {
      console.log("Update API key:", editingKey.id, formData, apiCollections);
    } else {
      console.log("Create new API key:", formData, apiCollections);
    }
    setIsCreateDialogOpen(false);
    setEditingKey(null);
    setFormData({
      name: "",
      organization: "TechCorp Solutions",
      environment: "Development",
      status: "active",
    });
    setApiCollections([]);
  };


   useEffect(() => {
      getApiKeysList(filterData);
    }, [filterData]);

    useEffect(() => {
      if (getApiKeysListStatus.isSuccess) {
        // Handle successful data fetching
        setApiKeysData((getApiKeysListStatus as any)?.data?.results || []);
        setApiKeysCount((getApiKeysListStatus as any)?.data?.count)
      } else if (getApiKeysListStatus.isError) {
        // Handle API call failure
        setApiKeysData([]);
        setApiKeysCount(0);
      }
    }, [getApiKeysListStatus]);

    // Determine if the table should show the empty state
    const showEmptyState = apiKeysData.length === 0 && !getApiKeysListStatus.isLoading;


  return (
    <AppLayout
      title="API Keys"
      subtitle="Create, manage, and monitor your API keys"
    >
      <div className="cls-apikeys-page">
        {/* Stats Cards */}
        <div className="cls-stats-grid my-[0px] mx-[20px]">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total API Keys</p>
                <h3 className="cls-stat-value">{apiKeysCount}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <Key />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Keys</p>
                <h3 className="cls-stat-value">{activeKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <CheckCircle2 />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Production Keys</p>
                <h3 className="cls-stat-value">{productionKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-red">
                <Shield />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Development Keys</p>
                <h3 className="cls-stat-value">{developmentKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <Code />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Key Management Section */}
        <Card className="cls-management-card">
          <CardContent className="cls-management-content">
            <div className="cls-management-header">
              <div className="cls-header-left">
                <Key className="cls-header-icon" />
                <h2 className="cls-header-title">API Key Management</h2>
              </div>
              <div className="cls-header-actions">
                <div className="cls-search-container">
                  <Input
                    type="text"
                    placeholder="Search API keys..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setFilterData({ ...filterData, page: 1 });
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
                          id="col-environment"
                          checked={columnVisibility.environment}
                          onCheckedChange={() => toggleColumn("environment")}
                        />
                        <Label htmlFor="col-environment">Environment</Label>
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
                          id="col-permissions"
                          checked={columnVisibility.permissions}
                          onCheckedChange={() => toggleColumn("permissions")}
                        />
                        <Label htmlFor="col-permissions">Permissions</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-usage"
                          checked={columnVisibility.usage}
                          onCheckedChange={() => toggleColumn("usage")}
                        />
                        <Label htmlFor="col-usage">Usage Today</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-lastused"
                          checked={columnVisibility.lastUsed}
                          onCheckedChange={() => toggleColumn("lastUsed")}
                        />
                        <Label htmlFor="col-lastused">Last Used</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="cls-new-key-button"
                >
                  <Plus size={16} />
                  New API Key
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="cls-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name & Organization</TableHead>
                    <TableHead>API Key</TableHead>
                    {columnVisibility.environment && (
                      <TableHead>Environment</TableHead>
                    )}
                    {columnVisibility.status && <TableHead>Status</TableHead>}
                    {columnVisibility.permissions && (
                      <TableHead>Permissions</TableHead>
                    )}
                    {columnVisibility.usage && (
                      <TableHead>Usage Today</TableHead>
                    )}
                    {columnVisibility.lastUsed && (
                      <TableHead>Last Used</TableHead>
                    )}
                    <TableHead className="cls-actions-head"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {showEmptyState ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        {getApiKeysListStatus.isLoading ? (
                          <p>Loading API keys...</p>
                        ) : (
                          <p>No API keys found. Create a new one to get started.</p>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell>
                          <div className="cls-name-cell">
                            <p className="cls-key-name">{apiKey.name}</p>
                            <p className="cls-organization">
                              {apiKey.organization}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="cls-api-key-cell">
                            <code className="cls-api-key-code">
                              {apiKey.key}
                            </code>
                            <button
                              onClick={() => handleCopyKey(apiKey.key)}
                              className="cls-copy-button"
                              title="Copy API Key"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </TableCell>
                        {columnVisibility.environment && (
                          <TableCell>
                            <Badge
                              className={`cls-env-badge cls-env-${apiKey.environment.toLowerCase()}`}
                            >
                              {apiKey.environment}
                            </Badge>
                          </TableCell>
                        )}
                        {columnVisibility.status && (
                          <TableCell>
                            <Badge
                              className={`cls-status-badge cls-status-${apiKey.is_active === true ? "active" : "inactive"}`}
                            >
                              {apiKey.is_active === true ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                        )}
                        {columnVisibility.permissions && (
                          <TableCell>
                            <div className="cls-permissions-cell">
                              <p className="cls-permission-name">
                                {apiKey.permissions}
                              </p>
                              <p className="cls-endpoints-count">
                                {apiKey.endpoints} endpoint(s)
                              </p>
                            </div>
                          </TableCell>
                        )}
                        {columnVisibility.usage && (
                          <TableCell>
                            <div className="cls-usage-cell">
                              <p className="cls-usage-count">
                                {apiKey.usageToday.toLocaleString()}
                              </p>
                              <p className="cls-usage-limit">
                                / {(apiKey.usageLimit / 1000).toFixed(0)}k/hour
                              </p>
                            </div>
                          </TableCell>
                        )}
                        {columnVisibility.lastUsed && (
                          <TableCell>
                            <div className="cls-last-used-cell">
                              <Clock size={14} className="cls-clock-icon" />
                              <span>{apiKey.created_at}</span>
                            </div>
                          </TableCell>
                        )}
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
                                onClick={() => handleCopyKey(apiKey.key)}
                                className="cls-menu-item"
                              >
                                <Copy size={16} />
                                Copy Key
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(apiKey)}
                                className="cls-menu-item"
                              >
                                <Edit size={16} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(apiKey.id)}
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
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {getApiKeysListStatus.isSuccess && apiKeysCount > 0 && (
          <TablePagination
            currentPage={filterData?.page}
            totalPages={Math.ceil(apiKeysCount / filterData?.page_size)}
            totalItems={apiKeysCount}
            itemsPerPage={filterData?.page_size}
            onPageChange={(page: any) => { setFilterData({ ...filterData, page }); }}
            onItemsPerPageChange={(page_size: any) => { setFilterData({ ...filterData, page_size }); }}
            startIndex={startIndex}
            endIndex={Math.min(endIndex, apiKeysCount)}
          />
        )}

        {/* Create API Key Dialog */}
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              setEditingKey(null);
              setFormData({
                name: "",
                organization: "TechCorp Solutions",
                environment: "Development",
                status: "active",
              });
              setApiCollections([]);
            }
          }}
        >
          <DialogContent className="cls-create-dialog">
            <DialogHeader>
              <DialogTitle>
                {editingKey ? "Edit API Key" : "Create New API Key"}
              </DialogTitle>
              <DialogDescription>
                {editingKey
                  ? "Update the API key details"
                  : "Generate a new API key for your application"}
              </DialogDescription>
            </DialogHeader>

            <div className="cls-form-grid">
              <div className="cls-form-field">
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., Production API Key"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="cls-form-field">
                <Label htmlFor="organization">Organization</Label>
                <Select
                  value={formData.organization}
                  onValueChange={(value) =>
                    setFormData({ ...formData, organization: value })
                  }
                >
                  <SelectTrigger id="organization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TechCorp Solutions">
                      TechCorp Solutions
                    </SelectItem>
                    <SelectItem value="DataFlow Systems">
                      DataFlow Systems
                    </SelectItem>
                    <SelectItem value="Cloudify Inc">Cloudify Inc</SelectItem>
                    <SelectItem value="Infiniti Software Solutions">
                      Infiniti Software Solutions
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="cls-form-field">
                <Label htmlFor="environment">Environment</Label>
                <Select
                  value={formData.environment}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, environment: value })
                  }
                >
                  <SelectTrigger id="environment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="cls-form-field">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
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

            {/* Permissions Section */}
            <div className="cls-permissions-section">
              <div className="cls-permissions-header">
                <h3 className="cls-section-title">Permissions</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNewApiCollection}
                  className="cls-add-collection-btn"
                >
                  <Plus size={16} />
                  Add Permission
                </Button>
              </div>

              {apiCollections.length === 0 && (
                <p className="cls-empty-state">
                  Click "Add Permission" to add API collections and configure
                  endpoint permissions.
                </p>
              )}

              {apiCollections.map((collection) => (
                <div key={collection.id} className="cls-api-collection-block">
                  <div className="cls-collection-header">
                    <div className="cls-form-field">
                      <Label htmlFor={`api-collection-${collection.id}`}>
                        API Collection
                      </Label>
                      <Select
                        value={collection.collection}
                        onValueChange={(value) =>
                          updateApiCollection(collection.id, value)
                        }
                      >
                        <SelectTrigger id={`api-collection-${collection.id}`}>
                          <SelectValue placeholder="Select an API collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GRM-API">GRM API</SelectItem>
                          <SelectItem value="SAMPLE-API">Sample API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeApiCollection(collection.id)}
                      className="cls-remove-collection-btn"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  {collection.collection && collection.endpoints.length > 0 && (
                    <div className="cls-endpoint-permissions">
                      <div className="cls-permissions-header">
                        <Label>Endpoint Permissions</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => selectAllMethods(collection.id)}
                          className="cls-select-all-btn"
                        >
                          Select All Methods
                        </Button>
                      </div>

                      <div className="cls-endpoints-table">
                        <div className="cls-table-header">
                          <div className="cls-header-endpoint">Endpoints</div>
                          <div className="cls-header-methods">
                            <span className="cls-method-badge">GET</span>
                            <span className="cls-method-badge">POST</span>
                            <span className="cls-method-badge">PUT</span>
                          </div>
                        </div>

                        {collection.endpoints.map((perm, index) => (
                          <div key={index} className="cls-table-row">
                            <div className="cls-endpoint-info">
                              <code className="cls-endpoint-path">
                                {perm.endpoint}
                              </code>
                              <p className="cls-endpoint-desc">
                                {perm.description}
                              </p>
                            </div>
                            <div className="cls-method-checkboxes">
                              <Checkbox
                                checked={perm.methods.GET}
                                onCheckedChange={() =>
                                  toggleEndpointMethod(
                                    collection.id,
                                    index,
                                    "GET",
                                  )
                                }
                                className="cls-method-checkbox"
                              />
                              <Checkbox
                                checked={perm.methods.POST}
                                onCheckedChange={() =>
                                  toggleEndpointMethod(
                                    collection.id,
                                    index,
                                    "POST",
                                  )
                                }
                                className="cls-method-checkbox"
                              />
                              <Checkbox
                                checked={perm.methods.PUT}
                                onCheckedChange={() =>
                                  toggleEndpointMethod(
                                    collection.id,
                                    index,
                                    "PUT",
                                  )
                                }
                                className="cls-method-checkbox"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {collection.collection &&
                    collection.endpoints.length === 0 && (
                      <p className="cls-no-endpoints">
                        Select an API collection to see available endpoints.
                      </p>
                    )}
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setEditingKey(null);
                  setFormData({
                    name: "",
                    organization: "TechCorp Solutions",
                    environment: "Development",
                    status: "active",
                  });
                  setApiCollections([]);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateKey}>
                {editingKey ? "Update API Key" : "Create API Key"}
              </Button>
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
                Do you want to delete this API key? This action cannot be undone.
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