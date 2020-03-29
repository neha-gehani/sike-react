import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { User } from "../../api/interface";
import { getUser } from "../../api/user";
import { joinGame } from "../../api/game";
import { guestLogin } from "../../api/auth";
import { LayoutPageProps } from "../_app";

import { Container, Row, Col, Button } from "react-bootstrap";
import TextForm from "../../components/global/TextForm";

import { InitialState } from "../../store";
import { updateUserStore } from "../../states/user/actions";

interface StateProps {
 user: User;
}

const JoinDynamicGame: NextPage<LayoutPageProps> = () => {

  const { user } = useSelector<InitialState, StateProps>(
   (state: InitialState) => {
     return {
       user: state.user
     };
   }
 );

  const dispatch = useDispatch();

  const setUser = userData => {
    dispatch(updateUserStore(userData));
  };

  const fetchUser = async () => {
   const userData = await getUser();
   if(!!userData) {
    setUser(userData);
    setIsAuth(true);
   }
 };

 const router = useRouter();
 const { gameId } = router.query;
  useEffect(() => {
   fetchUser();
 }, [gameId]);

  const join = async () => {
    if (code && code.length >= 3) {
      setIsJoining(true);
      const game = await joinGame(code);
      setIsJoining(false);
      Router.push(`/game/${game.identifier}`);
    }
  };

  const doGuestLogin = async () => {
   if (name && name.length >= 3) {
     setIsLoading(true);
     try{
      const user = await guestLogin(name);
      setIsLoading(false);
      setIsAuth(true);
      setUser(user);
     } catch(err) {
      console.log('No Session')
     }
     

   }
 };

 const [isAuth, setIsAuth] = useState(false);

  const [code, setCode] = useState(gameId);
  const [isJoining, setIsJoining] = useState(false);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            {!isAuth && (
             <>
              <TextForm
                 onClick={doGuestLogin}
                 onTextUpdated={setName}
                 headerText="Welcome :)"
                 buttonText="Let's get started!"
                 placeholder="Tell us your name"
                 isLoading={isLoading}
              />
             </>
            )}
            {isAuth && (
             <TextForm
              onClick={join}
              onTextUpdated={setCode}
              headerText="Join game"
              buttonText="Join now"
              placeholder="Enter the game code"
              isLoading={isJoining}
              initialValue={gameId}
            />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JoinDynamicGame;
