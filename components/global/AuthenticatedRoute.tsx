import React, {useEffect, useState} from "react";
import { isAuthenticated, getToken } from "../../api/auth";
import Router from "next/router";
import { updateUserStore } from "../../states/user/actions";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/user";

interface AuthenticatedRouteProps {
  className?: string;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ className }) => {
  
  const dispatch = useDispatch();

  const setUser = userData => {
    dispatch(updateUserStore(userData));
  };

  const fetchUser = async () => {
    const userData = await getUser();
    if(!userData){
      Router.push('/login');
    }
    setHasFetchedUser(false);
    setUser(userData);
  };

  const [hasFetchedUser, setHasFetchedUser] = useState(true);

  useEffect(() => {
    if(hasFetchedUser) {
      const isLoggedIn = isAuthenticated();

      if(!isLoggedIn) {
        Router.push('/login');
      } else {
        console.log('Fetched user')
        fetchUser();
      }
    }
    
  }, [hasFetchedUser]);

  return (<></>);
};

export default AuthenticatedRoute;
