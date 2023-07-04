import { getSetting } from '../settings/settings-manager';
import {
  IMAGE_CONTENT_TYPE,
  MAX_IMAGE_SIZE,
  RESPONSE_HEADERS,
  VALID_HOSTS,
  VALID_IMAGE_EXTENSIONS,
  type ValidHost,
  type ValidImageExtension,
} from './image-constants';

export const isValidImageUrl = (potentialImageUrl: string) => {
  try {
    if (!getSetting('seekImages')) {
      throw new Error();
    }

    const { pathname, hostname, href } = new URL(potentialImageUrl);
    const imageExtension = pathname.substring(pathname.lastIndexOf('.'));

    const isValidHost = VALID_HOSTS.includes(hostname as ValidHost);
    const isValidExtension = VALID_IMAGE_EXTENSIONS.includes(imageExtension.toLowerCase() as ValidImageExtension);
    if (!isValidHost || !isValidExtension) {
      throw new Error();
    }

    const { type, size } = getImageMeta(href);
    const isImage = type && type.startsWith(IMAGE_CONTENT_TYPE);
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
      const type = xhr.getResponseHeader(RESPONSE_HEADERS.contentType);
      const size = xhr.getResponseHeader(RESPONSE_HEADERS.contentLength) as number | null;

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
