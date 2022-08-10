import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    fetch("/api/authenticate", {
      method: "GET",
      headers: {
        authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setAuth({ ...auth, user: response.ok });
      })
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
