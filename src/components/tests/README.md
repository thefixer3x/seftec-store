
# Testing Documentation

This directory contains tests for the application components and functionality.

## Test Structure

Tests are organized into the following categories:

- **Unit Tests**: Testing individual components in isolation
- **Integration Tests**: Testing interactions between components
- **End-to-End Tests**: Testing complete user flows

## Running Tests

To run tests:

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- -t "ComponentName"

# Run with coverage report
npm run test:coverage
```

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

Example:

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

## Mocking Dependencies

For components that rely on Supabase, context providers, or other external dependencies,
use the mock utilities provided in the `test-utils.ts` file.

## CI/CD Integration

Tests are automatically run as part of the CI/CD pipeline to ensure code quality.
