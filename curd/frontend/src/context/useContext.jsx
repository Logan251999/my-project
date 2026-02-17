import { createContext, useEffect, useState } from "react";
import { fetchUsers } from "../services/userservices";

export const ContextContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function getData() {
    try {
      setIsLoading(true);
      const userData = await fetchUsers();
      setData(userData);
    } catch (error) {
      setError(error.message || "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContextContext.Provider value={{ data, setData, loading, error, getData }}>
      {children}
    </ContextContext.Provider>
  );
};
