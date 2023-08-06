interface WaitForElementProps {
  mode: 'id' | 'class';
  name: string;
  tries?: number;
}

export const waitForElement = <TElement = Element>({ mode, name, tries = 10 }: WaitForElementProps) => {
  let currentTry = 0;
  return new Promise<TElement | null>((resolve, reject) => {
    const interval = setInterval(() => {
      const element = mode === 'id' ? document.getElementById(name) : document.querySelector(`.${name}`);
      currentTry++;
      if (element) {
        clearInterval(interval);
        resolve(element as TElement);
      }

      if (currentTry >= tries) {
        clearInterval(interval);
        reject();
      }
    }, 100);
  });
};
