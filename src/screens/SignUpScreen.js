import React, { useRef } from 'react';
import './SignUpScreen.css';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../firebase';

const SignUpScreen = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email' ref={emailRef} />
        <input type='password' placeholder='Password' ref={passwordRef} />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className='signUpScreen__gray'>New to Netflix? </span>
          <span className='signUpScreen_link' onClick={register}>
            Sign Up Now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUpScreen;
