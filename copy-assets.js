const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'img-video');
const destDir = path.join(__dirname, 'public', 'img-video');

console.log('Source:', srcDir);
console.log('Destination:', destDir);

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file}`);
  }
  console.log('All files copied successfully!');
} catch (err) {
  console.error('Error copying files:', err);
}
