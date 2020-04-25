import React, { useState, MouseEvent, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Answer, Game, User, Question } from "../../../api/interface";
import { sendAnswer } from "../../../api/questions";
import { voteForAnswer } from "../../../api/answer";
import ButtonWithLoader from "../../global/ButtonWithLoader";

interface NotAnsweredProps {
  user: User;
  currentQuestion: Question;
}

const NotAnswered: React.FC<NotAnsweredProps> = ({
  currentQuestion,
  user,
}) => {

  const [answer, setAnswer] = useState("");
  const [answerSavingStatus, setanswerSavingStatus] = useState(false);

  const submitAnswer = e => {
    console.log("Submit Answer");
    setanswerSavingStatus(true);
    sendAnswer(currentQuestion.id, answer);
  };
 
  return (<>
    <Row className="not-answered-question">
      <Col>
        <h3 className="mb-4">{currentQuestion.questionStr}</h3>
        {/* TODO: use FormControl.Input with ref */}
        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            as="textarea"
            onChange={e => console.log(e.target)}
          />
        </Form.Group> */}
        <textarea
          className="answer form-control"
          rows={4}
          onChange={e => setAnswer(e.target.value)}
        ></textarea>
        <ButtonWithLoader
          buttonVariant="primary"
          buttonText="Submit"
          onClick={submitAnswer}
          className="w-100 my-3"
          isLoading={answerSavingStatus}
        />
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
