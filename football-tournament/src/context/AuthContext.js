import { createContext } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
    setAuthenticated: (value) => { }
})

export default AuthContext