export const VALID_HOSTS = [
  'i.imgur.com',
  'imgur.com',
  'cdn.discordapp.com',
  'media.discordapp.net',
  'media.tenor.com',
] as const;
export type ValidHost = (typeof VALID_HOSTS)[number];

export const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bpm'] as const;
export type ValidImageExtension = (typeof VALID_IMAGE_EXTENSIONS)[number];

export const MAX_IMAGE_SIZE = 5_000_000;

export const RESPONSE_HEADERS = {
  contentType: 'Content-Type',
  contentLength: 'Content-Length',
} as const;

export const IMAGE_CONTENT_TYPE = 'image/' as const;
