const NOEMBED_BASE_URL = 'http://noembed.com/embed?url=' as const;
const STREAMABLE_BASE_URL = 'https://streamable.com/' as const;

export const NOEMBED_STREAMABLE_URL = `${NOEMBED_BASE_URL}${STREAMABLE_BASE_URL}`;
