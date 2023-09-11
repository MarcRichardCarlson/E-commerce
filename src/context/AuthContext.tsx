import { useContext, createContext, useEffect, useState, ReactNode } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/config';

//Defining the props
export interface AuthContextProps {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | null;
}

// Create a context for managing user authentication
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); //Can either be a user or not a user

  //Function to initiate Google sign-in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  //Effect to listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User authenticated', currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the authentication context to children
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useUserAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  //Error handling
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};