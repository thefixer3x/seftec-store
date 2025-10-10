#!/usr/bin/env node

/**
 * Simple script to find potential hardcoded text in React components
 * This helps identify components that need translation updates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findHardcodedText(dir) {
    const results = [];

    function scanDirectory(currentDir) {
        const files = fs.readdirSync(currentDir);

        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                scanDirectory(filePath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const content = fs.readFileSync(filePath, 'utf8');

                // Look for potential hardcoded strings (simple heuristic)
                const hardcodedStrings = content.match(/"[A-Z][^"]*[a-z][^"]*"/g) || [];
                const hardcodedStrings2 = content.match(/'[A-Z][^']*[a-z][^']*'/g) || [];

                const allStrings = [...hardcodedStrings, ...hardcodedStrings2];

                if (allStrings.length > 0) {
                    // Filter out obvious non-translatable strings
                    const filtered = allStrings.filter(str => {
                        const clean = str.slice(1, -1); // Remove quotes
                        return !clean.match(/^(className|src|href|id|data-|aria-|style|type|role|key|ref)/) &&
                            !clean.match(/^[A-Z_]+$/) && // Constants
                            !clean.match(/^\d/) && // Numbers
                            !clean.match(/^#/) && // Colors/IDs
                            !clean.match(/^\//) && // Paths
                            !clean.match(/^https?:\/\//) && // URLs
                            clean.length > 3 &&
                            clean.includes(' '); // Only multi-word strings
                    });

                    if (filtered.length > 0) {
                        results.push({
                            file: filePath.replace(path.dirname(__dirname), ''),
                            strings: filtered
                        });
                    }
                }
            }
        }
    }

    scanDirectory(dir);
    return results;
}

// Scan src directory
const results = findHardcodedText(path.join(path.dirname(__dirname), 'src'));

console.log('🔍 Potential hardcoded text found in components:\n');

results.forEach(result => {
    console.log(`📁 ${result.file}`);
    result.strings.forEach(str => {
        console.log(`   ${str}`);
    });
    console.log('');
});

console.log(`\n📊 Found ${results.length} files with potential hardcoded text`);