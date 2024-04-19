'use client';

import styles from './auth.module.scss';
import { signInWithGoogle } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { http } from '@/lib/api';

type BodyParams = {
	uid: string;
	email: string | null;
	userName: string | null;
};

const Auth = () => {
	const router = useRouter();

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		try {
			const result = await signInWithGoogle();
			const { uid, displayName, email } = result.user;

			await http.post<void, BodyParams>('/api/auth', {
				uid,
				email,
				userName: displayName,
			});

			router.push(URL_PATH.QUIZ_FORM);
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
