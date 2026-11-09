import { describe, expect, it } from 'vitest';
import { isPublicRoute } from './publicRoutes';

describe('isPublicRoute', () => {
  it('allows signed-out visitors to open BizTools and BizGenie', () => {
    expect(isPublicRoute('/biztools')).toBe(true);
    expect(isPublicRoute('/bizgenie')).toBe(true);
  });

  it('keeps protected application routes private', () => {
    expect(isPublicRoute('/profile/dashboard')).toBe(false);
    expect(isPublicRoute('/dashboard/analytics')).toBe(false);
  });
});