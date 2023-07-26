import React from 'react';
import { createRoot } from 'react-dom/client';
import LinkCard from './link-card';

export const seekAnchorToTitledLinks = (anchorTag: HTMLAnchorElement, potentialLinkUrl: string) => {
  const anchorTagParent = anchorTag.parentElement;
  anchorTagParent?.childNodes[1].remove();
  const attributes = anchorTag.attributes;

  console.log(potentialLinkUrl);

  const props = {};
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes[i];
    // Check if the attribute name is not "class" since "className" should be used in JSX
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
