import React, { createContext, useState, useEffect } from 'react';
import { encryptStorage, decryptStorage } from '../utils/dataEncrypt';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [caseNum, setCaseNum] = useState(() => decryptStorage(localStorage.getItem('caseNum')) || '');
  const [role, setRole] = useState(() => decryptStorage(localStorage.getItem('role')) || '');
  const [tkn, setTkn] = useState(() => decryptStorage(localStorage.getItem('tkn')) || '');
  const [user, setUser] = useState(() => decryptStorage(localStorage.getItem('user')) || '');
  const [id, setId] = useState(() => decryptStorage(localStorage.getItem('id')) || '');
  const [clientId, setClientId] = useState(() => decryptStorage(localStorage.getItem('clientId')) || '');

  useEffect(() => {
    const tabCount = sessionStorage.getItem('tabCount');
    sessionStorage.setItem('tabCount', tabCount ? parseInt(tabCount) + 1 : 1);
    
    if (caseNum) {
      localStorage.setItem('caseNum', encryptStorage(caseNum));
    }
    if (role) {
      localStorage.setItem('role', encryptStorage(role));
    }
    if (tkn) {
      localStorage.setItem('tkn', encryptStorage(tkn));
    }
    if (id) {
      localStorage.setItem('id', encryptStorage(id));
    }
    if (user) {
      localStorage.setItem('user', encryptStorage(user));
    }
    if (clientId) {
      localStorage.setItem('clientId', encryptStorage(clientId));
    }

    const handleBeforeUnload = () => {
      const tabCount = sessionStorage.getItem('tabCount');
      if (tabCount) {
        const newCount = parseInt(tabCount) - 1;
        sessionStorage.setItem('tabCount', newCount);

        if (newCount === 0) {
          localStorage.removeItem('caseNum');
          localStorage.removeItem('role');
          localStorage.removeItem('tkn');
          localStorage.removeItem('user');
          localStorage.removeItem('id');
          localStorage.removeItem('clientId');
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [caseNum, role, tkn, user, id, clientId]);

  return (
    <UserContext.Provider value={{ caseNum, setCaseNum, role, setRole, tkn, setTkn, user, setUser, id, setId, clientId, setClientId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
