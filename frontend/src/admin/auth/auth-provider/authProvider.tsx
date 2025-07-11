import React, { createContext, useState } from "react";

interface AuthContextType {
  token: string;
  setToken: (arg: string) => void;
  isSignedIn: () => boolean;
  username: string;
}

const AuthContext = createContext<AuthContextType>({
  username: "Placeholder",
  token: "",
  setToken: () => {},
  isSignedIn: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const someToken = "";
  const someName = "PlaceHolderX";
  //diatas untuk ambil token
  const [verifToken, setVeriftToken] = useState(someToken);
  const setToken = (token: string) => {
    setVeriftToken(token);
  };
  const isSignedIn = () => verifToken !== "";
  return (
    <AuthContext.Provider
      value={{
        token: verifToken,
        setToken: setToken,
        isSignedIn: isSignedIn,
        username: someName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
