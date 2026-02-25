// Placeholder for image upload service
// In production, this would upload to S3 or Cloudinary

export async function uploadImage(_file: File): Promise<string> {
  // TODO: Implement actual upload to S3/Cloudinary
  // For now, return a placeholder URL
  return `https://picsum.photos/seed/${Date.now()}/800/600`;
}

export function getImageUrl(key: string): string {
  return key;
}
