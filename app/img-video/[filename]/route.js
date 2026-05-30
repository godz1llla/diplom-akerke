import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const filename = params.filename;
  // Prevent directory traversal
  const safeFilename = path.basename(filename);
  const filePath = path.join(process.cwd(), 'img-video', safeFilename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    // Set appropriate content type
    let contentType = 'application/octet-stream';
    if (safeFilename.endsWith('.jpeg') || safeFilename.endsWith('.jpg')) {
      contentType = 'image/jpeg';
    } else if (safeFilename.endsWith('.png')) {
      contentType = 'image/png';
    } else if (safeFilename.endsWith('.mp4')) {
      contentType = 'video/mp4';
    }

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new Response('File not found', { status: 404 });
  }
}
