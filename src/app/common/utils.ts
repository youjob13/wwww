export const calcScrollPercentage = (element: Element, document: Document) => {
  const scrollPercentage =
    (element.scrollTop + document.body.scrollTop) /
    (element.scrollHeight - element.clientHeight);

  return scrollPercentage;
};
