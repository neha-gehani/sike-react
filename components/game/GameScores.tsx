import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game, Score } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";

interface GameProps {
  onClickStart: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface StateProps {
  game: Game;
  userId: number;
}

const GameScores: React.FC<GameProps> = ({ onClickStart }) => {
  const { game, userId } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game,
        userId: state.user && state.user.id
      };
    }
  );

  const userScore: Score = game.scores.find(score => score.user.id === userId);
  const otherUsersScores: Score[] = game.scores.filter(
    score => score.user.id !== userId
  );
  return (
    <>
      <h3 className="mb-4">You've been Sike-d!</h3>
      <p className="mb-3">Your score - {userScore.score}</p>
      {otherUsersScores.map((scoreDetails, index) => (
        <p className="mb-3" key={index}>
          {scoreDetails.user.name} - {scoreDetails.score}
        </p>
      ))}
      {userId === game.user.id ? (
        <Button
          variant="secondary"
          onClick={onClickStart}
          className="w-100 my-3"
        >
          Start a new game
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default GameScores;
