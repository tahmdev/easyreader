export const getTopElement = (elementList: Element[]) => {
  elementList.sort(
    (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
  );
  return elementList[0];
};
