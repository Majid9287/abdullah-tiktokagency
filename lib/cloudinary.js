
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
// Support both individual variables and single URL format
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;

// Upload function for images
export async function uploadToCloudinary(file, folder = 'uploads') {
  try {
    // Handle different input types
    let uploadOptions = {
      folder,
      resource_type: 'auto',
    };

    let result;

    if (Buffer.isBuffer(file)) {
      // Handle buffer uploads (from API routes)
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Create a readable stream from buffer
        const { Readable } = require('stream');
        const bufferStream = Readable.from(file);
        bufferStream.pipe(uploadStream);
      });
    } else {
      // Handle file path or URL uploads
      result = await cloudinary.uploader.upload(file, uploadOptions);
    }

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

// Delete function for images
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

// Get optimized URL
export function getOptimizedImageUrl(publicId, options = {}) {
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    format,
    crop: 'fill',
  });
}

