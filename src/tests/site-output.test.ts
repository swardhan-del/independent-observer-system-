Unterminated regular expression literal. (141:65)
  139 |     const html = readOutput(file);
  140 |     const pageIds = ids(html);
> 141 |     const main = html.match(/<main\\b[^>]*>([\\s\\S]*?)<\\/main>/i)?.[1];
      |                                                                 ^
  142 |     if (!main) throw new Error(`${file} is missing its main landmark.`);
  143 |     const headings = [...main.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  144 |