import React from 'react';
import { createRoot } from 'react-dom/client';
import { getSetting } from '../settings/settings-manager';
import VideoCard from './video-card';
import { CertainVideoInfo, extractVideoInfo } from './video-url-parser';

const injectVideoCard = (anchorTag: HTMLAnchorElement, videoInfo: CertainVideoInfo) => {
  const anchorTagParent = anchorTag.parentElement;
  anchorTagParent?.childNodes[1].remove();

  const anchorAttributes = [...anchorTag.attributes].reduce((acc, { name, value }) => {
    const propName = name === 'class' ? 'className' : name;
    return { ...acc, [propName]: value };
  }, {});

  if (anchorTagParent) {
    createRoot(anchorTagParent).render(
      <React.StrictMode>
        &nbsp;
        <a {...anchorAttributes} className='important-no-underline'>
          <VideoCard videoInfo={videoInfo} />
        </a>
      </React.StrictMode>
    );
  }
};

export const seekAnchorToVideoCards = (anchorTag: HTMLAnchorElement, potentialLinkUrl: string) => {
  if (!getSetting('seekVideos')) {
    return;
  }

  const videoInfo = extractVideoInfo(potentialLinkUrl);
  if (!videoInfo) {
    return;
  }

  injectVideoCard(anchorTag, videoInfo);
};
