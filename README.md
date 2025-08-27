## Peerlist Interaction Design Challenge

This project contains my submissions for the Peerlist Interaction Design Challenge. It is built with Next.js (App Router), TypeScript, and Tailwind CSS.

### Getting Started

Prerequisites:
- Node.js 18+
- pnpm installed globally

Install dependencies:
```bash
pnpm install
```

Run the development server:
```bash
pnpm dev
```

Build for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm start
```

### Tech Stack
- Next.js 15 (App Router, Turbopack)
- TypeScript
- Tailwind CSS

### Project Structure
```text
src/
  app/
    day-1/           # Day 1 submission page
    day-2/           # Day 2 submission page
    layout.tsx       # Root layout
    page.tsx         # Landing page
  components/
    otp-input.tsx    # Interactive OTP input component
    ui/
      animated-tooltip.tsx  # Reusable animated avatar tooltip component
      button.tsx
      card.tsx
  lib/
    utils.ts
```

### Day 1 – Animated Avatar Stack
Design and build an animated avatar stack that goes beyond the basics. Think of how avatars can come alive through shapes, colors, gradients, transitions, and motion. Don’t be afraid to break conventions. We’re sharing one example to get you started, but that’s just a spark. Your stack could flip, slide, bounce, fade, or completely reinvent the concept of an avatar group. The only rule: make it fun, creative, and uniquely yours.

How to view:
- Visit `/day-1` in the running app.

### Day 2 – Interactive OTP Input
Design an OTP input that clearly distinguishes default, active, correct, and incorrect states. This submission includes an accessible, keyboard-friendly OTP component with rich interactions and feedback.

Highlights:
- Default, Active (focused), Filled, Success, and Error visual states
- Auto-advance on digit entry, smart Backspace behavior, and Arrow navigation
- Full-OTP paste support; accepts only digits
- Async-ready validation hook; demo validates against `1234`
- Subtle animations for focus and error (shake)

How to view:
- Visit `/day-2` in the running app
- Try entering `1234` to see the success state; any other value shows an error shake and auto-reset

Implementation Notes:
- Component: `src/components/otp-input.tsx`
- Page: `src/app/day-2/page.tsx`
- Styles/animations: `src/app/globals.css`

### Day 3 – Card to Page Transition
Design a transition that seamlessly blends from one page to another. This implementation features a beautiful gallery of Peerlist tools with smooth card-to-detail transitions and comprehensive loading states.

**Key Features:**
- **Smooth Card Transitions**: Cards animate with hover effects, scale transforms, and gradient overlays
- **Seamless Page Navigation**: Framer Motion-powered transitions between gallery and detail views
- **Loading States**: Comprehensive loading system with spinners, disabled states, and smooth animations
- **Responsive Design**: Optimized for both web and mobile with adaptive layouts
- **Interactive Elements**: Hover effects, click feedback, and smooth micro-interactions

**Technical Implementation:**
- **State Management**: React hooks for managing selected items and loading states
- **Animation System**: Framer Motion for smooth enter/exit transitions and micro-interactions
- **Loading Components**: Reusable LoadingSpinner component with multiple sizes and customizable text
- **Performance**: Optimized animations with proper easing curves and transition timing
- **Accessibility**: Proper disabled states, loading indicators, and keyboard navigation support

**Loading System:**
- **Card Loading**: 800ms loading delay with overlay spinner and disabled state
- **Back Navigation**: 400ms loading delay with button spinner and disabled state
- **Visual Feedback**: Semi-transparent overlays, brand-colored spinners, and smooth transitions
- **Prevention**: Multiple click prevention during loading states

**Animation Details:**
- **Card Hover**: Scale (1.02), Y translation (-8px), and gradient glow effects
- **Page Transitions**: Scale and opacity animations with custom easing curves
- **Loading States**: Fade-in overlays with backdrop blur and smooth spinners
- **Micro-interactions**: Sparkle animations, gradient borders, and hover state transitions

**Components Used:**
- `TransitionCard`: Interactive cards with hover effects and loading states
- `PageView`: Detailed view with smooth back navigation
- `LoadingSpinner`: Reusable loading component with multiple variants
- `AnimatePresence`: Smooth page transitions with proper exit animations

How to view:
- Visit `/day-3` in the running app
- Click on any card to see the smooth transition to detail view
- Use the back button to return to the gallery with loading feedback
- Observe the loading states when clicking cards or navigating back

Implementation Notes:
- Components: `src/components/TransitionCard.tsx`, `src/components/PageView.tsx`, `src/components/ui/loading-spinner.tsx`
- Page: `src/app/day-3/page.tsx`
- Animations: Framer Motion with custom easing curves
- Loading: Comprehensive state management with visual feedback

### Credits
- Peerlist Logo and challenge content belong to Peerlist.