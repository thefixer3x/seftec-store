#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const DEPLOYMENT_CONFIGS = {
  github: {
    name: 'GitHub Pages',
    script: 'node deploy.js',
    url: 'https://thefixer3x.github.io/seftec-store/',
    domain: 'GitHub Pages subdomain'
  },
  vercel: {
    name: 'Vercel',
    script: 'vercel --prod --yes',
    url: 'Will be provided after deployment',
    domain: 'seftechub.com'
  },
  netlify: {
    name: 'Netlify',
    script: 'netlify deploy --prod --dir=dist --site=seftec-store',
    url: 'Will be provided after deployment', 
    domain: 'seftec.store'
  }
};

function showHelp() {
  console.log(`
🚀 SefTec Store Multi-Platform Deployment Tool

Usage: bun run deploy-multi [platform] [options]

Platforms:
  github    Deploy to GitHub Pages (thefixer3x.github.io/seftec-store)
  vercel    Deploy to Vercel (for seftechub.com)
  netlify   Deploy to Netlify (for seftec.store)
  all       Deploy to all platforms

Options:
  --help, -h    Show this help message
  --dry-run     Show what would be deployed without actually deploying

Examples:
  bun run deploy-multi vercel
  bun run deploy-multi netlify
  bun run deploy-multi all
  bun run deploy-multi github --dry-run
`);
}

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

function deployToPlatform(platform, dryRun = false) {
  const config = DEPLOYMENT_CONFIGS[platform];
  if (!config) {
    console.error(`❌ Unknown platform: ${platform}`);
    return false;
  }

  console.log(`\n📦 Deploying to ${config.name}`);
  console.log(`   Target domain: ${config.domain}`);
  
  if (dryRun) {
    console.log(`   Command: ${config.script}`);
    console.log(`   URL: ${config.url}`);
    return true;
  }

  // Build first
  if (!runCommand('bun run build', 'Building application')) {
    return false;
  }

  // Deploy to platform
  if (!runCommand(config.script, `Deploying to ${config.name}`)) {
    return false;
  }

  console.log(`\n🎉 Successfully deployed to ${config.name}!`);
  console.log(`🌐 URL: ${config.url}`);
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const platform = args[0];
  const isDryRun = args.includes('--dry-run');
  const isHelp = args.includes('--help') || args.includes('-h');

  if (isHelp || !platform) {
    showHelp();
    return;
  }

  if (platform === 'all') {
    console.log('🚀 Deploying to all platforms...\n');
    
    const platforms = ['github', 'vercel', 'netlify'];
    const results = {};
    
    for (const p of platforms) {
      results[p] = deployToPlatform(p, isDryRun);
    }
    
    console.log('\n📊 Deployment Summary:');
    for (const [p, success] of Object.entries(results)) {
      const status = success ? '✅' : '❌';
      const config = DEPLOYMENT_CONFIGS[p];
      console.log(`   ${status} ${config.name} (${config.domain})`);
    }
    return;
  }

  if (!DEPLOYMENT_CONFIGS[platform]) {
    console.error(`❌ Unknown platform: ${platform}`);
    console.log('Available platforms: github, vercel, netlify, all');
    return;
  }

  deployToPlatform(platform, isDryRun);
}

main();