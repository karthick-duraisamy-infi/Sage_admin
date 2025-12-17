# Sage App - Design Guidelines

## Design Approach
**Selected Approach:** Design System with Authentication Focus (Hybrid Material + Apple HIG)
Clean, professional authentication experience with emphasis on trust, clarity, and ease of use. Drawing inspiration from modern auth flows like Linear, Notion, and Stripe's onboarding patterns.

## Core Design Elements

### Typography
- **Primary Font:** Roboto (Google Fonts CDN)
- **Font Hierarchy:**
  - Page Titles: Roboto Medium, 32px (text-3xl)
  - Section Headers: Roboto Medium, 24px (text-2xl)
  - Body Text: Roboto Regular, 16px (text-base)
  - Input Labels: Roboto Medium, 14px (text-sm)
  - Helper Text: Roboto Regular, 13px (text-xs)
  - Button Text: Roboto Medium, 15px

### Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, m-8, gap-6)
- Consistent padding: p-6 for cards, p-8 for containers
- Form element spacing: gap-6 between inputs, gap-4 for related elements
- Page margins: px-4 (mobile), px-8 (tablet), centered max-w-md containers

### Authentication Page Layout Structure

**Centered Card Pattern:**
- Split-screen layout on desktop (lg: and up): Left side with branding/illustration, right side with form
- Single centered card on mobile/tablet: Full-width with max-w-md constraint
- Card styling: Rounded corners (rounded-xl), subtle shadow (shadow-lg), white background
- Vertical centering: min-h-screen with flex centering

**Form Components:**
1. **Logo/Branding Area**: Top of card, centered, mb-8
2. **Page Title**: Clear hierarchy, mb-2
3. **Subtitle/Description**: Helper text, mb-8, muted styling
4. **Form Fields**: Stacked vertically with consistent gap-6
5. **Action Buttons**: Full-width primary button, mb-4
6. **Secondary Links**: Centered, smaller text, muted

### Component Library

**Input Fields:**
- Height: h-12
- Border: 2px solid with focus states
- Rounded: rounded-lg
- Padding: px-4
- Label positioning: Above input with mb-2
- Error states: Red border, error message below (text-xs, text-red-600)
- Focus ring: ring-2 ring-offset-2 using primary color

**Buttons:**
- Primary: Full-width, h-12, rounded-lg, bold text, primary background (#1d2f7e)
- Hover/Active: Implement standard hover/active states with slight opacity/transform changes
- Disabled: Reduced opacity (opacity-50), cursor-not-allowed

**Links:**
- Standard links: Underline on hover, primary color
- Secondary actions: text-sm, muted color (gray-600)

**Form Validation:**
- Inline validation messages below inputs
- Success states: Green accent with checkmark icon
- Error states: Red accent with warning icon

### Color Palette (Supporting #1d2f7e Primary)

**Primary Palette:**
- Primary: #1d2f7e (Brand color for buttons, links, focus states)
- Primary Hover: #152461 (Darker shade for interactions)
- Primary Light: #e8ebf7 (Backgrounds, subtle accents)

**Supporting Colors:**
- Success: #10b981 (green-500)
- Error: #ef4444 (red-500)
- Warning: #f59e0b (amber-500)
- Background: #ffffff (white)
- Surface: #f9fafb (gray-50)
- Border: #e5e7eb (gray-200)
- Text Primary: #111827 (gray-900)
- Text Secondary: #6b7280 (gray-500)
- Text Muted: #9ca3af (gray-400)

### Page-Specific Implementations

**Login Page:**
- Email and password inputs with labels
- "Remember me" checkbox (left-aligned)
- "Forgot password?" link (right-aligned, opposite checkbox)
- Full-width "Sign In" primary button
- "Don't have an account? Sign up" link at bottom

**Forgot Password Page:**
- Email input only
- Clear instructions above form (mb-6)
- "Send Reset Link" primary button
- "Back to Login" secondary link
- Success state: Replace form with confirmation message and icon

**Reset Password Page:**
- New password input with strength indicator
- Confirm password input
- Password requirements checklist (visible during typing)
- "Reset Password" primary button
- Success state: Redirect message with auto-countdown

### Icons
**Library:** Heroicons (outline and solid variants via CDN)
- Email icon for email inputs
- Lock icon for password inputs
- Eye/EyeSlash for password visibility toggle
- CheckCircle for success states
- ExclamationCircle for error states

### Images
**Split-Screen Illustration (Desktop Only):**
Left panel on desktop (hidden on mobile/tablet) featuring:
- Abstract geometric illustration or gradient background suggesting security/trust
- Subtle pattern overlay with primary color palette
- Optional: Testimonial quote or key value proposition
- Dimensions: 50% viewport width on lg: breakpoints

**No Hero Image:** Authentication pages use clean, focused layouts without traditional hero sections.

### Responsive Behavior
- **Mobile (< 768px):** Single column, full-width forms, hidden illustration panel
- **Tablet (768px - 1024px):** Centered card layout, max-w-md, no side panel
- **Desktop (> 1024px):** Split-screen with left illustration panel and right form panel

### Accessibility
- All inputs have associated labels (for attribute matching)
- Focus states clearly visible with ring indicators
- Error messages announced to screen readers
- Keyboard navigation fully supported
- ARIA labels for icon-only buttons (password toggle)

### Animations
Minimal, purposeful animations only:
- Input focus: Smooth border color transition (transition-colors)
- Button hover: Subtle scale (scale-105) and opacity changes
- Form submission: Loading spinner in button
- Success/Error messages: Fade in (fade-in animation)

**No scroll animations, no complex transitions** - keep authentication flow fast and distraction-free.