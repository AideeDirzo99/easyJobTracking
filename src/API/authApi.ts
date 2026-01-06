import type { UserCredential } from 'firebase/auth';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/boot/FirebaseInit';

/**
 * Creates a new user using email and password authentication.
 *
 * @param email - User email address.
 * @param password - User password.
 * @returns A Firebase UserCredential object containing the authenticated user.
 *
 * @throws Error with code `SIGN_UP_FAILED` if the sign-up process fails.
 */
export const signUpUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('SIGN_UP_FAILED:' + errorMessage);
  }
};

/**
 * Signs out the currently authenticated user.
 *
 * @returns A promise that resolves when the user has been successfully signed out.
 *
 * @throws Error with code `LOG_OUT_FAILED` if the logout process fails.
 */
export const logOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('LOG_OUT_FAILED:' + errorMessage);
  }
};

/**
 * Signs in a user using email and password authentication.
 *
 * @param email - User email address.
 * @param password - User password.
 * @returns A Firebase UserCredential object containing the authenticated user.
 *
 * @throws Error with code `LOG_IN_FAILED` if the login process fails.
 */
export const logInUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('LOG_IN_FAILED:' + errorMessage);
  }
};
