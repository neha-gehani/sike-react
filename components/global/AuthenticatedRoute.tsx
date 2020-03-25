import React from "react";
import { isAuthenticated } from "../../api/auth";
import Router from "next/router";

interface HeaderProps {
  className?: string;
}

const AuthenticatedRoute: React.FC<HeaderProps> = ({ className }) => {
  if (!isAuthenticated()) {
    Router.push("/login");
  }

  return null;
};

export default AuthenticatedRoute;
