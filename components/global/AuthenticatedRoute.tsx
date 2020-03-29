import React, {useEffect} from "react";
import { isAuthenticated, getToken } from "../../api/auth";
import Router from "next/router";
import { updateUserStore } from "../../states/user/actions";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/user";

interface AuthenticatedRouteProps {
  className?: string;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ className }) => {
  
  let hasFetchedUser = false;
  const dispatch = useDispatch();

  const setUser = userData => {
    dispatch(updateUserStore(userData));
  };

  const fetchUser = async () => {
    const userData = await getUser();
    if(!userData){
      Router.push('/login');
    }
    hasFetchedUser = true;
    setUser(userData);
  };

  useEffect(() => {
    if(!hasFetchedUser) {
      console.log('getting user data');
      fetchUser();
    }
  }, [hasFetchedUser]);
  
  const isLoggedIn = isAuthenticated();
  console.log({isLoggedIn})
  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/login");
    } else {
      const token = getToken();    
      console.log('FETCH USER', token);
    }
  }, [isLoggedIn]);

  return (<></>);
};

export default AuthenticatedRoute;
