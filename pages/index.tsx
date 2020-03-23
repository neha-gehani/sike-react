import React, { useState } from "react";
import { NextPage } from "next";
import AppLayout from "../components/global/AppLayout";
import { AppProps, Container } from "next/app";
import { Row, Col, Button } from "react-bootstrap";

const Home: NextPage<AppProps> = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState(0);
  const [navigateTo, setNavigateTo] = useState("");
  const [test, setTest] = useState({});

  const newGame = async () => {
    console.log("Start a new game");
    // if (name) {
    //   // const gameCode = await GameUtils.startNewGame(name, 3);
    //   const gameDetails = await createGame();
    //   setGameCode(gameDetails.identifier);
    // } else {
    //   console.log(name);
    //   console.log("we can't do shit");
    //   // TODO: show error
    //   // this.setState({ errorMessage: "You have not entered a name" });
    // }
  };

  const joinGame = async () => {
    // // let code = code;
    // const currentPlayer = name;
    // // this checks if the code exists
    // // if it has maximum of 6 characters
    // // if it is only digits and 6 digits
    // if (code && code.length === 6 && code.match(/\d{6}/)) {
    //   try {
    //     // join the game
    //     const gameData = await GameUtils.joinGame(code, currentPlayer);
    //     // this.setState({ errorMessage: "Joined Successfully" })
    //     //todo: redux selectors
    //     // this.props.dispatch({ type: "ADD_GAME_DATA", payload: gameData });
    //     // navigate to another page
    //     setNavigateTo("/lobby");
    //   } catch (err) {
    //     // TODO: show error
    //     console.log(err);
    //     // this.setState({ errorMessage: "Something went wrong while joining the game" })
    //   }
    // } else {
    //   // TODO: Show error
    //   // this.setState({ errorMessage: "You have entered an incorrect code" })
    // }
  };

  const login = async () => {
    // if (name && name.length >= 3) {
    //   await guestLogin(name);
    // }
  };

  const doGuestLogin = () => {
    // const user = login();
    // dispatch({ type: "ADD_USER_DATA", payload: { user: user } });
    // setTest(user);
    // // console.log("------------------");
    // // console.log(user);
  };

  return (
    <div className="bg-dark h-100">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              {name ? (
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
                <>
                  <h2 className="my-4 text-light">Welcome :)</h2>
                  <div className="name w-100 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      maxLength={15}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your display name..."
                    />
                  </div>
                  <div className="submit w-100 mb-3">
                    <Button
                      variant="primary"
                      onClick={() => doGuestLogin()}
                      className="w-100"
                    >
                      Let's go!
                    </Button>
                  </div>
                </>
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
