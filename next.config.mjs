import fs from 'fs';
import path from 'path';

// Automatically copy assets from img-video/ to public/img-video/ at build/dev start time
const srcDir = path.join(process.cwd(), 'img-video');
const destDir = path.join(process.cwd(), 'public', 'img-video');

try {
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
    }
    console.log('Successfully copied assets to public/img-video/');
  }

  // Clean up serverless routing conflict and temp script
  const routeHandlerDir = path.join(process.cwd(), 'app', 'img-video');
  if (fs.existsSync(routeHandlerDir)) {
    fs.rmSync(routeHandlerDir, { recursive: true, force: true });
    console.log('Cleaned up routing conflict directory');
  }
  const tempCopyScript = path.join(process.cwd(), 'copy-assets.js');
  if (fs.existsSync(tempCopyScript)) {
    fs.unlinkSync(tempCopyScript);
    console.log('Cleaned up copy-assets.js');
  }
} catch (err) {
  console.error('Error during asset setup/cleanup:', err);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
