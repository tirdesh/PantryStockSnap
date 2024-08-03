"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

interface AuthContextType {
  currentUser: User | null;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setCookie("currentUser", JSON.stringify(user), { path: "/" });
      } else {
        deleteCookie("currentUser", { path: "/" });
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setCurrentUser(null);
    deleteCookie("currentUser", { path: "/" });
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ currentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
