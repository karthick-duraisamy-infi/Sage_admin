import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '@/store/auth.store';
import { setMenuReponse } from '@/store/menu.store';
import { useLocation } from 'wouter';
import './login.scss';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [, setLocation] = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setLocation('/dashboard');
    }
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Import credentials from config
      const configResponse = await fetch('./staticData/config.json');
      const config = await configResponse.json();
      
      // Find matching credentials
      let matchedUser = null;
      for (const [userId, credentials] of Object.entries(config.credentials)) {
        const creds = credentials as any;
        if (creds.username === email && creds.password === password) {
          matchedUser = {
            id: userId,
            email: creds.username,
            name: creds.username === 'admin@sage.com' ? 'Admin User' : 'User',
            role: creds.username === 'admin@sage.com' ? 'admin' : 'user'
          };
          break;
        }
      }

      if (matchedUser) {
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        });
        
        // Store authentication token and user data with user ID
        const mockToken = 'mock-auth-token-' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userId', matchedUser.id);
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(matchedUser));
        }
        
        // Get user config for menu and routes
        const userConfig = (config.credentials as any)[matchedUser.id];
        
        // Update Redux state with authentication AND menu/routes
        dispatch(setAuthenticated({ value: true, user: matchedUser }));
        dispatch(setMenuReponse({ 
          value: {
            menu: userConfig.menu,
            route: userConfig.route
          }
        }));
        
        // Navigate to dashboard
        setTimeout(() => {
          setLocation('/dashboard');
        }, 500);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                <div className="cls-brand-tagline">Seamless API for Group Engagement</div>
              </div>
            </div>
            
            <div className="cls-illustration-main">
              <h2 className="cls-illustration-title">
                Unlock powerful insights with the most intuitive API console ever.
              </h2>
              <p className="cls-illustration-subtitle">
                SAGE provides real-time analytics, AI-driven recommendations, and seamless management tools to optimize your API performance and user engagement.
              </p>
              
              <div className="cls-illustration-features">
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Unified 3-Panel Layout</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Real-Time Dashboard Overview</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Detailed API Analytics</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>AI-Powered Insights</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Comprehensive User Management</span>
                </div>
                <div className="cls-feature-item">
                  <div className="cls-feature-icon">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
            <div className="cls-form-header">
              <h1 className="cls-page-title">Sign In</h1>
              <p className="cls-page-subtitle">
                Enter your credentials to access your account
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

              <div className="cls-form-group">
                <Label htmlFor="password" className="cls-form-label">
                  Password
                </Label>
                <div className="cls-input-wrapper">
                  <Lock className="cls-input-icon" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cls-form-input cls-password-input"
                    required
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cls-password-toggle"
                    aria-label="Toggle password visibility"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="cls-form-options">
                <div className="cls-remember-me">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    data-testid="checkbox-remember"
                  />
                  <Label htmlFor="remember" className="cls-checkbox-label">
                    Remember me
                  </Label>
                </div>
                <a href="/forgot-password" className="cls-forgot-link" data-testid="link-forgot-password">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="cls-submit-button"
                data-testid="button-signin"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="cls-form-footer">
                <p className="cls-footer-text">
                  Don't have an account?{' '}
                  <a href="/signup" className="cls-signup-link" data-testid="link-signup">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
