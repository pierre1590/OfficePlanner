import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  addEvent: (event) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  const authenticate = async (token) => {
    setAuthToken(token);
    try{
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch(err){
      console.log(err);
    }
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;