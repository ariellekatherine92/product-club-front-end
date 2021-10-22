import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

const SignOut = () => {
  const [setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {

    async function signOutUser() {
    try {
        await logout();
        history.push("/login");
      } catch {
        setError("Failed to log out");
      }
    }
    signOutUser()

  },[])
  return (
    <div>
      
    </div>
  );
};

export default SignOut;