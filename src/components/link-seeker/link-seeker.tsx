import React from 'react';
import { createRoot } from 'react-dom/client';
import LinkCard from './link-card';

export const seekAnchorToTitledLinks = (anchorTag: HTMLAnchorElement, _potentialLinkUrl: string) => {
  const anchorTagParent = anchorTag.parentElement;
  anchorTagParent?.childNodes[1].remove();
  const attributes = anchorTag.attributes;

  // ! TODO: Refactor this garbage code:
  const props = {};
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes[i];
    const propName = name === 'class' ? 'className' : name;
    // @ts-ignore
    props[propName] = value;
  }

  if (anchorTagParent) {
    createRoot(anchorTagParent).render(
      <React.StrictMode>
        <LinkCard>
          {
            <span>
              &nbsp;
              <a {...props}>{anchorTag.textContent}</a>
              &nbsp;
            </span>
          }
        </LinkCard>
      </React.StrictMode>
    );
  }
};
