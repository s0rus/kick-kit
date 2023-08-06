export const appendChildAsync = <TElement extends Element>(parent: Element, child: TElement) => {
  return new Promise<TElement>((resolve) => {
    setTimeout(() => {
      parent.appendChild(child);
      resolve(child);
    }, 0);
  });
};
