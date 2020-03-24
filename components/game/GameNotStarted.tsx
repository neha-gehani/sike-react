import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game, User } from "../../api/interface";

interface GameProps {
  onClickStart: (event: MouseEvent<HTMLButtonElement>) => void;
  game: Game;
  user: User;
}

const GameNotStarted: React.FC<GameProps> = ({ onClickStart, game, user }) => {
  console.log("game not started", game);
  return (
    <>
      <h3 className="mb-4">Waiting for participants...</h3>
      {game.participants.map((participant, index) => (
        <p className="mb-3" key={index}>
          {participant.name}
        </p>
      ))}
      {user.id === game.user.id ? (
        <Button
          variant="secondary"
          onClick={onClickStart}
          className="w-100 my-3"
        >
          Start game
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default GameNotStarted;
