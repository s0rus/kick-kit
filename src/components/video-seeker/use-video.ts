import { useEffect, useState } from 'react';
import { NOEMBED_PROVIDER, VideoMeta, VideoMetaError } from './video-constants';
import { VideoInfo } from './video-url-parser';

const fetchVideoMeta = (videoInfo: NonNullable<VideoInfo>) => {
  return new Promise<VideoMeta | VideoMetaError | null>((resolve, reject) => {
    const url = `${NOEMBED_PROVIDER[videoInfo.provider].url}${videoInfo.videoId}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.send(null);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        reject(new Error('Failed to fetch video embed'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred'));
    };
  });
};

export const useVideo = (videoInfo: NonNullable<VideoInfo>) => {
  const [data, setData] = useState<VideoMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<VideoMetaError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchVideoMeta(videoInfo);
        if (response && 'error' in response && 'url' in response) {
          // ! Noembed returns 200 instead of 404 status code when the link is wrong,
          // ! so we have to check and throw for it manually.
          throw {
            error: response.error,
            url: response.url,
          };
        }
        setData(response);
      } catch (err) {
        const error = err as VideoMetaError;
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoInfo]);

  return { data, isLoading, error };
};
