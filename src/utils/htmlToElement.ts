export const htmlToElement = (html: string) => {
  let template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
};
