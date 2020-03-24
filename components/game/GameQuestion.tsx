import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game, User, Question } from "../../api/interface";
import { sendAnswer } from "../../api/questions";

interface GameProps {
  game: Game;
  user: User;
  onQuestionAnswered: () => void;
}

const GameQuestion: React.FC<GameProps> = ({ game, user, onQuestionAnswered }) => {
  const [answer, setAnswer] = useState("");
  const currentQuestion: Question = game.questions.find(question => question.status === "answering" || question.status === "voting" );

  console.log({currentQuestion});

  const updateAnswer = (answer) =>{
    setAnswer(answer);
  }
  
  const submitAnswer = (e) => {
    console.log('Submit Answer')
    sendAnswer(currentQuestion.id, answer)
    onQuestionAnswered()
  }

  return (
    <>
      <h3 className="mb-4">{currentQuestion.questionStr}</h3>
      <textarea 
        className="answer"
        onChange={e => updateAnswer(e.target.value)}
      ></textarea>
      <Button
        variant="secondary"
        onClick={submitAnswer}
        className="w-100 my-3"
      >
        Submit
      </Button>
    </>
  );
};

export default GameQuestion;
