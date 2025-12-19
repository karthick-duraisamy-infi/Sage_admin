
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Shield,
  Code,
  CreditCard,
  Eye,
  Check,
  ChevronLeft,
} from "lucide-react";
import "./UsersForm.scss";
import { useLazyGetRolesListQuery } from "@/service/roles/roles";
import PaginatedSelect from "@/components/PaginatedSelect/PaginatedSelect";
import { useLazyGetOrganisationDataQuery } from "@/service/organisation/organisation";

interface RoleOption {
  id: string | any;
  title: string;
  description: string;
  icon: any;
}

// To chnage as an api values.
const organization = [
  {
    "id": 1,
    "name": "Cyber-Aju Tech solutions",
    "created_at": "2025-12-08T12:58:40.814615Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_d3fa683536b7df801f17ab802cb5d92908e879665b40d618",
        "created_at": "2025-12-08T12:58:40.818226Z"
      }
    ]
  },
  {
    "id": 2,
    "name": "Infiniti Software solutions",
    "created_at": "2025-12-08T14:23:38.801787Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_57b0a131a6f9e9379cd56b8eeef11fb7bb737c5bb6dc6187",
        "created_at": "2025-12-08T14:23:38.806463Z"
      }
    ]
  },
  {
    "id": 3,
    "name": "PDRM BUKIT AMAN",
    "created_at": "2025-12-09T07:31:26.944001Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_ab8e733cf37dd38537eb3dfa1fc86046dcd2add367f925fb",
        "created_at": "2025-12-09T07:31:26.947943Z"
      }
    ]
  },
  {
    "id": 4,
    "name": "KEMENTERIAN PEMBANGUNAN WANITA NEGERI PERAK",
    "created_at": "2025-12-09T07:32:57.171992Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_bb786df03633eaabe1a5b5e2b94ba264de231c4fe86af48d",
        "created_at": "2025-12-09T07:32:57.175618Z"
      }
    ]
  },
  {
    "id": 5,
    "name": "JABATAN AKAUN KPLB",
    "created_at": "2025-12-09T07:33:40.996445Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_d78da3b9cf0f43f1813d2b6ed517e778c2232f12386fe5e5",
        "created_at": "2025-12-09T07:33:40.999275Z"
      }
    ]
  },
  {
    "id": 6,
    "name": "Infiniti Software solutions",
    "created_at": "2025-12-09T08:56:49.565172Z",
    "api_keys": [
      {
        "environment": "DEV",
        "key": "DEV_2081da109c1aeab0904d57f0a60f217ff5218691090a8971",
        "created_at": "2025-12-09T08:56:49.571304Z"
      }
    ]
  }
];

interface UsersFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  editData?: any;
  isEdit?: boolean;
}

export default function UsersForm({ open, onOpenChange, onSubmit, editData, isEdit = false }: UsersFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [organizations, setOrgainzations] = useState<any>(organization);
  const [getRolesList, getRolesListStatus] = useLazyGetRolesListQuery();

  const defaultFilterData = {
    page: 1,
    page_size: 6,
  };

  // The following line is used to set the filter option for the group list
  const [filterData, setFilterData] = useState<any>(defaultFilterData);

  const [roleOptions, setRolesData] = useState<any[]>([]);
  const [rolesCount, setRolesCount] = useState<number>(0);

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    organization_id: "",
    role_id: "",
    sendInvitation: true,
    requirePasswordReset: true,
    notes: "",
    r_status: "Pending",
  });

  const selectedOrganization = organizations?.find(
    (org: any) => org?.id?.toString() == formData?.organization_id?.toString()
  );


  // To get the roles list 
  useEffect(() => {
    getRolesList(filterData);
  }, [filterData]);

  //To sets the roles list.
  useEffect(() => {
    if (getRolesListStatus.isSuccess) {
      // Handle successful data fetching
      setRolesData((getRolesListStatus as any)?.data?.results || []);
      setRolesCount((getRolesListStatus as any)?.data?.count);
    }
  }, [getRolesListStatus]);

  // Update form data when editData changes
  useEffect(() => {
    if (editData && isEdit) {
      setFormData({
        first_name: editData?.first_name || "",
        last_name: editData?.last_name || "",
        email_id: editData?.email_id || "",
        password: editData?.password ||"",
        organization_id: editData?.organization || "",
        role_id: editData?.role_details?.id,
        sendInvitation: true,
        requirePasswordReset: true,
        notes: "",
        r_status: editData?.status || "Pending",
      });
    } else if (!isEdit) {
      // Reset form when creating new user
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        password: "",
        organization_id: "",
        role_id: "",
        sendInvitation: true,
        requirePasswordReset: true,
        notes: "",
        r_status: "Pending",
      });
    }
  }, [editData, isEdit]);

  const [errors, setErrors] = useState({
    first_name: false,
    // last_name: false,
    email_id: false,
    organization_id: false,
    // role_id: false,
  });

  const validateStep1 = () => {
    const newErrors = {
      first_name: !formData?.first_name.trim(),
      // last_name: !formData?.last_name.trim(),
      email_id: !formData?.email_id.trim() || !formData?.email_id?.includes("@"),
      organization_id: !formData?.organization_id,
      // role_id: !formData?.role_id,
    };
    console.log("Validation Errors:", newErrors);
    setErrors(newErrors);
    return !Object?.values(newErrors)?.some((error) => error);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep === 2 && !formData?.role_id) {
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Creating user:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setFormData({
      first_name: "",
      email_id: "",
      last_name: "",
      organization_id: "",
      role_id: "",
      sendInvitation: true,
      requirePasswordReset: true,
      notes: "",
      password:"",
      r_status: "Pending",
    });
    setCurrentStep(1);
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email_id: "",
      organization_id: "",
      role_id: "",
      sendInvitation: true,
      requirePasswordReset: true,
      notes: "",
      password:"",
      r_status: "Pending",
    });
    setCurrentStep(1);
    setErrors({
      first_name: false,
      email_id: false,
      organization_id: false,
      // role_id: false,
      // last_name: false,
    });
    onOpenChange(false);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="cls-users-form-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <p className="cls-dialog-subtitle">
            {currentStep === 1 && (isEdit ? "Update the user information." : "Enter the information for the new user.")}
            {currentStep === 2 &&
              "Select the appropriate role and permissions for this user."}
            {currentStep === 3 &&
              (isEdit ? "Update account settings for this user." : "Configure account settings for the new user.")}
            {currentStep === 4 &&
              (isEdit ? "Review all changes before updating the account." : "Review all user details before saving the account.")}
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="cls-progress-section">
          <p className="cls-step-label">Step {currentStep} of {totalSteps}</p>
          <div className="cls-progress-bar">
            <div
              className="cls-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="cls-step-content">
            <div className="flex w-[100%] gap-5">
              <div className="cls-form-field w-[50%]">
                <Label htmlFor="first_name">
                  First Name <span className="cls-required">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="e.g., John Doe"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className={errors.first_name ? "cls-input-error" : ""}
                />
                {errors.first_name && (
                  <p className="cls-error-text">First name is required</p>
                )}
              </div>
              <div className="cls-form-field  w-[50%]">
                <Label htmlFor="last_name" >
                  Last Name {/* <span className="cls-required">*</span> */}
                </Label>
                <Input
                  id="last_name"
                  placeholder="e.g., Doe"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex w-[100%] gap-5">
            <div className="cls-form-field  w-[50%]">
              <Label htmlFor="email">
                Email Address <span className="cls-required">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., john.doe@company.com"
                value={formData.email_id}
                onChange={(e) =>
                  setFormData({ ...formData, email_id: e.target.value })
                }
                className={errors.email_id ? "cls-input-error" : ""}
              />
              {errors.email_id && (
                <p className="cls-error-text">Valid email is required</p>
              )}
            </div>
            <div className="cls-form-field  w-[50%]">
              <Label htmlFor="password">
                Password <span className="cls-required">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData?.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            </div>

            <div className="cls-form-field">
              <Label htmlFor="organization">
                Organization <span className="cls-required">*</span>
              </Label>
                <PaginatedSelect
                  value={formData?.organization_id}
                  placeholder="Select organization"
                  useLazyQuery={useLazyGetOrganisationDataQuery}
                  getLabel={(org) => org.name}
                  getValue={(org) => org.id.toString()}
                  onChange={(value) =>
                    setFormData({ ...formData, organization_id: value })
                  }
                />

              {errors.organization_id && (
                <p className="cls-error-text">Organization is required</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {currentStep === 2 && (
          <div className="cls-step-content">
            <div className="cls-role-options">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  className={`cls-role-card ${formData.role_id === role.id ? "cls-role-selected" : ""
                    }`}
                  onClick={() => setFormData({ ...formData, role_id: role.id })}
                >
                  <div className="cls-role-header">
                    {/* <div className="cls-role-icon">
                      <role.icon size={20} />
                    </div> */}
                    <div className="cls-role-info">
                      <h4>{role?.name}</h4>
                      <p>{role?.description}</p>
                    </div>
                  </div>
                  {formData.role_id === role.id && (
                    <div className="cls-role-check">
                      <Check size={20} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Account Settings */}
        {currentStep === 3 && (
          <div className="cls-step-content">
            <h3 className="cls-section-title">Account Settings</h3>

            <div className="cls-settings-option">
              <div className="cls-setting-info">
                <Label htmlFor="sendInvitation">Send Invitation Email</Label>
                <p className="cls-setting-description">
                  Send an email invitation to the user with account setup
                  instructions
                </p>
              </div>
              <Switch
                id="sendInvitation"
                checked={formData.sendInvitation}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, sendInvitation: checked })
                }
              />
            </div>

            <div className="cls-settings-option">
              <div className="cls-setting-info">
                <Label htmlFor="requirePasswordReset">
                  Require Password Reset
                </Label>
                <p className="cls-setting-description">
                  User must set a new password on first login
                </p>
              </div>
              <Switch
                id="requirePasswordReset"
                checked={formData.requirePasswordReset}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, requirePasswordReset: checked })
                }
              />
            </div>

            <div className="cls-form-field">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this user..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="cls-step-content">
            <div className="cls-form-field">
              <Label htmlFor="status">
                Status <span className="cls-required">*</span>
              </Label>
              <Select
                value={formData.r_status}
                onValueChange={(value) =>
                  setFormData({ ...formData, r_status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="cls-review-section">
              <h3 className="cls-section-title">User Information</h3>
              <div className="cls-review-grid">
                <div className="cls-review-item">
                  <p className="cls-review-label">First Name</p>
                  <p className="cls-review-value">{formData.first_name}</p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Last Name</p>
                  <p className="cls-review-value">{formData.last_name}</p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Email</p>
                  <p className="cls-review-value">{formData.email_id}</p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Organization</p>
                  <p className="cls-review-value">{selectedOrganization?.name}</p>
                </div>
              </div>
            </div>

            <div className="cls-review-sections-row">
              <div className="cls-review-section">
                <h3 className="cls-section-title">Role & Permissions</h3>
                <div className="cls-role-display">
                  {roleOptions.find((r) => r.id === formData?.role_id) && (
                    <div className="cls-role-summary">
                      {/* <div className="cls-role-icon-small">
                        {(() => {
                          const selectedRole = roleOptions.find((r) => r.id === formData?.role_id);
                          const IconComponent = selectedRole?.icon;
                          return IconComponent ? <IconComponent size={20} /> : null;
                        })()}
                      </div> */}
                      <div>
                        <p className="cls-role-name">
                          {
                            roleOptions.find((r) => r.id === formData?.role_id)
                              ?.title
                          }
                        </p>
                        <p className="cls-role-desc">
                          {
                            roleOptions.find((r) => r.id === formData.role_id)
                              ?.description
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="cls-review-section">
                <h3 className="cls-section-title">Account Configuration</h3>
                <div className="cls-config-list">
                  <div className="cls-config-item">
                    <p className="cls-config-label">Send Invitation:</p>
                    <span
                      className={`cls-config-badge ${formData.sendInvitation ? "cls-yes" : "cls-no"
                        }`}
                    >
                      {formData.sendInvitation ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="cls-config-item">
                    <p className="cls-config-label">Require Password Reset:</p>
                    <span
                      className={`cls-config-badge ${formData.requirePasswordReset ? "cls-yes" : "cls-no"
                        }`}
                    >
                      {formData.requirePasswordReset ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="cls-form-footer">
          <Button variant="outline" onClick={currentStep === 1 ? handleClose : handleBack}>
            <ChevronLeft size={16} />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>{isEdit ? "Update User" : "Create User"}</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
