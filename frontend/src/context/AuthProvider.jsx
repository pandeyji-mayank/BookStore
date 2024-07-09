import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();
function AuthProvider({ children }) {
    const initialAuthUser = localStorage.getItem('User');
    const [authUser, setAuthUser] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser) : undefined
    );
    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext);
