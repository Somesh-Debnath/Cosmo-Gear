import { useState, useEffect } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function useAuth() {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState('')

    useEffect(() => {
        setLoading(true)

        const unsub = onAuthStateChanged(auth, (currUser) => {
            if (currUser) {
                setUser(currUser)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })
    }, [user])

    return { user, loading }
}