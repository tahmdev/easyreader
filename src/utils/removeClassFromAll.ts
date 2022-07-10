export const removeClassFromAll = (className: string) => {
  const elements = document.getElementsByClassName(className);
  for (let el of elements) {
    el.classList.remove(className);
  }
};
