export const tryToCatch = async <T, E = Error>(
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<[T | undefined, E | undefined]> => {
  if (typeof fn !== "function") throw new Error(`${fn} should be a function!`);

  try {
    return [await fn(...args), undefined];
  } catch (e: any) {
    return [undefined, e as E];
  }
};
