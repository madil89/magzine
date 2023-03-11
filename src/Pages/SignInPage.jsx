/* eslint-disable no-unused-vars */
import React from 'react';
import {
  getAuth, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import {
  Box,
  Button,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function SignInPage() {
  const handleGoogleLogIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        variant="outlined"
        sx={{ width: 150, marginLeft: '10px' }}
        onClick={() => handleGoogleLogIn()}
      >
        <GoogleIcon />
      </Button>
    </Box>
  );
}

export default SignInPage;
