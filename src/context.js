import { createContext, useState } from "react";

// AuthContext: 인증 관련 상태 관리
export const AuthContext = createContext();

// HttpHeadersContext: HTTP 헤더 관리 (예: Authorization 헤더)
export const HttpHeadersContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("nick_name"));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const HttpHeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState({});

  return (
    <HttpHeadersContext.Provider value={{ headers, setHeaders }}>
      {children}
    </HttpHeadersContext.Provider>
  );
};
