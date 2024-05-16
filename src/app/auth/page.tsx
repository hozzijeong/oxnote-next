'use client';

import styles from './auth.module.scss';
import { signInWithGoogle } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { useLogin } from './hooks';

const Auth = () => {
	const router = useRouter();
	const { login } = useLogin({
		onSuccess: () => router.push(URL_PATH.QUIZ_FORM),
	});

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		try {
			const result = await signInWithGoogle();
			const { uid, displayName, email } = result.user;

			login({ uid, email, userName: displayName });
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className={styles['login-container']}>
			<section className={styles['login-content']}>
				<h1 className={styles['title']}>오답노트</h1>
				<div className={styles['login-button-container']}>
					<button
						className={styles['sign-in-button']}
						onClick={googleLoginHandler}
						type='button'
					>
						구글로 시작하기/로그인하기
					</button>
				</div>
			</section>
		</main>
	);
};

export default Auth;
