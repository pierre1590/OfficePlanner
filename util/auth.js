import axios from 'axios';
import {API_KEY} from '@env';


const authenticate = async(mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
 
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
 
  return token;
}

export const createUser = async({email, password}) => {
  await authenticate('signUp', email, password);
}

export const login = async({email, password}) => {
  await authenticate('signInWithPassword', email, password);
}

