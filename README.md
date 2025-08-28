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
- Framer Motion (motion/react)

### Project Structure
```text
src/
  app/
    day-1/           # Day 1 submission page
    day-2/           # Day 2 submission page
    day-3/           # Day 3 submission page
    day-4/           # Day 4 submission page
    layout.tsx       # Root layout
    page.tsx         # Landing page
  components/
    otp-input.tsx    # Interactive OTP input component
    PageView.tsx     # Page view component for day 3
    TransitionCard.tsx # Transition card component for day 3
    ui/
      animated-tooltip.tsx  # Reusable animated avatar tooltip component
      button.tsx
      card.tsx
      loading-spinner.tsx   # Loading spinner component
  lib/
    utils.ts
```

### Day 1 – Animated Avatar Stack
Design and build an animated avatar stack that goes beyond the basics. Think of how avatars can come alive through shapes, colors, gradients, transitions, and motion. Don't be afraid to break conventions. We're sharing one example to get you started, but that's just a spark. Your stack could flip, slide, bounce, fade, or completely reinvent the concept of an avatar group. The only rule: make it fun, creative, and uniquely yours.

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

### Day 4 – Interactive Folder
Design a folder interaction component that responds to user actions with smooth, engaging motion. Focus on how the interaction communicates state changes - opening, closing, hovering. Explore creative ways to provide visual feedback.

**Key Features:**
- **Smooth Folder Expansion**: Spring-based animations with custom stiffness and damping for natural movement
- **Interactive State Management**: Open/close states with smooth transitions and visual feedback
- **Dual View Modes**: Grid and List views with seamless switching and smooth animations
- **File Management**: Interactive file selection, starring, and organization with visual feedback
- **Advanced Animations**: Staggered file animations, hover effects, and floating particle systems

**Technical Implementation:**
- **Animation System**: Framer Motion with spring physics for realistic folder expansion
- **State Management**: React hooks for managing folder state, file selection, and view modes
- **Accessibility**: Keyboard shortcuts (G/L for view modes, Esc for selection), ARIA labels, and reduced motion support
- **Performance**: Optimized animations with proper easing curves and transition timing
- **Responsive Design**: Adaptive layouts that work across different screen sizes

**Animation Details:**
- **Folder Expansion**: Smooth width/height transitions from 320x220px to 880x640px
- **File Animations**: Staggered entrance animations with individual delays and spring physics
- **Hover Effects**: Scale transforms, color transitions, and floating particle systems
- **State Transitions**: Smooth icon rotations, color changes, and layout adjustments

**Interactive Elements:**
- **Folder Tab**: 3D rotating tab with spring animations and visual depth
- **File Tiles**: Hover effects, selection states, and action buttons
- **View Toggle**: Smooth switching between grid and list layouts
- **Selection System**: Multi-file selection with visual feedback and bulk actions
- **Particle Effects**: Floating emerald particles that appear on hover

**Color Scheme:**
- **Primary**: Emerald, Green, and Teal gradients for a cohesive greenish theme
- **Background**: Dark slate with subtle transparency and backdrop blur effects
- **Accents**: White text with drop shadows for perfect contrast
- **Interactive**: Emerald highlights for active states and selections

**Components Used:**
- `InteractiveFolder`: Main folder component with state management
- `ToggleButton`: View mode switching with active states
- `FileTile`: Individual file display with selection and actions
- `AnimatePresence`: Smooth content transitions and particle effects

**Keyboard Shortcuts:**
- **G**: Switch to Grid view
- **L**: Switch to List view
- **Esc**: Clear file selection
- **Space/Enter**: Select/deselect files

How to view:
- Visit `/day-4` in the running app
- Hover over the folder to see floating particles and color changes
- Click to open/close the folder with smooth expansion
- Switch between Grid and List views using the toggle buttons
- Select files by clicking on them for multi-selection
- Use keyboard shortcuts for quick navigation

Implementation Notes:
- Page: `src/app/day-4/page.tsx`
- Animations: Framer Motion with spring physics and custom easing
- Accessibility: Full keyboard support and reduced motion preferences
- Performance: Optimized animations with proper state management

### Credits
- Peerlist Logo and challenge content belong to Peerlist.