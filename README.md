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
    day-5/           # Day 5 submission page
    day-6/           # Day 6 submission page
    day-7/           # Day 7 submission page
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

### Day 5 – Progressive Input Stack
Design a progressive input stack interaction that guides users seamlessly through a multi-step process. Focus on making transitions fluid and visually engaging, while ensuring important information remains accessible at each stage.

**Key Features:**
- **Multi-Step Process**: 4 comprehensive steps (Personal Info → Location → Professional → Education)
- **Progressive Validation**: Real-time validation with required field checking before progression
- **Smooth Step Transitions**: Spring-based animations with staggered entrance effects
- **Visual Progress Tracking**: Animated progress bars and step completion indicators
- **Dynamic Form Elements**: Interactive skills and achievements with add/remove functionality

**Technical Implementation:**
- **State Management**: React hooks for complex form state and validation logic
- **Animation System**: Framer Motion with spring physics for natural transitions
- **Form Validation**: Smart validation that prevents progression until required fields are complete
- **Accessibility**: Reduced motion support, proper ARIA labels, and keyboard navigation
- **Performance**: Optimized animations with proper easing curves and transition timing

**Animation Details:**
- **Step Transitions**: Smooth slide animations with spring physics (stiffness: 300)
- **Progress Indicators**: Animated progress bars that fill as steps are completed
- **Icon Transformations**: Step icons animate to checkmarks when completed
- **Staggered Entrances**: Step elements animate in sequence with individual delays
- **Hover Effects**: Interactive elements with scale and color transitions

**Interactive Elements:**
- **Step Navigation**: Click to navigate between steps with smooth transitions
- **Form Validation**: Real-time feedback on required fields with visual indicators
- **Dynamic Content**: Skills and achievements with animated tag management
- **Progress Visualization**: Color-coded steps with animated progress lines
- **Success Celebration**: Beautiful completion screen with profile summary

**Color Scheme:**
- **Step 1 (Personal)**: Emerald to Green gradients
- **Step 2 (Location)**: Blue to Cyan gradients
- **Step 3 (Professional)**: Purple to Pink gradients
- **Step 4 (Education)**: Purple to Pink gradients
- **Background**: Dark theme with subtle grid patterns and blur effects

**Form Features:**
- **Personal Information**: First name, last name, email, phone with validation
- **Location Details**: City, country, timezone with required field checking
- **Professional Background**: Company, role, experience, and dynamic skills management
- **Education & Skills**: Degree, institution, graduation year, and achievements

**Components Used:**
- `ProgressiveInputStack`: Main component with step management and form logic
- `PersonalInfoStep`: Personal information form with validation
- `LocationStep`: Location details form with required field checking
- `ProfessionalStep`: Professional background with dynamic skills input
- `EducationStep`: Education details with achievements management
- `InputField`: Reusable input component with icons and validation
- `SuccessView`: Completion screen with profile summary and actions

**User Experience:**
- **Progressive Disclosure**: Information revealed step-by-step to reduce cognitive load
- **Visual Feedback**: Clear progress indicators and step completion states
- **Error Prevention**: Required field validation prevents incomplete submissions
- **Success Flow**: Celebration screen with profile summary and next actions
- **Responsive Design**: Mobile-first approach with adaptive layouts

How to view:
- Visit `/day-5` in the running app
- Navigate through the 4-step process with smooth animations
- Observe real-time validation and progress tracking
- Add/remove skills and achievements dynamically
- Complete the form to see the success celebration screen
- Use the reset functionality to start over

Implementation Notes:
- Page: `src/app/day-5/page.tsx`
- Animations: Framer Motion with spring physics and custom easing
- Validation: Smart form validation with visual feedback
- Accessibility: Full keyboard support and reduced motion preferences
- Performance: Optimized animations with proper state management

### Day 6 – Warp Overlay
Design an interactive overlay that smoothly expands, and transitions between states. Challenge yourself to be creative. Focus on making the motion feel natural, and responsive.

**Key Features:**
- **3D Warp Effect**: Overlay opens with dramatic 3D rotation (rotateX, rotateY) for cinematic entrance
- **Dynamic Sizing**: Three size states (small, medium, large) with smooth transitions
- **6 Overlay Types**: Media Gallery, Music Player, Video Controls, Settings, Search, Creative Tools
- **Particle Systems**: Floating emerald particles that burst from the center on opening
- **Smooth State Transitions**: Natural motion using spring physics with custom stiffness and damping

**Technical Implementation:**
- **3D Transformations**: Advanced CSS transforms with rotateX, rotateY, and scale effects
- **Spring Physics**: Framer Motion with custom stiffness (300) and damping (25) for natural motion
- **State Management**: React hooks for overlay states, sizing, and content management
- **Performance**: Optimized animations with proper easing curves and transition timing
- **Accessibility**: Reduced motion support, keyboard navigation (Esc key), and proper ARIA labels

**Animation Details:**
- **Opening Animation**: 3D warp effect with scale (0.8→1), rotation (-15°→0°), and Y translation (50px→0)
- **Size Transitions**: Smooth resizing between small (320x256), medium (384x320), and large (448x384)
- **Particle Effects**: 12 particles with staggered animations, expanding outward in circular patterns
- **Hover Interactions**: Cards lift (y: -4px) and scale (1.05) with smooth transitions
- **Content Animations**: Staggered entrance effects with individual delays for each element

**Interactive Elements:**
- **Trigger Cards**: 6 interactive cards with hover effects and color-coded themes
- **Size Toggle**: Dynamic resizing button that cycles through size states
- **Close Button**: Smooth closing with reverse 3D warp effect
- **Backdrop Click**: Intuitive closing by clicking outside the overlay
- **Keyboard Support**: Escape key for accessibility and convenience

**Color Scheme & Themes:**
- **Media Gallery**: Blue to Cyan gradients
- **Music Player**: Purple to Pink gradients
- **Video Controls**: Red to Orange gradients
- **Settings Panel**: Gray to Slate gradients
- **Search & Filter**: Emerald to Green gradients
- **Creative Tools**: Yellow to Orange gradients

**Content Types:**
- **Media Gallery**: Grid layout with upload/browse functionality
- **Music Player**: Playback controls with progress bar and volume
- **Video Controls**: Video player controls with play/pause/maximize
- **Settings Panel**: Toggle switches for preferences
- **Search & Filter**: Search input with recent searches
- **Creative Tools**: Color picker, brush tools, shapes, and text tools

**Components Used:**
- `WarpOverlay`: Main component with overlay management and state logic
- `MediaGalleryContent`: Media grid with upload functionality
- `MusicPlayerContent`: Music controls with visual feedback
- `VideoControlsContent`: Video player interface
- `SettingsContent`: Settings panel with toggles
- `SearchContent`: Search interface with recent items
- `CreativeToolsContent`: Creative tool grid with actions

**User Experience:**
- **Cinematic Opening**: Dramatic 3D entrance that draws attention
- **Natural Motion**: Spring-based animations that feel responsive and organic
- **Visual Feedback**: Rich hover states and smooth transitions throughout
- **Intuitive Navigation**: Easy opening, resizing, and closing with multiple methods
- **Responsive Design**: Adapts to different screen sizes with proper scaling

**Performance Features:**
- **Optimized Animations**: Proper easing curves and transition timing
- **Reduced Motion**: Respects user preferences for motion sensitivity
- **Efficient Rendering**: Smooth 60fps animations with proper cleanup
- **Memory Management**: Proper cleanup of event listeners and animations

How to view:
- Visit `/day-6` in the running app
- Click any of the 6 trigger cards to open different overlay types
- Use the size toggle button to resize overlays dynamically
- Press Esc key or click outside to close overlays
- Observe the 3D warp effect and particle animations
- Explore different content types in each overlay

Implementation Notes:
- Page: `src/app/day-6/page.tsx`
- Animations: Framer Motion with 3D transforms and spring physics
- 3D Effects: Advanced CSS transforms for cinematic entrance
- Performance: Optimized animations with proper state management
- Accessibility: Full keyboard support and reduced motion preferences

### Day 7 – Peerlist Autofill w/ AI
Design an AI-powered form autofill experience that makes waiting delightful and engaging. This implementation uses real GitHub API integration to analyze repositories and intelligently populate project forms with smooth animations, progress tracking, and visual feedback.

**Key Features:**
- **Real GitHub Integration**: Connect to actual GitHub repositories via URL input
- **5-Step AI Process**: Validate → Analyze → Extract → Research → Optimize with realistic timing
- **Real-time Progress Tracking**: Animated progress bar and step-by-step visual feedback
- **Dynamic Form Population**: Form fields fill progressively as AI completes each step
- **Particle Animation System**: Floating particles burst from center when AI starts working
- **Repository Statistics**: Stars, forks, language, and contributor information
- **Success Celebration**: Beautiful completion modal with project summary and statistics

**Technical Implementation:**
- **GitHub API Integration**: Real-time repository data fetching and analysis
- **Multi-Step AI Process**: 5 distinct processing steps with individual durations and descriptions
- **Progress Management**: Real-time progress calculation and smooth progress bar animations
- **Form State Management**: React hooks for complex form data and AI state management
- **Animation System**: Framer Motion with staggered animations and smooth transitions
- **Performance**: Optimized animations with proper cleanup and memory management

**AI Process Steps:**
- **Step 1 (Validate)**: 1s - Validating GitHub URL format and accessibility
- **Step 2 (Analyze)**: 2s - Fetching repository metadata and project information
- **Step 3 (Extract)**: 2.5s - Detecting languages, frameworks, and dependencies
- **Step 4 (Research)**: 2s - Collecting contributor information and project statistics
- **Step 5 (Optimize)**: 1.5s - Processing and formatting the collected data

**Real Data Extraction:**
- **Repository Metadata**: Name, description, homepage, license, size, last updated
- **Technology Detection**: Primary language, package.json dependencies analysis
- **Contributor Information**: Top contributors with contribution counts
- **Repository Statistics**: Stars, forks, and repository size
- **Smart Tag Generation**: Automatic tags based on topics, language, and description

**Animation Details:**
- **Progress Bar**: Smooth width animation from 0% to 100% with gradient colors
- **Step Transitions**: Fade and slide animations between AI processing steps
- **Form Population**: Staggered entrance animations for each filled field
- **Particle Effects**: 12 particles expanding outward in circular patterns
- **Success Modal**: Scale and fade animations with spring physics

**Interactive Elements:**
- **GitHub URL Input**: Input field for repository URL with validation
- **AI Control Panel**: Start button with loading states and progress visualization
- **Real-time Progress**: Live progress percentage and animated progress bar
- **Step Indicators**: Current AI step with icon, title, and description
- **Form Fields**: Interactive inputs that populate as AI completes each step
- **Repository Stats**: Visual display of stars, forks, and language
- **Success Celebration**: Completion modal with project summary and statistics

**Form Fields Populated:**
- **Project Title**: Repository name with proper formatting
- **Description**: Repository description or generated description
- **Technologies**: Detected languages and dependencies from package.json
- **URLs**: GitHub repository URL and homepage (if available)
- **Tags**: Smart tags based on topics, language, and description analysis
- **Collaborators**: Top contributors from the repository
- **Status**: Published (default)
- **Repository Stats**: Stars, forks, language, license, size, last updated

**Color Scheme:**
- **Primary**: Purple to Pink gradients for AI theme
- **Progress**: Purple to Pink progress bar with smooth animations
- **Steps**: Color-coded step indicators (Blue, Purple, Emerald, Yellow, Red)
- **Form Elements**: Dark theme with purple focus rings and emerald checkmarks
- **Stats Display**: Gray backgrounds with colored icons for visual hierarchy

**User Experience:**
- **Real Data**: Connect to actual GitHub repositories for authentic experience
- **Engaging Wait Time**: Rich animations and progress feedback make waiting enjoyable
- **Educational**: Users learn about AI processing steps and repository analysis
- **Progressive Disclosure**: Form fills step-by-step, building anticipation
- **Visual Feedback**: Clear progress indicators and completion states
- **Celebration**: Success modal provides satisfaction and detailed statistics

**AI Capabilities Showcase:**
- **URL Validation**: Intelligent GitHub URL parsing and validation
- **Repository Analysis**: Real-time metadata extraction and processing
- **Technology Detection**: Smart dependency analysis and language identification
- **Contributor Analysis**: Contributor identification and statistics gathering
- **Content Generation**: Intelligent tag generation and description formatting

**Components Used:**
- `AIAutofillForm`: Main component with AI state management and form logic
- `GitHub Integration`: Real API calls for repository data and contributors
- `Progress Tracking`: Real-time progress bar and step visualization
- `Form Fields`: Interactive inputs with progressive population
- `Repository Stats`: Visual display of repository statistics
- `Particle System`: Floating animation effects during AI processing
- `Success Modal`: Completion celebration with project summary and stats

**Performance Features:**
- **Smooth Animations**: 60fps animations with proper easing curves
- **Memory Management**: Proper cleanup of intervals and timers
- **API Optimization**: Efficient GitHub API calls with error handling
- **Optimized Rendering**: Efficient state updates and re-renders
- **Accessibility**: Proper ARIA labels and keyboard navigation support

**GitHub API Features:**
- **Repository Data**: Complete repository information and metadata
- **Contributor Analysis**: Top contributors with contribution statistics
- **Package.json Parsing**: Dependency analysis for technology detection
- **Topic Analysis**: Repository topics for intelligent tag generation
- **Error Handling**: Graceful fallbacks for API failures

How to view:
- Visit `/day-7` in the running app
- Enter a GitHub repository URL (e.g., https://github.com/username/repo)
- Click "🚀 Start AI Autofill" to begin the AI process
- Watch the 5-step AI analysis with real-time progress
- Observe form fields populate progressively with real repository data
- Experience the particle animations and smooth transitions
- Celebrate completion with the success modal showing repository statistics

Implementation Notes:
- Page: `src/app/day-7/page.tsx`
- GitHub Integration: Real API calls for authentic repository data
- AI Process: 5-step process with realistic timing and real data processing
- Progress System: Real-time progress calculation and smooth animations
- Form Management: Progressive field population with real repository data
- Data Extraction: Package.json parsing, contributor analysis, and smart tagging
- Particles: Floating animation system with circular expansion patterns

### Credits
- Peerlist Logo and challenge content belong to Peerlist.