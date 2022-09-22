import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    isAuthorized: false,
  });

  const setAuthorized = () => {
    setUser((prev) => ({isAuthorized: !prev.isAuthorized}));
  };

  const value = {
    // Change this to true statement to simulated authorized user
    // and make create/update recipe buttons visible and active.
    user,
    setAuthorized,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
