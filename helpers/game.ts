export const isGameStarted = (status: string): boolean => {
  //Considering `active` and `complete` as started games
  if (status === "created") {
    return false;
  }

  return true;
};
