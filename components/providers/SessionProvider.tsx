import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Models } from 'react-native-appwrite'
import { getCurrentUser } from "../../lib/users"


export interface TSessionContext {
    isLoading: boolean,
    isLoggedIn: boolean,
    user: Models.Document | null,
    setUser: Dispatch<SetStateAction<Models.Document | null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
}

export const SessionContext = createContext<TSessionContext | undefined>(undefined)

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<Models.Document | null>(null);

    useEffect(() => {
        setIsLoading(true)
        getCurrentUser().then((response) => {
            if (response) {
                setUser(response)
                setIsLoggedIn(true)
            } else {
                setUser(null)
                setIsLoggedIn(false)
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])
    return (
        <SessionContext.Provider value={{ isLoading, isLoggedIn, user, setUser, setIsLoading, setIsLoggedIn }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider