import { NOEMBED_PROVIDER, NoembedProvider } from './video-constants';

export const extractVideoInfo = (potentialVideoUrl: string) => {
  let match: RegExpExecArray | null = null;

  for (const [providerName, provider] of Object.entries(NOEMBED_PROVIDER)) {
    const providerRegex = provider.regex;
    match = providerRegex.exec(potentialVideoUrl);
    if (match && match[3]) {
      return {
        videoId: match[3],
        provider: providerName as NoembedProvider,
      };
    }
  }

  return null;
};

export type VideoInfo = ReturnType<typeof extractVideoInfo>;
export type CertainVideoInfo = NonNullable<VideoInfo>;
