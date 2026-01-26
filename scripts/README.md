# SefTec Store Scripts

Utility and deployment scripts for the SefTec Store application.

## Available Scripts

### Database Migration Scripts

#### `apply-migration.sh`
Applies database migrations to Supabase.

**Usage:**
```bash
./scripts/apply-migration.sh
```

**Requirements:**
- Supabase CLI installed
- Environment variables configured
- Database access credentials

#### `apply-migration-direct.sh`
Directly applies migrations without CLI wrapper.

**Usage:**
```bash
./scripts/apply-migration-direct.sh [migration_file]
```

### Deployment Scripts

#### `deploy.js`
Single deployment script for production deployment.

**Usage:**
```bash
node scripts/deploy.js
```

**Features:**
- Environment validation
- Build process
- Deploy to hosting platform
- Post-deployment verification

#### `deploy-multi.js`
Multi-environment deployment orchestration.

**Usage:**
```bash
node scripts/deploy-multi.js [environment]
```

**Environments:**
- `development` - Dev environment
- `staging` - Staging environment
- `production` - Production environment

### GitHub Issue Management

#### `create-all-issues.sh`
Creates all GitHub issues from the issue backlog.

**Usage:**
```bash
./scripts/create-all-issues.sh
```

**Requirements:**
- GitHub CLI (`gh`) installed
- Authenticated with GitHub
- Repository access

#### `create-priority-issues.sh`
Creates only priority GitHub issues.

**Usage:**
```bash
./scripts/create-priority-issues.sh
```

### Testing Scripts

#### `test_stripe_integration.sh`
Tests Stripe payment integration functionality.

**Usage:**
```bash
./scripts/test_stripe_integration.sh
```

**Tests:**
- Stripe API connectivity
- Webhook configuration
- Payment processing flow
- Subscription management

### Utility Scripts

#### `find-hardcoded-text.js`
Finds hardcoded text that should be internationalized.

**Usage:**
```bash
node scripts/find-hardcoded-text.js
```

**Output:**
- List of hardcoded strings
- Files containing hardcoded text
- Suggested i18n keys

#### `generate-assets.js`
Generates app assets (icons, splash screens, etc.).

**Usage:**
```bash
node scripts/generate-assets.js
```

**Generates:**
- iOS app icons
- Android app icons
- Web app icons
- Splash screens

## Script Permissions

Make scripts executable:
```bash
chmod +x scripts/*.sh
```

## Environment Variables

Most scripts require these environment variables:

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# GitHub (for issue scripts)
GITHUB_TOKEN=your_github_token
```

See `.env.example` in the project root for complete list.

## Best Practices

1. **Test First**: Always test scripts in development before production
2. **Backup**: Backup database before running migration scripts
3. **Review Changes**: Review generated issues/assets before committing
4. **Monitor**: Monitor deployments for errors
5. **Document**: Update this README when adding new scripts

## Troubleshooting

### Permission Denied
```bash
chmod +x scripts/script-name.sh
```

### Missing Dependencies
```bash
# Install Supabase CLI
npm install -g supabase

# Install GitHub CLI
brew install gh  # macOS
# or visit https://cli.github.com for other platforms
```

### Script Fails
Check:
1. Environment variables are set
2. You have proper access credentials
3. Dependencies are installed
4. You're in the correct directory

## Maintenance

Scripts in this directory were organized from the project root on January 26, 2026 to maintain a clean project structure.

For deployment documentation, see `../docs/DEPLOYMENT_TEST_GUIDE.md`.
