import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.sessionStorage.getItem("gg_admin_auth") === "true";
    });
    const [checking, setChecking] = useState(true);
    const verifySession = useCallback(async () => {
        try {
            await api.get("/auth/me");
            setIsAuthenticated(true);
            if (typeof window !== "undefined") {
                window.sessionStorage.setItem("gg_admin_auth", "true");
            }
        } catch (err) {
            setIsAuthenticated(false);
            if (typeof window !== "undefined") {
                window.sessionStorage.removeItem("gg_admin_auth");
            }
        } finally {
            setChecking(false);
        }
    }, []);
    useEffect(() => {
        verifySession();
    }, [verifySession]);
    function login() {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem("gg_admin_auth", "true");
        }
    }
    async function logout() {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            // continue locally even if request fails
        }
        setIsAuthenticated(false);
        if (typeof window !== "undefined") {
            window.sessionStorage.removeItem("gg_admin_auth");
        }
    }
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, checking, login, logout, verifySession }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
