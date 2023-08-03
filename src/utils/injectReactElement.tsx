import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

interface InjectReactElementBase {
  rootContainer: HTMLElement;
  reactCompontent: ReactNode;
}

interface InjectReactElementInsertProps extends InjectReactElementBase {
  mode: 'insert';
}

interface InjectReactElementWatchProps extends InjectReactElementBase {
  mode: 'watch';
  watchSettings: {
    getContainer: () => HTMLElement | null;
    getWatchedElement: () => HTMLElement | null;
    elementInsertFunction: (container: HTMLElement) => void;
  };
}

type InjectReactElementProps = InjectReactElementInsertProps | InjectReactElementWatchProps;

export const injectReactElement = (props: InjectReactElementProps) => {
  if (props.mode === 'insert') {
    createRoot(props.rootContainer).render(<React.StrictMode>{props.reactCompontent}</React.StrictMode>);
  } else {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const container = props.watchSettings.getContainer();
          const watchedElement = props.watchSettings.getWatchedElement();
          if (container && !watchedElement) {
            props.watchSettings.elementInsertFunction(container);
            createRoot(props.rootContainer).render(<React.StrictMode>{props.reactCompontent}</React.StrictMode>);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
};
