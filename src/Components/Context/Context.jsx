import React, { createContext, useState } from "react";
export const CreateContext = createContext(0); // Context creation

export default function ContextProvider({ children }) {
  const [CountCartt, setCountCartt] = useState(0); // تعريف CountCartt

  return (
    <CreateContext.Provider value={{ CountCartt, setCountCartt }}>
      {children}
    </CreateContext.Provider>
  );
}
