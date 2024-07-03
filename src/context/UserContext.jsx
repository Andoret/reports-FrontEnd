import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [caseNum,setCaseNum]=useState(()=> localStorage.getItem('caseNum')|| '')
  useEffect(() => {
    const tabCount = sessionStorage.getItem('tabCount');
    sessionStorage.setItem('tabCount', tabCount ? parseInt(tabCount) + 1 : 1);

    if (caseNum) {
      localStorage.setItem('caseNum', caseNum);
    }


    
   
   

    const handleBeforeUnload = () => {
      const tabCount = sessionStorage.getItem('tabCount');
      if (tabCount) {
        const newCount = parseInt(tabCount) - 1;
        sessionStorage.setItem('tabCount', newCount);

        if (newCount === 0) {
          localStorage.removeItem('caseNum');
        
          
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [caseNum]);

  return (
    <UserContext.Provider value={{ caseNum, setCaseNum}}>
      {children}
    </UserContext.Provider>
  );
};




export { UserContext, UserProvider };