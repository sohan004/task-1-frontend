import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(true)
    const auth = getAuth(app)

    const [noti, setNoti] = useState([])
    const [notiLoad, setNotiLoad] = useState(1)

    useEffect(() => {
        if (!user) {
            return setNoti([])
        }
        fetch(`http://localhost:5000/notification/${user.email}`)
            .then(res => res.json())
            .then(data => setNoti(data))
    }, [user, notiLoad])

    // console.log(noti);


    const signUp = (email, pass) => {
        setLoad(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const signIn = (email, pass) => {
        setLoad(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const out = (email, pass) => {
        setLoad(true)
        return signOut(auth)
    }

    const updt = (u, n) => {
        setLoad(true)
        return updateProfile(u, {
            displayName: n
        })
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoad(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const info = {
        user,
        load,
        signIn,
        signUp,
        updt,
        out,
        noti,
        notiLoad,
        setNotiLoad
    }


    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;