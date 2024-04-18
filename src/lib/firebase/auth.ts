import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged as _onAuthStateChanged,
	type UserCredential,
} from 'firebase/auth';
import { auth } from '.';

export const onAuthStateChanged = (cb: () => void) => {
	return _onAuthStateChanged(auth, cb);
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(auth, provider);

		return result;
	} catch (error) {
		throw new Error('로그인시 문제가 발생했습니다.');
	}
};

export const signOut = async () => {
	try {
		return auth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
};