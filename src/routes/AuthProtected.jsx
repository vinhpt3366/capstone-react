import React from "react";
import { Navigate } from "react-router-dom";

class AuthProtected extends React.Component {
  render() {
    const { children } = this.props;

    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  }
}

export default AuthProtected;
