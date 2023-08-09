import React, { createContext, useState } from "react";

export const registerContext = createContext();
export const deleteContext = createContext();
export const updateContext = createContext();

const ContextShare = ({ children }) => {
  //register data state
  const [registerData, setRegisterData] = useState();

  //delete data state
  const [deleteData, setDeleteData] = useState();

  //update data state
  const [updateData, setUpdateData] = useState();
  return (
    <>
      <registerContext.Provider value={{ registerData, setRegisterData }}>
        <updateContext.Provider value={{ updateData, setUpdateData }}>
          <deleteContext.Provider value={{ deleteData, setDeleteData }}>
            {children}
          </deleteContext.Provider>
        </updateContext.Provider>
      </registerContext.Provider>
    </>
  );
};

export default ContextShare;
