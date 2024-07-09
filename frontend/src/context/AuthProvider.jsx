import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();
function AuthProvider({ children }) {
    const initialAuthUser = localStorage.getItem('Users');
    const [authUser, setAuthUser] = useState(
        initialAuthUser ? initialAuthUser : undefined
    );
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
export const useAuth = () => {
    return useContext(AuthContext);
}