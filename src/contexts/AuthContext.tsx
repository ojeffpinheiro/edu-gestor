import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  GithubAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  signOut, 
  User as FirebaseUser 
} from "firebase/auth";

type User = {
  id: string;
  username: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logout: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        updateUser(firebaseUser);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  function updateUser(firebaseUser: FirebaseUser) {
    const { displayName, photoURL, uid } = firebaseUser;

    if (!displayName || !photoURL) {
      console.warn("Missing information from provider account.");
      return;
    }

    setUser({
      id: uid,
      username: displayName,
      avatar: photoURL,
    });
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) updateUser(res.user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }

  async function signInWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) updateUser(res.user);
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
    }
  }

  async function signInWithGithub() {
    try {
      const provider = new GithubAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) updateUser(res.user);
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  }

  async function signInWithApple() {
    try {
      const provider = new OAuthProvider("apple.com");
      const res = await signInWithPopup(auth, provider);
      if (res.user) updateUser(res.user);
    } catch (error) {
      console.error("Error during Apple sign-in:", error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setUser(undefined);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithApple, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
