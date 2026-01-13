export function makeAbsoluteImageUrl(imagePath) {
  if (!imagePath) return null;
  
  // Already absolute URL
  if (imagePath.includes('://')) return imagePath;
  
  // Build absolute URL from relative path
  const path = imagePath.replace(/^\/+/, ''); // Remove leading slashes
  return `http://localhost:3000/${path}`;
}
