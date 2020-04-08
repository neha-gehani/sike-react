import React, { useEffect, useState } from "react";
import { isAuthenticated, getToken } from "../../api/auth";
import Router from "next/router";
import { updateUserStore } from "../../states/user/actions";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/user";
import { Toast } from "react-bootstrap";

interface AuthenticatedRouteProps {
  className?: string;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  className,
}) => {
  const [hasFetchedUser, setHasFetchedUser] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);

  const dispatch = useDispatch();

  const setUser = (userData) => {
    dispatch(updateUserStore(userData));
  };

  const fetchUser = async () => {
    const userData = await getUser();
    console.log("---------");
    console.log(userData);
    if (!userData) {
      setIsAuthError(true);
      Router.push("/login");
      setIsAuthError(false);
    }
    setHasFetchedUser(false);
    setUser(userData);
  };

  useEffect(() => {
    if (hasFetchedUser) {
      const isLoggedIn = isAuthenticated();

      if (!isLoggedIn) {
        setIsAuthError(true);
        Router.push("/login");
        setIsAuthError(false);
      } else {
        fetchUser();
      }
    }
  }, [hasFetchedUser]);

  return (
    <>
      {isAuthError ? (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "100px"
          }}
        >
          <Toast
            style={{
              position: "absolute",
              top: 0,
              right: 0
            }}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Please login to continue</Toast.Body>
          </Toast>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AuthenticatedRoute;
