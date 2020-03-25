import React, { useState, MouseEvent, useEffect } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { Answer, Game, User, Question } from "../../../api/interface";
import { sendAnswer } from "../../../api/questions";
import { voteForAnswer } from "../../../api/answer";

interface AnsweredWaitingProps {
  user: User;
  currentQuestion: Question;
  // onQuestionAnswered: () => void;
}

const AnsweredWaiting: React.FC<AnsweredWaitingProps> = ({
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
    
    <Badge
      className="not-answered-badge"
      variant='primary'>Lets wait for everyone else to finish</Badge>
  </>);
};

export default AnsweredWaiting;
