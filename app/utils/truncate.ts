export const truncate = (input: string, chars: number) =>
  (input?.length || 0) > chars ? `${input.substring(0, chars)}...` : input;
