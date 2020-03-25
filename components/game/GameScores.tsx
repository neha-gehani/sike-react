import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game, Score } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";
import PlayerScore from "./PlayerScore";

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

  var winnerScore = Math.max.apply(
    Math,
    game.scores.map(o => o.score)
  );

  const userScore: Score = game.scores.find(score => score.user.id === userId);
  const otherUsersScores: Score[] = game.scores.filter(
    score => score.user.id !== userId
  );
  return (
    <>
      <h3 className="mb-4">You've been Sike-d!</h3>
      <PlayerScore
        score={userScore}
        isCurrentPlayerScore={true}
        isWinner={userScore.score === winnerScore}
      />
      {otherUsersScores.map((scoreDetails, index) => (
        <PlayerScore
          score={scoreDetails}
          key={index}
          isWinner={scoreDetails.score === winnerScore}
        />
      ))}
      <Button variant="secondary" onClick={onClickStart} className="w-100 my-3">
        Start a new game
      </Button>
    </>
  );
};

export default GameScores;
