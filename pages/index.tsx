import React, { useState } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Container, Row, Col, Button } from "react-bootstrap";
import { guestLogin } from "../api/auth";
import { createGame } from "../api/game";
import { User } from "../api/interface";
import UserDetails from "../components/landing/UserDetails";

const Home: NextPage<AppProps> = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [user, setUser] = useState<User>({ id: -1, token: "", role: "" });

  const newGame = async () => {
    console.log("Start a new game");
    if (name) {
      const gameDetails = await createGame();
      setGameCode(gameDetails.identifier);
    } else {
      console.log(name);
      console.log("we can't do shit");
      // TODO: show error
      // this.setState({ errorMessage: "You have not entered a name" });
    }
  };

  const joinGame = async () => {};

  const doGuestLogin = async () => {
    if (name && name.length >= 3) {
      const user = await guestLogin(name);
      setUser(user);
    }
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              {user && user.id !== -1 ? (
                <div className="text-light w-100 text-center">
                  <h2>Hello, {name}!</h2>
                  <div className="submit w-100 mb-3">
                    <Button
                      variant="primary"
                      onClick={() => joinGame()}
                      className="w-100"
                    >
                      Join Game
                    </Button>
                  </div>
                  <div className="submit w-100 mb-3">
                    <Button
                      variant="primary"
                      onClick={() => newGame()}
                      className="w-100 mb-4"
                    >
                      Start New Game
                    </Button>
                    {gameCode ? (
                      <p className="text-center">
                        Ask your friends to join:{" "}
                        <span className="text-primary text-bold">
                          {" "}
                          {gameCode}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <UserDetails onClick={doGuestLogin} onNameUpdated={setName} />
              )}

              {/* <div className="code w-100 mb-3">
                <input
                  className="form-control"
                  type="text"
                  maxLength="6"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="Enter a 6 digit code..."
                />
              </div> */}

              {/*gameCode ? (
                <p className="text-center">
                  Ask your friends to join: {gameCode}
                </p>
              ) : (
                ""
              )*/}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
