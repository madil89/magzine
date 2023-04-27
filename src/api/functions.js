import { getApp } from 'firebase/app';
import {
  getFunctions,
  // connectFunctionsEmulator,
  httpsCallable,
} from 'firebase/functions';

const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, 'localhost', 5001);
const getUsers = httpsCallable(functions, 'getUsers');
const addCustomClaims = httpsCallable(functions, 'addCustomClaims');

const getFirebaseUsers = () => getUsers();
const setUserCustomClaims = ({ uid, customClaims }) => addCustomClaims({
  uid,
  customClaims,
});

export default {
  getFirebaseUsers,
  setUserCustomClaims,
};
