const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, '../public/logo.svg');
const outputDir = path.join(__dirname, '../public/assets');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate high-quality PNG
const generatePng = async () => {
  try {
    // Generate high-res PNG (1024x1024)
    await sharp(inputSvg)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'logo-1024x1024.png'));

    // Generate standard icon sizes
    const sizes = [192, 512];
    for (const size of sizes) {
      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
    }

    console.log('PNG assets generated successfully in the public/assets directory');
  } catch (error) {
    console.error('Error generating PNG assets:', error);
  }
};

generatePng();
