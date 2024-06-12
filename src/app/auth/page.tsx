'use client';

import styles from './auth.module.scss';
import { signInWithGoogle } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { useLogin } from './hooks';
import { useToast } from '@/components/toast';
import { CustomError } from '@/lib/error';

const Auth = () => {
	const router = useRouter();
	const addToast = useToast();
	const { login } = useLogin({
		onSuccess: () => {
			router.replace(URL_PATH.CATEGORY);
		},
		onError: (err) => console.log(err),
	});

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		try {
			const result = await signInWithGoogle();
			const { uid, displayName, email } = result.user;

			await login({ uid, email, userName: displayName });
		} catch (e) {
			let message = '로그인하는데 실패했습니다. 다시 시도해주세요';
			if (e instanceof CustomError) {
				message = e.message;
			}
			addToast({
				message,
			});
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
