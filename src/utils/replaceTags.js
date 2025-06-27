export const replaceHTMLTags = (html) => {
  const result = html.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "");

  return result;
};
