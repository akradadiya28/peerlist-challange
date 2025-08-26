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

### Credits
- Peerlist Logo and challenge content belong to Peerlist.