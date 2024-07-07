import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { getCurrentUser } from "../../lib/users"
import { User } from '@/lib/types'


export interface TSessionContext {
    isLoading: boolean,
    isLoggedIn: boolean,
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
}

export const SessionContext = createContext<TSessionContext | undefined>(undefined)

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

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