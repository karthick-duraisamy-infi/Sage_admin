import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authIllustration from "@assets/generated_images/Auth_page_side_illustration_6a131ae3.png";
import "./forgot-password.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Password reset requested for:", email);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="cls-auth-container">
      <div className="cls-auth-split-layout">
        <div className="cls-auth-illustration-panel">
          <div className="cls-illustration-content">
            <div className="cls-illustration-header">
              <div className="cls-illustration-logo">S</div>
              <div className="cls-illustration-brand">
                <div className="cls-brand-name">SAGE</div>
                <div className="cls-brand-tagline">
                  Seamless API for Group Engagement
                </div>
              </div>
            </div>

            <div className="cls-illustration-main">
              <h2 className="cls-illustration-title">
                Unlock powerful insights with the most intuitive API console
                ever.
              </h2>
              <p className="cls-illustration-subtitle">
                SAGE provides real-time analytics, AI-driven recommendations,
                and seamless management tools to optimize your API performance
                and user engagement.
              </p>

              <div className="cls-illustration-features">
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Unified 3-Panel Layout</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Real-Time Dashboard Overview</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Detailed API Analytics</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>AI-Powered Insights</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Comprehensive User Management</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Simplified Billing Management</span>
                </div>
              </div>
            </div>

            <div className="cls-illustration-footer">
              © 2025 SAGE Inc. All rights reserved.
            </div>

            {/* <img 
              src={authIllustration} 
              alt="Sage App" 
              className="cls-illustration-image"
            /> */}
          </div>
        </div>

        <div className="cls-auth-form-panel">
          <div className="cls-form-container">
            {!isSubmitted ? (
              <>
                <div className="cls-form-header">
                  <h1 className="cls-page-title">Forgot Password?</h1>
                  <p className="cls-page-subtitle">
                    No worries! Enter your email address and we'll send you a
                    link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="cls-auth-form">
                  <div className="cls-form-group">
                    <Label htmlFor="email" className="cls-form-label">
                      Email Address
                    </Label>
                    <div className="cls-input-wrapper">
                      <Mail className="cls-input-icon" size={20} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="cls-form-input"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="cls-submit-button"
                    data-testid="button-send-reset"
                  >
                    Send Reset Link
                  </Button>

                  <div className="cls-form-footer">
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="cls-back-link"
                      data-testid="button-back-login"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Login</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="cls-success-state">
                <div className="cls-success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2 className="cls-success-title">Check Your Email</h2>
                <p className="cls-success-message">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions.
                </p>
                <p className="cls-success-note">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="cls-resend-link"
                    data-testid="button-resend"
                  >
                    try again
                  </button>
                  .
                </p>
                <Button
                  onClick={handleBackToLogin}
                  className="cls-submit-button"
                  data-testid="button-back-login-success"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
