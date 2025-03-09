import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
    const [userInfo, setUserInfo] = useState(AuthService.getUserInfo());

    const login = (tokens) => {
        AuthService.setTokens(tokens);
        setIsAuthenticated(true);
        setUserInfo(AuthService.getUserInfo());
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 