import React, { createContext, useState } from "react";

export const SearchContext = createContext(null);
export const SearchProvider = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  return (
    <SearchContext.Provider value={{ inputSearch, setInputSearch, search, setSearch, loadingAdd, setLoadingAdd, loadingUpdate, setLoadingUpdate, loadingDelete, setLoadingDelete, loadingDetail, setLoadingDetail }}>
      {props.children}
    </SearchContext.Provider>
  );
};
