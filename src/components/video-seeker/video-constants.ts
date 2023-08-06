const NOEMBED_BASE_URL = 'https://noembed.com/embed?url=' as const;
const STREAMABLE_BASE_URL = 'https://streamable.com/' as const;
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=' as const;
const YOUTUBE_SHORT_BASE_URL = 'https://youtu.be/' as const;

export const NOEMBED_STREAMABLE_URL = `${NOEMBED_BASE_URL}${STREAMABLE_BASE_URL}` as const;
export const NOEMBED_YOUTUBE_URL = `${NOEMBED_BASE_URL}${YOUTUBE_BASE_URL}` as const;
export const NOEMBED_YOUTUBE_SHORT_URL = `${NOEMBED_BASE_URL}${YOUTUBE_SHORT_BASE_URL}` as const;

export const NOEMBED_PROVIDER = {
  streamable: {
    url: NOEMBED_STREAMABLE_URL,
    regex: /^(https?:\/\/)?(www\.)?streamable\.com\/([\w-]+)$/i,
  },
  youtube: {
    url: NOEMBED_YOUTUBE_URL,
    regex: /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([\w-]+)(&t=\d+s)?$/i,
  },
  youtube_short: {
    url: NOEMBED_YOUTUBE_SHORT_URL,
    regex: /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(\?t=\d+s)?$/i,
  },
} as const;

export type NoembedProvider = keyof typeof NOEMBED_PROVIDER;

export type VideoMeta = {
  width: number;
  provider_name: string;
  type: string;
  provider_url: string;
  height: number;
  html: string;
  thumbnail_url: string;
  title: string;
  version: string;
  url: string;
};

export type VideoMetaError = {
  error: string;
  url: string;
};
