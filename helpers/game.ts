export const isGameStarted = (status: string): boolean => {
  //Considering `active` and `complete` as started games
  return status !== "created";
};
