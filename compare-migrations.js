#!/usr/bin/env node

/**
 * Migration Priority Comparison Tool
 * 
 * Compares migration files from:
 * 1. onasis-core/services/auth-Gateway
 * 2. onasis-core submodule
 * 3. Current seftec-store project
 * 4. Neon database (via connection string or MCP)
 * 
 * Usage:
 *   node compare-migrations.js [options]
 * 
 * Options:
 *   --onasis-core-path <path>    Path to onasis-core directory
 *   --auth-gateway-path <path>   Path to auth-Gateway service
 *   --neon-connection <string>   Neon database connection string
 *   --output <file>              Output report file (default: migration-comparison-report.md)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  onasisCorePath: process.env.ONASIS_CORE_PATH || null,
  authGatewayPath: process.env.AUTH_GATEWAY_PATH || null,
  neonConnection: process.env.NEON_DATABASE_URL || null,
  outputFile: 'migration-comparison-report.md',
  currentProjectPath: __dirname,
  currentMigrationsPath: path.join(__dirname, 'supabase', 'migrations')
};

// Parse command line arguments
process.argv.forEach((arg, index) => {
  if (arg === '--onasis-core-path' && process.argv[index + 1]) {
    config.onasisCorePath = process.argv[index + 1];
  }
  if (arg === '--auth-gateway-path' && process.argv[index + 1]) {
    config.authGatewayPath = process.argv[index + 1];
  }
  if (arg === '--neon-connection' && process.argv[index + 1]) {
    config.neonConnection = process.argv[index + 1];
  }
  if (arg === '--output' && process.argv[index + 1]) {
    config.outputFile = process.argv[index + 1];
  }
});

/**
 * Get all migration files from a directory
 */
function getMigrationFiles(dirPath) {
  if (!dirPath || !fs.existsSync(dirPath)) {
    return [];
  }

  try {
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.sql'))
      .map(file => ({
        name: file,
        path: path.join(dirPath, file),
        timestamp: extractTimestamp(file),
        content: fs.readFileSync(path.join(dirPath, file), 'utf8')
      }))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    return files;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Extract timestamp from migration filename
 */
function extractTimestamp(filename) {
  const match = filename.match(/^(\d{14}|\d{8})/);
  return match ? match[1] : '00000000000000';
}

/**
 * Get applied migrations from Neon database
 */
async function getNeonMigrations(connectionString) {
  if (!connectionString) {
    return [];
  }

  try {
    // Try using psql to query schema_migrations or similar table
    const query = `
      SELECT name, version, executed_at 
      FROM schema_migrations 
      ORDER BY version;
    `;

    const result = execSync(
      `psql "${connectionString}" -t -c "${query}"`,
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );

    return result.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const parts = line.trim().split('|');
        return {
          name: parts[0]?.trim() || '',
          version: parts[1]?.trim() || '',
          executed_at: parts[2]?.trim() || ''
        };
      });
  } catch (error) {
    console.warn('Could not query Neon database:', error.message);
    console.warn('You may need to provide the connection string or use Neon MCP');
    return [];
  }
}

/**
 * Analyze migration content
 */
function analyzeMigration(migration) {
  const content = migration.content || '';
  
  return {
    tables: extractTables(content),
    functions: extractFunctions(content),
    policies: extractPolicies(content),
    triggers: extractTriggers(content),
    indexes: extractIndexes(content),
    extensions: extractExtensions(content),
    hasRLS: content.includes('ENABLE ROW LEVEL SECURITY') || content.includes('ENABLE RLS'),
    size: content.length,
    lines: content.split('\n').length
  };
}

function extractTables(content) {
  const matches = content.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?([a-z_]+)/gi);
  return Array.from(matches, m => m[1]);
}

function extractFunctions(content) {
  const matches = content.matchAll(/CREATE (?:OR REPLACE )?FUNCTION ([a-z_]+)/gi);
  return Array.from(matches, m => m[1]);
}

function extractPolicies(content) {
  const matches = content.matchAll(/CREATE POLICY "([^"]+)"/gi);
  return Array.from(matches, m => m[1]);
}

function extractTriggers(content) {
  const matches = content.matchAll(/CREATE TRIGGER ([a-z_]+)/gi);
  return Array.from(matches, m => m[1]);
}

function extractIndexes(content) {
  const matches = content.matchAll(/CREATE (?:UNIQUE )?INDEX (?:IF NOT EXISTS )?([a-z_]+)/gi);
  return Array.from(matches, m => m[1]);
}

function extractExtensions(content) {
  const matches = content.matchAll(/CREATE EXTENSION (?:IF NOT EXISTS )?["']?([a-z_-]+)["']?/gi);
  return Array.from(matches, m => m[1]);
}

/**
 * Compare migrations
 */
function compareMigrations(sourceMigrations, targetMigrations) {
  const sourceMap = new Map(sourceMigrations.map(m => [m.name, m]));
  const targetMap = new Map(targetMigrations.map(m => [m.name, m]));

  const onlyInSource = sourceMigrations.filter(m => !targetMap.has(m.name));
  const onlyInTarget = targetMigrations.filter(m => !sourceMap.has(m.name));
  const inBoth = sourceMigrations.filter(m => targetMap.has(m.name));

  const differences = inBoth.map(m => {
    const target = targetMap.get(m.name);
    return {
      name: m.name,
      source: analyzeMigration(m),
      target: analyzeMigration(target),
      identical: m.content === target.content
    };
  });

  return {
    onlyInSource,
    onlyInTarget,
    inBoth,
    differences
  };
}

/**
 * Generate report
 */
function generateReport(comparisons) {
  const report = [];
  
  report.push('# Migration Priority Comparison Report');
  report.push(`Generated: ${new Date().toISOString()}\n`);
  
  report.push('## Summary');
  report.push('');
  report.push('| Source | Migrations | Status |');
  report.push('|--------|------------|--------|');
  
  comparisons.forEach(comp => {
    const status = comp.onlyInSource.length > 0 ? '⚠️ Missing in Target' : '✅ Synced';
    report.push(`| ${comp.name} | ${comp.sourceMigrations.length} | ${status} |`);
  });
  
  report.push('');
  report.push('## Detailed Comparison');
  report.push('');
  
  comparisons.forEach(comp => {
    report.push(`### ${comp.name}`);
    report.push('');
    
    if (comp.onlyInSource.length > 0) {
      report.push(`#### ⚠️ Migrations Missing in Target (${comp.onlyInSource.length})`);
      report.push('');
      comp.onlyInSource.forEach(m => {
        const analysis = analyzeMigration(m);
        report.push(`- **${m.name}**`);
        report.push(`  - Tables: ${analysis.tables.length} (${analysis.tables.join(', ') || 'none'})`);
        report.push(`  - Functions: ${analysis.functions.length}`);
        report.push(`  - Policies: ${analysis.policies.length}`);
        report.push(`  - RLS: ${analysis.hasRLS ? 'Yes' : 'No'}`);
        report.push(`  - Size: ${(analysis.size / 1024).toFixed(2)} KB`);
        report.push('');
      });
    }
    
    if (comp.onlyInTarget.length > 0) {
      report.push(`#### ✅ Migrations Only in Target (${comp.onlyInTarget.length})`);
      report.push('');
      comp.onlyInTarget.forEach(m => {
        report.push(`- ${m.name}`);
      });
      report.push('');
    }
    
    if (comp.differences.length > 0) {
      const different = comp.differences.filter(d => !d.identical);
      if (different.length > 0) {
        report.push(`#### 🔄 Migrations with Differences (${different.length})`);
        report.push('');
        different.forEach(d => {
          report.push(`- **${d.name}**`);
          report.push(`  - Content differs: ${!d.identical ? 'Yes' : 'No'}`);
          report.push('');
        });
      }
    }
  });
  
  report.push('');
  report.push('## Priority Actions');
  report.push('');
  
  const allMissing = comparisons.flatMap(comp => comp.onlyInSource);
  if (allMissing.length > 0) {
    report.push('### High Priority: Apply Missing Migrations');
    report.push('');
    allMissing
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .forEach(m => {
        report.push(`1. **${m.name}**`);
        report.push(`   - Path: ${m.path}`);
        report.push(`   - Priority: ${getPriority(m)}`);
        report.push('');
      });
  }
  
  return report.join('\n');
}

function getPriority(migration) {
  const content = migration.content || '';
  const analysis = analyzeMigration(migration);
  
  if (analysis.hasRLS || analysis.policies.length > 0) return '🔴 Critical (Security)';
  if (analysis.tables.length > 0) return '🟠 High (Schema)';
  if (analysis.functions.length > 0) return '🟡 Medium (Functions)';
  return '🟢 Low (Other)';
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Migration Comparison Tool');
  console.log('============================\n');
  
  // Get current project migrations
  console.log('📁 Reading current project migrations...');
  const currentMigrations = getMigrationFiles(config.currentMigrationsPath);
  console.log(`   Found ${currentMigrations.length} migrations\n`);
  
  // Get onasis-core migrations
  let onasisMigrations = [];
  if (config.onasisCorePath) {
    console.log('📁 Reading onasis-core migrations...');
    const onasisMigrationsPath = path.join(config.onasisCorePath, 'supabase', 'migrations');
    onasisMigrations = getMigrationFiles(onasisMigrationsPath);
    console.log(`   Found ${onasisMigrations.length} migrations\n`);
  } else {
    console.log('⚠️  onasis-core path not provided\n');
  }
  
  // Get auth-gateway migrations
  let authGatewayMigrations = [];
  if (config.authGatewayPath) {
    console.log('📁 Reading auth-gateway migrations...');
    const authMigrationsPath = path.join(config.authGatewayPath, 'migrations');
    authGatewayMigrations = getMigrationFiles(authMigrationsPath);
    console.log(`   Found ${authGatewayMigrations.length} migrations\n`);
  } else {
    console.log('⚠️  auth-gateway path not provided\n');
  }
  
  // Get Neon migrations
  let neonMigrations = [];
  if (config.neonConnection) {
    console.log('🗄️  Querying Neon database...');
    neonMigrations = await getNeonMigrations(config.neonConnection);
    console.log(`   Found ${neonMigrations.length} applied migrations\n`);
  } else {
    console.log('⚠️  Neon connection string not provided\n');
  }
  
  // Perform comparisons
  const comparisons = [];
  
  if (onasisMigrations.length > 0) {
    const comp = compareMigrations(onasisMigrations, currentMigrations);
    comparisons.push({
      name: 'onasis-core vs seftec-store',
      sourceMigrations: onasisMigrations,
      targetMigrations: currentMigrations,
      ...comp
    });
  }
  
  if (authGatewayMigrations.length > 0) {
    const comp = compareMigrations(authGatewayMigrations, currentMigrations);
    comparisons.push({
      name: 'auth-gateway vs seftec-store',
      sourceMigrations: authGatewayMigrations,
      targetMigrations: currentMigrations,
      ...comp
    });
  }
  
  // Generate report
  console.log('📝 Generating report...');
  const report = generateReport(comparisons);
  
  // Write report
  const reportPath = path.join(config.currentProjectPath, config.outputFile);
  fs.writeFileSync(reportPath, report);
  console.log(`✅ Report written to: ${reportPath}\n`);
  
  // Print summary
  console.log('📊 Summary:');
  comparisons.forEach(comp => {
    console.log(`   ${comp.name}:`);
    console.log(`     - Missing in target: ${comp.onlyInSource.length}`);
    console.log(`     - Only in target: ${comp.onlyInTarget.length}`);
    console.log(`     - In both: ${comp.inBoth.length}`);
  });
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

module.exports = { getMigrationFiles, compareMigrations, analyzeMigration };
