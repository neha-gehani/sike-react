import { Score } from "../api/interface";

export const isGameStarted = (status: string): boolean => {
  //Considering `active` and `complete` as started games
  return status !== "created";
};

export const getCurrentUserScore = (scores: Score[], userId: number): Score =>
  scores.find(score => score.user.id === userId);
