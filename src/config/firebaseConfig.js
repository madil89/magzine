// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBocdq2WT8RA4kavqnQ0KimtTOlUCtCMI',
  authDomain: 'nuqtay-d8fc6.firebaseapp.com',
  projectId: 'nuqtay-d8fc6',
  storageBucket: 'nuqtay-d8fc6.appspot.com',
  messagingSenderId: '472949087302',
  appId: '1:472949087302:web:2161a778f20e62ca78be47',
  measurementId: 'G-CEYN0BY077',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// eslint-disable-next-line no-restricted-globals
self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lf4Lr8lAAAAAFRP1ERgboJ32VJrWstLNyHOp3gg'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
export default app;
