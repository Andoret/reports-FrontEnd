import React, { createContext, useState, useEffect } from "react";
import { encryptStorage, decryptStorage } from "../utils/dataEncrypt";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [access_token, setAccess_Token] = useState(localStorage.getItem("access_token"));
  const [caseNum, setCaseNum] = useState(
    () => decryptStorage(localStorage.getItem("caseNum")) || ""
  );
  const [role, setRole] = useState(
    () => decryptStorage(localStorage.getItem("role")) || ""
  );
  const [user, setUser] = useState(
    () => decryptStorage(localStorage.getItem("user")) || ""
  );
  const [id, setId] = useState(
    () => decryptStorage(localStorage.getItem("id")) || ""
  );
  const [clientId, setClientId] = useState(
    () => decryptStorage(localStorage.getItem("clientId")) || ""
  );

  useEffect(() => {
    const tabCount = sessionStorage.getItem("tabCount");
    sessionStorage.setItem("tabCount", tabCount ? parseInt(tabCount) + 1 : 1);

    if (caseNum) {
      localStorage.setItem("caseNum", encryptStorage(caseNum));
    }
    if (role) {
      localStorage.setItem("role", encryptStorage(role));
    }

    if (id) {
      localStorage.setItem("id", encryptStorage(id));
    }
    if (user) {
      localStorage.setItem("user", encryptStorage(user));
    }
    if (clientId) {
      localStorage.setItem("clientId", encryptStorage(clientId));
    }
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }

    const handleBeforeUnload = () => {
      const tabCount = sessionStorage.getItem("tabCount");
      if (tabCount) {
        const newCount = parseInt(tabCount) - 1;
        sessionStorage.setItem("tabCount", newCount);

        if (newCount === 0) {
          localStorage.removeItem("caseNum");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          localStorage.removeItem("id");
          localStorage.removeItem("clientId");
          localStorage.removeItem("access_token");
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [caseNum, role, user, id, clientId, access_token]);

  return (
    <UserContext.Provider
      value={{
        caseNum,
        setCaseNum,
        role,
        setRole,
        user,
        setUser,
        id,
        setId,
        clientId,
        setClientId,
        access_token,
        setAccess_Token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
