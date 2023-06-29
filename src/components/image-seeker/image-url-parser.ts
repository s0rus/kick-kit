export const VALID_HOSTS = [
  'i.imgur.com',
  'imgur.com',
  'cdn.discordapp.com',
  'media.discordapp.net',
  'media.tenor.com',
] as const;
export const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bpm'] as const;
export const MAX_IMAGE_SIZE = 5_000_000;

export type ValidHost = (typeof VALID_HOSTS)[number];
export type ValidImageExtension = (typeof VALID_IMAGE_EXTENSIONS)[number];

export const isValidImageUrl = (potentialImageUrl: string) => {
  try {
    const imageUrl = new URL(potentialImageUrl);
    const imagePathname = imageUrl.pathname;
    const imageExtension = imagePathname.substring(imagePathname.lastIndexOf('.'));

    const isValidHost = VALID_HOSTS.includes(imageUrl.hostname as ValidHost);
    const isValidExtension = VALID_IMAGE_EXTENSIONS.includes(imageExtension.toLowerCase() as ValidImageExtension);

    if (!isValidHost || !isValidExtension) {
      throw new Error();
    }

    const { size, type } = getImageMeta(imageUrl.href);
    const isImage = type?.startsWith('image/') ?? false;
    const isValidSize = size && size < MAX_IMAGE_SIZE;
    if (!isImage || !isValidSize) {
      throw new Error();
    }

    return true;
  } catch {
    return false;
  }
};

export const getImageMeta = (imageUrl: string): { type: string | null; size: number | null } => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', imageUrl, false);
    xhr.send(null);

    if (xhr.status === 200) {
      const type = xhr.getResponseHeader('Content-Type');
      const size = xhr.getResponseHeader('Content-Length') as number | null;

      return {
        type,
        size,
      };
    }

    throw new Error();
  } catch (error) {
    return {
      type: null,
      size: null,
    };
  }
};
