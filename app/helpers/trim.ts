// A utility function that takes a sting and trim it to n characters
export const trim = (str: string, n: number): string => {
  if (str.length > n) {
    return str.substring(0, n) + "...";
  }
  return str;
};
