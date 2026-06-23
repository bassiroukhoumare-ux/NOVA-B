// Helpers to handle mixed media (images & videos) for article covers.
// A cover_image field may now contain either an image URL or a video URL.

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.ogv', '.mov', '.m4v', '.avi', '.mkv'];

/**
 * Returns true when the given URL points to a video file.
 * Detects by Cloudinary's `/video/upload/` path or by common video extensions.
 * Safe for null/undefined and for existing image URLs (returns false).
 */
export const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('/video/upload/')) return true;
  const clean = url.split('?')[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
};
