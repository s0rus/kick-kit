export const getElement = <TElement extends Element, TContainer extends Element>(
  container: TContainer,
  query: string
) => {
  return new Promise<TElement>((resolve) => {
    const searchedElement = container.querySelector<TElement>(query);
    if (searchedElement) {
      resolve(searchedElement);
    } else {
      const observer = new MutationObserver(() => {
        const searchedElement = container.querySelector<TElement>(query);
        if (searchedElement) {
          observer.disconnect();
          resolve(searchedElement);
        }
      });
      observer.observe(container, { childList: true, subtree: true });
    }
  });
};
