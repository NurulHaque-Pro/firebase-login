import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProviders = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (user, email) => {
        return createUserWithEmailAndPassword(auth, user, email)
    }

    const loggedInUser = (user, email) => {
        return signInWithEmailAndPassword(auth, user, email)
    }

    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleAuthProvider)
    }
    const passwordReset = (email) =>{
        console.log(email);
        return sendPasswordResetEmail(auth, email)
    }

    // Observe auth state change
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Logged In Successful', currentUser);
            setUser(currentUser);
            setLoading(false)
        });

        return () =>{
            unsubscribe()
        }

    },[])

    const logout = () =>{
        return signOut(auth);
    }

    const userInfo = {
        user,
        createUser,
        loggedInUser,
        signInWithGoogle,
        logout,
        passwordReset,
        loading
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;