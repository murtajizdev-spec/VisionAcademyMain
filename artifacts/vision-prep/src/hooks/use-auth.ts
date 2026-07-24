import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("vp_token"));
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role || "admin"); // Default to admin for decoded tokens if role missing
      } catch (e) {
        console.error("Invalid token", e);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("vp_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("vp_token");
    setToken(null);
  };

  return { token, role, login, logout, isAuthenticated: !!token };
}
