import React, { useState } from "react";
import { createContext } from "react";

export const ClassContext = createContext();
export const ClassProvider = ({ children }) => {
  const [dataClass, setDataClass] = useState({});
  const [detail, setDetail] = useState(false);
  return <ClassContext.Provider value={{ dataClass, setDataClass, detail, setDetail }}>{children}</ClassContext.Provider>;
};
