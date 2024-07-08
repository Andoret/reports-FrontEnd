import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [caseNum,setCaseNum]=useState(()=> localStorage.getItem('caseNum')|| '')
  const [role,setRole]=useState(()=> localStorage.getItem('role')|| '')
  const [tkn,setTkn]=useState(()=> localStorage.getItem('tkn')|| '')
  const [user,setUser]=useState(()=> localStorage.getItem('user')|| '')
  const [id,setId]=useState(()=> localStorage.getItem('id')|| '')
  const [clientId,setClientId]=useState(()=> localStorage.getItem('clientId')|| '')



  useEffect(() => {
    const tabCount = sessionStorage.getItem('tabCount');
    sessionStorage.setItem('tabCount', tabCount ? parseInt(tabCount) + 1 : 1);
    if (caseNum) {
      localStorage.setItem('caseNum', caseNum);
    }
    if (role) {
      localStorage.setItem('role', role);
    }
    if (tkn) {
      localStorage.setItem('tkn', tkn);
    }
    
    if (id){
      localStorage.setItem('id',id)
    }
    if (user){
      localStorage.setItem('user',user)
    }
    
    if (clientId){
      localStorage.setItem('clientId',clientId)
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
  }, [caseNum,role,tkn,user,clientId]);

  return (
    <UserContext.Provider value={{ caseNum, setCaseNum,role,setRole,tkn,setTkn,user,setUser,id,setId, clientId,setClientId}}>
      {children}
    </UserContext.Provider>
  );
};




export { UserContext, UserProvider };