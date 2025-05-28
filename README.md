# SEFTEC Platform

## Project Overview

SEFTEC is a comprehensive enterprise platform built with React, TypeScript, Vite, and Supabase. Deployed on GitHub Pages at https://thefixer3x.github.io/seftec-store, this multi-feature e-commerce and business management platform offers secure, regulated blockchain integration and enterprise-grade DeFi infrastructure.

## Features

### Core Features

- **E-commerce Marketplace**: Complete B2C shop with product listings, cart management, and checkout.
- **Business Management Tools**: Enterprise tools for operations management.
- **Financial Dashboard**: Comprehensive analytics and reporting.
- **AI-powered Assistance**: Intelligent recommendations and business insights.
- **Authentication System**: Secure user authentication and profile management.
- **Subscription Services**: Premium features with tiered access levels.
- **Dark/Light Mode**: UI theme toggle for user preference.

### Payment Integrations

- **Stripe**: Primary payment processor for international transactions.
- **SaySwitch**: Local payment gateway integration with secure signature verification.
- **PayPal**: Additional payment option for international customers.

### Recent Major Updates (May 2025)

#### 1. E-Doc Bank Statement Integration

- Nigerian bank connections with real-time transaction sync
- AI-powered transaction categorization
- Financial insights generation for premium users
- GDPR-compliant consent management

#### 2. AI System Enhancements

- Personalized product recommendations
- Enhanced AI chat functionality
- Developer tools for system administration
- Consent management system for privacy compliance

#### 3. Payment Gateway Expansions

- SaySwitch integration for local payments
- PayPal integration for international coverage
- Enhanced admin dashboard for payment gateway management

## Technical Stack

- **Frontend**: React 18.3, TypeScript, Tailwind CSS, shadcn-ui components
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **State Management**: TanStack Query for data fetching and caching
- **Routing**: React Router v6 for application routing
- **UI Components**: Radix UI primitives with custom styling
- **Deployment**: GitHub Pages via Lovable platform

## Project Structure

```
/src
  /components       # UI components organized by feature
    /account        # User account management components
    /ai             # AI-related components
    /auth           # Authentication components
    /dashboard      # Main dashboard features
    /edoc           # Banking integration components
    /ui             # Reusable UI primitives (shadcn-ui)
  /features         # Modular feature architecture
    /ai-assistant   # AI assistant implementation
    /auth           # Authentication logic
    /b2c-shop       # E-commerce shop features
    /marketplace    # Marketplace functionality
    /sayswitch      # SaySwitch payment integration
  /hooks            # Custom React hooks
  /pages            # Route pages
  /supabase         # Backend configuration
    /functions      # Edge functions
    /migrations     # Database schema
```

## Installation and Setup

### Prerequisites

- Node.js 16+ and npm (or yarn)
- Supabase account for backend services
- API keys for integrated services (Stripe, SaySwitch, PayPal, etc.)

### Local Development

```sh
# Clone the repository
git clone https://github.com/thefixer3x/seftec-store.git

# Navigate to project directory
cd seftec-store

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Required for full functionality:

```
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# SaySwitch
VITE_SAYSWITCH_BASE_URL=your_sayswitch_base_url
VITE_SAYSWITCH_PUBLIC_KEY=your_sayswitch_public_key

# PayPal
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_PAYPAL_MODE=sandbox_or_production
```

## Deployment

The application is deployed to GitHub Pages using a custom deployment script:

```sh
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Feature Flags

The application uses a feature flag system to enable/disable features. In development mode, all features are enabled by default. In production, features are controlled through the Supabase database.

Key feature flags include:

- `AI_RECOMMENDATIONS`: Controls AI-powered product recommendations
- `SAYSWITCH_PAYMENTS`: Enables SaySwitch payment integration
- `PAYPAL_PAYMENTS`: Enables PayPal payment integration
- `EDOC_INTEGRATION`: Controls E-Doc bank statement integration

## Testing

```sh
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Proprietary - All rights reserved by SEFTEC DYNAMICS.

## Development Tools

### IDE Integration

This project is configured to work well with popular code editors:

- VSCode with the following recommended extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- Automated testing on push to main branch
- Automatic deployment to GitHub Pages on successful build
- Code quality checks and linting validation

## Documentation

### API Documentation

API documentation for edge functions is available in the `/docs` directory.

### Edge Functions

Key edge functions include:

- `/supabase/functions/stripe-webhook`: Handles Stripe webhook events
- `/supabase/functions/sayswitch-webhook`: Processes SaySwitch payment notifications
- `/supabase/functions/paypal-webhook`: Manages PayPal IPN messages
- `/supabase/functions/edoc-webhook`: Handles E-Doc bank statement updates

## Support and Contact

For technical support or feature requests, please open an issue on the GitHub repository or contact the development team at support@seftec.store.

---

© 2025 SEFTEC DYNAMICS. All Rights Reserved.
