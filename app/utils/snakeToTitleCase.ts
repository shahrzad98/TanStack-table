export const snakeToTitleCase = (snakeCaseString: string) =>
  snakeCaseString.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : " " + d.toUpperCase(),
  );
