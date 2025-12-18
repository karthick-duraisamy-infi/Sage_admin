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
  Star,
  Award,
  Building,
  Server,
  Check,
  ChevronLeft,
  Info,
} from "lucide-react";
import "./OrganizationForm.scss";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  apiCalls: string;
  icon: any;
  overage: string;
  features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$20.00",
    apiCalls: "20,000 SAGE API calls",
    icon: Star,
    overage: "$0.05/call",
    features: [
      "Basic SAGE API access",
      "Email support",
      "Standard rate limiting",
      "Basic group engagement analytics",
      "+ 2 more",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$65.00",
    apiCalls: "100,000 SAGE API calls",
    icon: Award,
    overage: "$0.05/call",
    features: [
      "Advanced SAGE API features",
      "Priority support",
      "Enhanced rate limiting",
      "Advanced group engagement analytics",
      "+ 3 more",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$200.00",
    apiCalls: "500,000 SAGE API calls",
    icon: Building,
    overage: "$0.05/call",
    features: [
      "Full SAGE API access",
      "24/7 expert support",
      "Custom rate limiting",
      "Enterprise group management",
    ],
  },
];

interface OrganizationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  editData?: any;
  isEdit?: boolean;
}

export default function OrganizationForm({
  open,
  onOpenChange,
  onSubmit,
  editData,
  isEdit = false,
}: OrganizationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    organizationName: "",
    ownerEmail: "",
    subscriptionPlan: "",
    useDefaultLimit: true,
    customApiLimit: "",
    sendInvitation: true,
    requirePasswordReset: true,
    notes: "",
    numberOfUsers: "1",
    lastActive: "Never",
    status: "Active",
    billingStatus: "Pending",
  });

  const [errors, setErrors] = useState({
    organizationName: false,
    ownerEmail: false,
  });

  useEffect(() => {
    if (editData && isEdit) {
      setFormData({
        organizationName: editData.name || "",
        ownerEmail: editData.email || "",
        subscriptionPlan: editData.subscriptionPlan?.toLowerCase() || "",
        useDefaultLimit: true,
        customApiLimit: "",
        sendInvitation: true,
        requirePasswordReset: true,
        notes: "",
        numberOfUsers: editData.userCount?.toString() || "1",
        lastActive: editData.lastActive || "Never",
        status: editData.status || "Active",
        billingStatus: editData.billingStatus || "Pending",
      });
    } else if (!isEdit) {
      setFormData({
        organizationName: "",
        ownerEmail: "",
        subscriptionPlan: "",
        useDefaultLimit: true,
        customApiLimit: "",
        sendInvitation: true,
        requirePasswordReset: true,
        notes: "",
        numberOfUsers: "1",
        lastActive: "Never",
        status: "Active",
        billingStatus: "Pending",
      });
    }
  }, [editData, isEdit]);

  const validateStep1 = () => {
    const newErrors = {
      organizationName: !formData.organizationName.trim(),
      ownerEmail:
        !formData.ownerEmail.trim() || !formData.ownerEmail.includes("@"),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep === 2 && !formData.subscriptionPlan) {
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
    // Extract numeric API limit from selected plan
    let apiLimitToSubmit = formData.customApiLimit;

    if (formData.useDefaultLimit && selectedPlan) {
      // Extract numeric value from plan's apiCalls string (e.g., "20,000 SAGE API calls" -> 20000)
      const numericMatch = selectedPlan.apiCalls.match(/[\d,]+/);
      if (numericMatch) {
        apiLimitToSubmit = numericMatch[0].replace(/,/g, "");
      }
    }

    const submissionData = {
      ...formData,
      customApiLimit: apiLimitToSubmit || "0",
    };

    console.log("Creating organization:", submissionData);
    if (onSubmit) {
      onSubmit(submissionData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      organizationName: "",
      ownerEmail: "",
      subscriptionPlan: "",
      useDefaultLimit: true,
      customApiLimit: "",
      sendInvitation: true,
      requirePasswordReset: true,
      notes: "",
      numberOfUsers: "1",
      lastActive: "Never",
      status: "Active",
      billingStatus: "Pending",
    });
    setCurrentStep(1);
    setErrors({
      organizationName: false,
      ownerEmail: false,
    });
    onOpenChange(false);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const selectedPlan = subscriptionPlans.find(
    (plan) => plan.id === formData.subscriptionPlan,
  );

  const getApiLimit = () => {
    if (!formData.useDefaultLimit && formData.customApiLimit) {
      return formData.customApiLimit;
    }
    if (selectedPlan) {
      return selectedPlan.apiCalls;
    }
    return "N/A";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="cls-organization-form-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">
            {isEdit ? "Edit Organization" : "Create Organization"}
          </DialogTitle>
          <p className="cls-dialog-subtitle">
            {currentStep === 1 && "Enter the organization and owner details."}
            {currentStep === 2 &&
              "Set the subscription plan for the organization."}
            {currentStep === 3 &&
              "Configure API usage limits and account settings."}
            {currentStep === 4 &&
              "Configure activity, status, and review all details."}
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="cls-progress-section">
          <p className="cls-step-label">
            Step {currentStep} of {totalSteps}
          </p>
          <div className="cls-progress-bar">
            <div
              className="cls-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step 1: Organization Details */}
        {currentStep === 1 && (
          <div className="cls-step-content">
            <div className="cls-form-field">
              <Label htmlFor="organizationName">
                Organization Name <span className="cls-required">*</span>
              </Label>
              <Input
                id="organizationName"
                placeholder="e.g., TechCorp Solutions"
                value={formData.organizationName}
                onChange={(e) =>
                  setFormData({ ...formData, organizationName: e.target.value })
                }
                className={errors.organizationName ? "cls-input-error" : ""}
              />
              {errors.organizationName && (
                <p className="cls-error-text">Organization name is required</p>
              )}
            </div>

            <div className="cls-form-field">
              <Label htmlFor="ownerEmail">
                Owner Email <span className="cls-required">*</span>
              </Label>
              <Input
                id="ownerEmail"
                type="email"
                placeholder="e.g., owner@techcorp.com"
                value={formData.ownerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, ownerEmail: e.target.value })
                }
                className={errors.ownerEmail ? "cls-input-error" : ""}
              />
              {errors.ownerEmail && (
                <p className="cls-error-text">Valid email is required</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Subscription Plan */}
        {currentStep === 2 && (
          <div className="cls-step-content">
            <div className="cls-subscription-plans">
              {subscriptionPlans.map((plan) => {
                const IconComponent = plan.icon;
                const isSelected = formData.subscriptionPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    className={`cls-plan-card ${
                      isSelected ? "cls-plan-selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, subscriptionPlan: plan.id })
                    }
                  >
                    {isSelected && (
                      <div className="cls-plan-check">
                        <Check size={20} />
                      </div>
                    )}
                    <div className="cls-plan-header">
                      <div className="cls-plan-icon">
                        <IconComponent size={20} />
                      </div>
                      <h4 className="cls-plan-name">{plan.name}</h4>
                    </div>
                    <div className="cls-plan-price">{plan.price}</div>
                    <div className="cls-plan-billing">per month</div>
                    <div className="cls-plan-api-calls">{plan.apiCalls}</div>
                    <div className="cls-plan-overage">
                      Overage: {plan.overage}
                    </div>
                    <div className="cls-plan-features">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="cls-feature-item">
                          <Check size={14} className="cls-feature-check" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: API Usage & Account Settings */}
        {currentStep === 3 && (
          <div className="cls-step-content">
            <h3 className="cls-section-title">API Usage Limits</h3>
            <div className="cls-api-usage-section">
              <div className="cls-settings-option">
                <div className="cls-setting-info">
                  <Label htmlFor="useDefaultLimit">
                    Use Plan Default Limit
                  </Label>
                  <p className="cls-setting-description">
                    Use the default API limit for{" "}
                    {selectedPlan?.name || "selected"} plan:{" "}
                    {selectedPlan?.apiCalls || "N/A"}
                  </p>
                </div>
                <Switch
                  id="useDefaultLimit"
                  checked={formData.useDefaultLimit}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useDefaultLimit: checked })
                  }
                />
              </div>

              {!formData.useDefaultLimit && (
                <div className="cls-form-field">
                  <Label htmlFor="customApiLimit">Custom API Limit</Label>
                  <Input
                    id="customApiLimit"
                    type="number"
                    placeholder="Enter custom limit (calls/month)"
                    value={formData.customApiLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customApiLimit: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div className="cls-current-limit">
                <Info size={16} />
                <span>
                  Current Limit:{" "}
                  {formData.useDefaultLimit
                    ? selectedPlan?.apiCalls || "Select a plan"
                    : formData.customApiLimit
                      ? `${formData.customApiLimit} calls/month`
                      : "Not set"}
                </span>
              </div>
            </div>

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
            {/* <div className="cls-form-row">
              <div className="cls-form-field">
                <Label htmlFor="numberOfUsers">
                  Number of Users <span className="cls-required">*</span>
                </Label>
                <Input
                  id="numberOfUsers"
                  type="number"
                  min="1"
                  value={formData.numberOfUsers}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfUsers: e.target.value })
                  }
                />
              </div>

              <div className="cls-form-field">
                <Label htmlFor="lastActive">
                  Last Active <span className="cls-required">*</span>
                </Label>
                <Input
                  id="lastActive"
                  value={formData.lastActive}
                  onChange={(e) =>
                    setFormData({ ...formData, lastActive: e.target.value })
                  }
                />
              </div>
            </div> */}

            <div className="cls-form-row">
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

              <div className="cls-form-field">
                <Label htmlFor="billingStatus">
                  Billing Status <span className="cls-required">*</span>
                </Label>
                <Select
                  value={formData.billingStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, billingStatus: value })
                  }
                >
                  <SelectTrigger id="billingStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h3 className="cls-section-title">Review Details</h3>

            <div className="cls-review-section">
              <h4 className="cls-subsection-title">Organization Details</h4>
              <div className="cls-review-grid">
                <div className="cls-review-item">
                  <p className="cls-review-label">Name</p>
                  <p className="cls-review-value">
                    {formData.organizationName}
                  </p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Owner Email</p>
                  <p className="cls-review-value">{formData.ownerEmail}</p>
                </div>
              </div>
            </div>

            <div className="cls-review-section">
              <h4 className="cls-subsection-title">
                Subscription & API Limits
              </h4>
              <div className="cls-review-grid">
                <div className="cls-review-item">
                  <p className="cls-review-label">Plan</p>
                  <div className="cls-plan-badge">
                    {selectedPlan && (
                      <>
                        <span className="cls-badge-text">
                          {selectedPlan.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">API Limit</p>
                  <p className="cls-review-value">{getApiLimit()}</p>
                </div>
              </div>
            </div>

            <div className="cls-review-section">
              <h4 className="cls-subsection-title">Account Settings</h4>
              <div className="cls-config-list">
                <div className="cls-config-item">
                  <p className="cls-config-label">Send Invitation:</p>
                  <span
                    className={`cls-config-badge ${
                      formData.sendInvitation ? "cls-yes" : "cls-no"
                    }`}
                  >
                    {formData.sendInvitation ? "Yes" : "No"}
                  </span>
                </div>
                <div className="cls-config-item">
                  <p className="cls-config-label">Require Password Reset:</p>
                  <span
                    className={`cls-config-badge ${
                      formData.requirePasswordReset ? "cls-yes" : "cls-no"
                    }`}
                  >
                    {formData.requirePasswordReset ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="cls-form-footer">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? handleClose : handleBack}
          >
            <ChevronLeft size={16} />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>
              {isEdit ? "Update Organization" : "Create Organization"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
