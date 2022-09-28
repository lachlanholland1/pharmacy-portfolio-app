import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    fetch("/api/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) =>
        setAuth({
          ...auth,
          user: true,
          user_id: data.user_id,
          username: data.username,
        })
      )
      .catch((err) => setAuth({ ...auth, user: false }))
      .finally(() => setLoading(false));
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
