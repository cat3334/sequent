import { createContext, useReducer } from "react";

const UserContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      return {
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
      };
    }
    case "logout": {
      return { user: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, { user: null });
  const value = { userState, userDispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
