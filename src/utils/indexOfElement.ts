export const indexOfElement = (parent: Element, find: Element) => {
  const nodeList = parent.getElementsByTagName("*");
  if (nodeList) {
    const index = Array.prototype.indexOf.call(nodeList, find);
    return index;
  }
  return 0;
};
