import React, { useContext, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }
    useEffect(() => {
       const unsubscriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
    }, [])

    const value = {
        currentUser
    }

    return (
       <AuthContext.Provider value={value}>
        {children}
       </AuthContext.Provider>
    )
}