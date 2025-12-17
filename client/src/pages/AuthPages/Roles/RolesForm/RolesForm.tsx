
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  Key,
  FileText,
  CreditCard,
  Users,
  Shield,
  Building2,
  Package,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import "./RolesForm.scss";

interface Permission {
  id: string;
  label: string;
  icon: any;
  children?: Permission[];
}

const permissions: Permission[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "user-management",
    label: "User Management",
    icon: Users,
    children: [
      { id: "users", label: "Users", icon: Users },
      { id: "roles", label: "Roles & Privileges", icon: Shield },
      { id: "organizations", label: "Organizations", icon: Building2 },
    ],
  },
  {
    id: "api-management",
    label: "API Management",
    icon: Key,
    children: [
      { id: "api-keys", label: "API Keys", icon: Key },
      { id: "api-docs", label: "API Docs", icon: FileText },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    id: "subscription-plans",
    label: "Subscription Plans",
    icon: Package,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

interface RolesFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  editData?: any;
  isEdit?: boolean;
}

export default function RolesForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
  isEdit = false,
}: RolesFormProps) {
  const [formData, setFormData] = useState({
    roleName: "",
    status: "Active",
    description: "",
    permissions: [] as string[],
  });

  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const isSubmitDisabled = !formData.roleName.trim() || !formData.status;

  useEffect(() => {
    if (editData && isEdit) {
      setFormData({
        roleName: editData.name || "",
        status: editData.status || "Active",
        description: editData.description || "",
        permissions: [],
      });
    } else if (!isEdit) {
      setFormData({
        roleName: "",
        status: "Active",
        description: "",
        permissions: [],
      });
    }
  }, [editData, isEdit]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      roleName: "",
      status: "Active",
      description: "",
      permissions: [],
    });
    setExpandedGroups([]);
    onOpenChange(false);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter((id) => id !== permissionId),
    }));
  };

  const handleParentPermissionChange = (
    permission: Permission,
    checked: boolean
  ) => {
    const childIds = permission.children?.map((child) => child.id) || [];
    const allIds = [permission.id, ...childIds];

    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...new Set([...prev?.permissions, ...allIds])]
        : prev.permissions.filter((id) => !allIds.includes(id)),
    }));
  };

  const isParentChecked = (permission: Permission) => {
    if (!permission.children) {
      return formData.permissions.includes(permission.id);
    }
    const childIds = permission.children.map((child) => child.id);
    return (
      formData.permissions.includes(permission.id) &&
      childIds.every((id) => formData.permissions.includes(id))
    );
  };

  const isParentIndeterminate = (permission: Permission) => {
    if (!permission.children) return false;
    const childIds = permission.children.map((child) => child.id);
    const checkedChildren = childIds.filter((id) =>
      formData.permissions.includes(id)
    );
    return checkedChildren.length > 0 && checkedChildren.length < childIds.length;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="cls-roles-form-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">
            {isEdit ? "Edit Role" : "Create Role"}
          </DialogTitle>
          <p className="cls-dialog-subtitle">
            {isEdit
              ? "Update the role and its permissions."
              : "Configure a new role and its permissions."}
          </p>
        </DialogHeader>

        <div className="cls-form-content">
          <div className="cls-form-row">
            <div className="cls-form-field">
              <Label htmlFor="roleName">
                Role Name <span className="cls-required">*</span>
              </Label>
              <Input
                id="roleName"
                placeholder="e.g., Content Manager"
                value={formData.roleName}
                onChange={(e) =>
                  setFormData({ ...formData, roleName: e.target.value })
                }
              />
            </div>

            <div className="cls-form-field">
              <Label htmlFor="status">
                Status <span className="cls-required">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
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

          <div className="cls-form-field">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and scope of this role..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="cls-permissions-section">
            <div className="cls-permissions-header">
              <Label>Permissions</Label>
              <p className="cls-permissions-subtitle">
                Select which features this role can access
              </p>
            </div>

            <div className="cls-permissions-list">
              {permissions.map((permission) => {
                const IconComponent = permission.icon;
                const hasChildren = permission.children && permission.children.length > 0;
                const isExpanded = expandedGroups.includes(permission.id);

                return (
                  <div key={permission.id} className="cls-permission-group">
                    <div className="cls-permission-item">
                      <div className="cls-permission-main">
                        {hasChildren && (
                          <button
                            type="button"
                            className="cls-expand-btn"
                            onClick={() => toggleGroup(permission.id)}
                          >
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        )}
                        <Checkbox
                          id={permission.id}
                          checked={isParentChecked(permission)}
                          onCheckedChange={(checked) =>
                            handleParentPermissionChange(permission, checked as boolean)
                          }
                          className={
                            isParentIndeterminate(permission)
                              ? "cls-checkbox-indeterminate"
                              : ""
                          }
                        />
                        <div className="cls-permission-icon">
                          <IconComponent size={18} />
                        </div>
                        <Label
                          htmlFor={permission.id}
                          className="cls-permission-label"
                        >
                          {permission.label}
                        </Label>
                      </div>
                    </div>

                    {hasChildren && isExpanded && (
                      <div className="cls-permission-children">
                        {permission.children!.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <div
                              key={child.id}
                              className="cls-permission-child-item"
                            >
                              <Checkbox
                                id={child.id}
                                checked={formData.permissions.includes(child.id)}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(child.id, checked as boolean)
                                }
                              />
                              <div className="cls-permission-icon cls-child-icon">
                                <ChildIcon size={16} />
                              </div>
                              <Label
                                htmlFor={child.id}
                                className="cls-permission-label"
                              >
                                {child.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="cls-form-footer">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isEdit ? "Update Role" : "Save Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
