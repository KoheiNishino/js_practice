import marked from "marked";

const md2html = (markdown, cliOptions) => {
  return marked(markdown, {
    gfm: cliOptions.gfm,
  });
};

export default md2html;
