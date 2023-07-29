import { useEffect, useState } from 'react';
import { NOEMBED_PROVIDER, VideoMeta } from './video-constants';
import { CertainVideoInfo } from './video-url-parser';

const fetchVideoMeta = (videoInfo: CertainVideoInfo) => {
  return new Promise<VideoMeta | null>((resolve, reject) => {
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

export const useVideo = (videoInfo: CertainVideoInfo) => {
  const [data, setData] = useState<VideoMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchVideoMeta(videoInfo);
        setData(response);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoInfo]);

  return { data, isLoading, error };
};
