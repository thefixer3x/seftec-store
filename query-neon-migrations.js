#!/usr/bin/env node

/**
 * Query Neon Database for Applied Migrations
 * 
 * This script queries a Neon database to get the list of applied migrations.
 * It can work with either:
 * 1. A PostgreSQL connection string
 * 2. Neon MCP (if available)
 * 
 * Usage:
 *   node query-neon-migrations.js --connection "postgres://..." --output migrations.json
 */

const { execSync } = require('child_process');
const fs = require('fs');

const connectionString = process.argv.find(arg => arg.startsWith('--connection'))?.split('=')[1] || 
                        process.env.NEON_DATABASE_URL;

if (!connectionString) {
  console.error('❌ Error: No connection string provided');
  console.error('Usage: node query-neon-migrations.js --connection="postgres://..."');
  console.error('Or set NEON_DATABASE_URL environment variable');
  process.exit(1);
}

async function queryMigrations() {
  try {
    console.log('🔍 Querying Neon database for applied migrations...\n');
    
    // Try different migration tracking approaches
    const queries = [
      // Supabase approach
      `SELECT name, version, executed_at 
       FROM supabase_migrations.schema_migrations 
       ORDER BY version;`,
      
      // Standard approach
      `SELECT name, version, executed_at 
       FROM schema_migrations 
       ORDER BY version;`,
      
      // Check if migrations table exists
      `SELECT table_name 
       FROM information_schema.tables 
       WHERE table_schema = 'public' 
       AND table_name LIKE '%migration%';`,
      
      // Get all tables to see what's been created
      `SELECT table_name, table_type
       FROM information_schema.tables 
       WHERE table_schema = 'public' 
       ORDER BY table_name;`
    ];
    
    const results = {};
    
    for (const query of queries) {
      try {
        const result = execSync(
          `psql "${connectionString}" -t -A -F'|' -c "${query.replace(/\n/g, ' ')}"`,
          { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, stdio: 'pipe' }
        );
        
        if (result.trim()) {
          results[query] = result.trim().split('\n').filter(line => line.trim());
        }
      } catch (error) {
        // Query failed, try next one
        continue;
      }
    }
    
    // Also get list of functions, triggers, and policies
    const schemaQuery = `
      SELECT 
        'table' as type, table_name as name
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      UNION ALL
      SELECT 
        'function' as type, routine_name as name
      FROM information_schema.routines 
      WHERE routine_schema = 'public'
      UNION ALL
      SELECT 
        'trigger' as type, trigger_name as name
      FROM information_schema.triggers 
      WHERE trigger_schema = 'public'
      ORDER BY type, name;
    `;
    
    try {
      const schemaResult = execSync(
        `psql "${connectionString}" -t -A -F'|' -c "${schemaQuery.replace(/\n/g, ' ')}"`,
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, stdio: 'pipe' }
      );
      
      if (schemaResult.trim()) {
        results.schema_objects = schemaResult.trim().split('\n').filter(line => line.trim());
      }
    } catch (error) {
      console.warn('Could not query schema objects:', error.message);
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Error querying database:', error.message);
    console.error('\nMake sure:');
    console.error('1. psql is installed and in your PATH');
    console.error('2. The connection string is correct');
    console.error('3. You have network access to the database');
    throw error;
  }
}

async function main() {
  try {
    const results = await queryMigrations();
    
    console.log('✅ Query Results:\n');
    console.log(JSON.stringify(results, null, 2));
    
    // Save to file if requested
    const outputFile = process.argv.find(arg => arg.startsWith('--output'))?.split('=')[1];
    if (outputFile) {
      fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
      console.log(`\n💾 Results saved to: ${outputFile}`);
    }
    
  } catch (error) {
    console.error('Failed to query migrations:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { queryMigrations };
