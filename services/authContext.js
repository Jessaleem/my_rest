/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromLocalCookie } from './auth';

let userState;

const User = createContext({ user: null, loading: false });

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  useEffect(() => {
    if(!userState && user) {
      useState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  })

  useEffect(()=>{
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolverUser = async () => {
      const user = await getUserFromLocalCookie();
      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolverUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}