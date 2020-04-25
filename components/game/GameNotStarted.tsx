import React, { MouseEvent } from "react";
import { Alert } from "react-bootstrap";
import { Game } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";
import ButtonWithLoader from "../global/ButtonWithLoader";

interface GameProps {
  onClickStart: (event: MouseEvent<HTMLButtonElement>) => void;
  isStarting?: boolean;
}

interface StateProps {
  game: Game;
  userId: number;
}

const GameNotStarted: React.FC<GameProps> = ({ onClickStart, isStarting }) => {

  function getWaitingText(game: Game): string {
    return game.user.id === userId ? 'You need at least 3 players to start the game' : 'Once we have 3, the host can hit start the game';
  }

  const { game, userId } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game,
        userId: state.user && state.user.id
      };
    }
  );

  return (
    <>
      <h3 className="mb-4">Waiting for participants...</h3>
      {game.participants.map((participant, index) => (
        <p className="mb-3" key={index}>
          {participant.name}
        </p>
      ))}
      {userId === game.user.id && game.participants.length >= 3 ? (
        <ButtonWithLoader
          buttonVariant="primary"
          buttonText="Start game"
          onClick={onClickStart}
          className="w-100 my-3"
          isLoading={isStarting}
        />
      ) : (
      <Alert variant={"secondary"}>
        {getWaitingText(game)}
      </Alert>)}
    </>
  );
};

export default GameNotStarted;
