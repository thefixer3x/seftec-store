import ghpages from 'gh-pages';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for GitHub Pages deployment
const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/thefixer3x/seftec-store.git',
  dotfiles: true, // Include .nojekyll file to allow files starting with underscore
  message: 'Deploy to GitHub Pages [ci skip]',
  silent: false, // Log detailed debug information
  add: false, // Replace all contents in the branch
};

// Path to the build directory
const distPath = path.join(__dirname, 'dist');

// Deploy the site
console.log('Deploying to GitHub Pages...');
ghpages.clean(); // Clean cache
ghpages.publish(distPath, options, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
    console.log('Website available at: https://thefixer3x.github.io/seftec-store/');
  }
});