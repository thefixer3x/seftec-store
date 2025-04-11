
# Testing Documentation

This directory contains tests for the application components and functionality.

## Test Structure

Tests are organized into the following categories:

- **Unit Tests**: Testing individual components in isolation
  - Focus on validating a single function, component, or module
  - Example: Testing that a Button component renders correctly with different props
  - Usually don't require mocking of dependencies or complex setup

- **Integration Tests**: Testing interactions between components
  - Validate that multiple components work correctly together
  - Example: Testing that a form submission triggers the correct API call and updates UI state
  - May require mocking of external dependencies like API endpoints

- **End-to-End Tests**: Testing complete user flows
  - Simulate real user interactions across multiple pages or views
  - Example: Testing the entire checkout process from product selection to order confirmation
  - Often run in a browser-like environment to test the full application

## Running Tests

To run tests:

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- -t "ComponentName"

# Run with coverage report
npm run test:coverage

# Run tests in watch mode for development
npm run test:watch
```

### Environment Configuration

- Tests use a separate `.env.test` file for environment variables
- Set `TEST_TIMEOUT=10000` for tests that involve API calls or animations
- Mock external services automatically using the `mockServiceWorker.js` setup

### Debugging Tests

- Use `console.log` statements within tests - they appear in the terminal
- Add `debugger;` statement and run tests with `npm run test:debug` to use Chrome DevTools
- Examine test snapshots in `__snapshots__` directory to debug rendering issues

## Test Strategy

### Component Testing

Component tests verify that UI components render correctly under different conditions 
and respond appropriately to user interactions.

### Feature Testing

Feature tests verify that complete features work as expected from a user's perspective.

### API Testing

API tests verify that the application correctly integrates with backend services,
including error handling and edge cases.

## Writing New Tests

When writing new tests:

1. Create a new file with the pattern `[component-name].test.tsx`
2. Import the necessary testing utilities
3. Write tests that cover the component's main functionality
4. Consider edge cases and error states

### Basic Component Test Example

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    render(<MyComponent />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Result after click')).toBeInTheDocument();
  });
});
```

### Using Custom Render Function

Our `test-utils.ts` provides a custom render function that wraps components with necessary providers:

```tsx
import { render, screen } from '@/components/tests/test-utils';
import ProfileSettings from '@/components/account/ProfileSettings';

describe('ProfileSettings', () => {
  it('renders user profile when authenticated', () => {
    // Custom render includes all providers (Auth, Router, Theme, etc.)
    render(<ProfileSettings />);
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
  });
});
```

### Mocking Dependencies

For components that rely on Supabase, context providers, or other external dependencies,
use the mock utilities provided in the `test-utils.ts` file.

```tsx
import { render, screen, mockAuthContext } from '@/components/tests/test-utils';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';

describe('UserProfileDropdown', () => {
  it('shows user info when logged in', () => {
    // Mock the auth context with authenticated user
    mockAuthContext.user = { id: '123', email: 'test@example.com' };
    mockAuthContext.profile = { name: 'Test User' };
    
    render(<UserProfileDropdown />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
  
  it('shows login button when logged out', () => {
    // Reset auth context to unauthenticated state
    mockAuthContext.user = null;
    mockAuthContext.profile = null;
    
    render(<UserProfileDropdown />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
```

## Responsive Testing

Test components at different viewport sizes using the `setViewport` helper:

```tsx
import { render, screen, setViewport } from '@/components/tests/test-utils';
import Navbar from '@/components/ui/navbar';

describe('Navbar', () => {
  it('renders mobile menu on small screens', () => {
    // Set viewport to mobile size
    setViewport(375, 667);
    render(<Navbar />);
    expect(screen.getByLabelText('Toggle Menu')).toBeInTheDocument();
  });
  
  it('renders full menu on desktop', () => {
    // Set viewport to desktop size
    setViewport(1280, 800);
    render(<Navbar />);
    expect(screen.getByText('Features')).toBeInTheDocument();
  });
});
```

## Accessibility Testing

We prioritize accessibility in our testing approach:

- Use `jest-axe` to test for accessibility violations
- Test keyboard navigation for interactive components
- Verify proper aria attributes and screen reader compatibility

```tsx
import { render } from '@/components/tests/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '@/components/ui/button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click Me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Troubleshooting and Debugging Tests

### Common Pitfalls

1. **Asynchronous Testing Issues**:
   - Always use `async/await` with user interactions
   - Use `waitFor` or `findByText` for elements that appear after state changes

2. **Provider Context Problems**:
   - Ensure components have access to required contexts through the custom render function
   - Reset mocked context values between tests

3. **Test Isolation**:
   - Use `beforeEach` to reset state between tests
   - Avoid shared mutable state between test cases

### Troubleshooting Checklist

- [ ] Does the test use the correct render function?
- [ ] Are all required props passed to the component?
- [ ] Are async operations properly awaited?
- [ ] Are mocks properly set up and reset between tests?
- [ ] Are selectors finding the right elements (try screen.debug())?
- [ ] Is the test interacting with the DOM the way a user would?

## CI/CD Integration

Tests are automatically run as part of the CI/CD pipeline to ensure code quality:

- Unit and integration tests run on every pull request
- End-to-end tests run before deployment to production
- Test coverage reports are generated and monitored

**Note**: These documentation updates have been designed to be modular and non-disruptive to the existing test infrastructure and CI/CD pipeline.
