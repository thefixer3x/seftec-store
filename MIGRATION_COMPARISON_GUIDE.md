# Migration Priority Comparison Guide

This guide helps you compare migration files between:
- `onasis-core` submodule
- `onasis-core/services/auth-Gateway`
- Current `seftec-store` project
- Neon database (what's actually applied)

## Quick Start

### Option 1: Using the Comparison Tool

```bash
# Set paths and connection string
export ONASIS_CORE_PATH="/path/to/onasis-core"
export AUTH_GATEWAY_PATH="/path/to/onasis-core/services/auth-Gateway"
export NEON_DATABASE_URL="postgres://user:pass@host:port/dbname"

# Run comparison
node compare-migrations.js
```

### Option 2: Manual Path Specification

```bash
node compare-migrations.js \
  --onasis-core-path "/path/to/onasis-core" \
  --auth-gateway-path "/path/to/onasis-core/services/auth-Gateway" \
  --neon-connection "postgres://user:pass@host:port/dbname" \
  --output migration-report.md
```

## Finding the Paths

### 1. Locate onasis-core Submodule

```bash
# Check if it's a git submodule
cd /Users/seyederick/DevOps/_project_folders/SEF-PROJECT
find . -name ".gitmodules" -exec cat {} \;

# Or search for onasis-core directory
find /Users/seyederick/DevOps/_project_folders/SEF-PROJECT -type d -name "onasis-core" 2>/dev/null
```

### 2. Locate auth-Gateway Service

```bash
# Search for auth-gateway or auth-Gateway
find /Users/seyederick/DevOps/_project_folders/SEF-PROJECT -type d -name "*auth*gateway*" -o -name "*auth*Gateway*" 2>/dev/null
```

### 3. Get Neon Database Connection String

If you have the connection string exported, you can use it directly:

```bash
# Option A: Export as environment variable
export NEON_DATABASE_URL="postgres://user:password@host.neon.tech:5432/dbname?sslmode=require"

# Option B: Pass as argument
node compare-migrations.js --neon-connection "postgres://..."
```

## Querying Neon Database Directly

If you just want to see what's in the Neon database:

```bash
node query-neon-migrations.js --connection="postgres://..." --output neon-migrations.json
```

This will:
- Query for applied migrations
- List all tables, functions, and triggers
- Save results to a JSON file

## Understanding the Report

The comparison tool generates a report with:

### Summary Table
Shows how many migrations are in each source and their sync status.

### Detailed Comparison
- **Missing in Target**: Migrations that exist in source but not in target
- **Only in Target**: Migrations that exist in target but not in source
- **Differences**: Migrations that exist in both but have different content

### Priority Actions
Lists migrations that need to be applied, sorted by:
- 🔴 **Critical (Security)**: RLS policies, security-related
- 🟠 **High (Schema)**: Table creation, schema changes
- 🟡 **Medium (Functions)**: Function definitions
- 🟢 **Low (Other)**: Other changes

## Example Workflow

1. **Find the paths**:
   ```bash
   # Search for onasis-core
   find ~/DevOps/_project_folders/SEF-PROJECT -name "onasis-core" -type d
   ```

2. **Get Neon connection string** (if you have it exported):
   ```bash
   echo $NEON_DATABASE_URL
   ```

3. **Run comparison**:
   ```bash
   node compare-migrations.js \
     --onasis-core-path "/found/path/to/onasis-core" \
     --auth-gateway-path "/found/path/to/auth-Gateway" \
     --neon-connection "$NEON_DATABASE_URL"
   ```

4. **Review the report**:
   ```bash
   cat migration-comparison-report.md
   ```

5. **Apply missing migrations** based on priority

## Troubleshooting

### "psql: command not found"
Install PostgreSQL client:
```bash
# macOS
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql-client
```

### "Connection refused" or "Authentication failed"
- Verify the connection string is correct
- Check if the database is accessible from your network
- Ensure SSL mode is set if required: `?sslmode=require`

### "No migrations found"
- Check that the paths are correct
- Verify migration files have `.sql` extension
- Ensure you have read permissions

### Neon MCP Not Working
If the Neon MCP server isn't working, use the exported connection string:
```bash
# Use the connection string directly
export NEON_DATABASE_URL="your-connection-string-here"
node compare-migrations.js --neon-connection "$NEON_DATABASE_URL"
```

## Next Steps

After running the comparison:

1. **Review the report** to identify missing migrations
2. **Prioritize** based on the priority indicators
3. **Apply migrations** in order (oldest first)
4. **Verify** by running the comparison again

## Files Created

- `compare-migrations.js` - Main comparison tool
- `query-neon-migrations.js` - Neon database query tool
- `migration-comparison-report.md` - Generated comparison report
