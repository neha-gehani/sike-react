import React, { useState, MouseEvent, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Answer, Game, User, Question } from "../../../api/interface";
import { sendAnswer } from "../../../api/questions";
import { voteForAnswer } from "../../../api/answer";

interface NotAnsweredProps {
  user: User;
  currentQuestion: Question;
  // onQuestionAnswered: () => void;
}

const NotAnswered: React.FC<NotAnsweredProps> = ({
  currentQuestion,
  user,
  // onQuestionAnswered
}) => {

  const [answer, setAnswer] = useState("");
  const submitAnswer = e => {
    console.log("Submit Answer");
    sendAnswer(currentQuestion.id, answer);
    // onQuestionAnswered();
  };
 
  return (<>
    <Row className="not-answered-question">
      <Col>
        <h3 className="mb-4">{currentQuestion.questionStr}</h3>
        <textarea
          className="answer"
          onChange={e => setAnswer(e.target.value)}
        ></textarea>
        <Button
          variant="primary"
          onClick={submitAnswer}
          className="w-100 my-3"
        >
          Submit
        </Button>
      </Col>
    </Row>
    <Row className="not-answered-users-completed">
      <Col>
        <h3 className="mb-4">Already done:</h3>
        <div className="users-answered">
          {currentQuestion.answers.map((answer: Answer, index) => (
            <p className="mb-3" key={index}>
              {answer.user.name}
            </p>
          ))}
        </div>
      </Col>
    </Row>
  </>);
};

export default NotAnswered;
