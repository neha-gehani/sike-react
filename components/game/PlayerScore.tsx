import React from "react";
import classnames from "classnames";
import { Score } from "../../api/interface";

interface LoaderProps {
  score: Score;
  isCurrentPlayerScore?: boolean;
  isWinner?: boolean;
  className?: string;
}

const PlayerScore: React.FC<LoaderProps> = ({
  score,
  isCurrentPlayerScore,
  isWinner,
  className
}) => {
  return (
    <div
      className={classnames(
        ["player-score d-flex justify-content-between align-items-center mb-3"],
        className
      )}
    >
      <span>
        {isCurrentPlayerScore ? `Your score` : score.user.name} - {score.score}
      </span>
      {isWinner && <span className="badge badge-success">WINNER!!</span>}
    </div>
  );
};

export default PlayerScore;
