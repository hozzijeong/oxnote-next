'use client';

import { useToast } from '@/components/toast';
import { getAuth, signOut } from 'firebase/auth';
import { MouseEventHandler } from 'react';

const MyPage = () => {
	const addToast = useToast();

	const logoutHandler: MouseEventHandler<HTMLButtonElement> = async () => {
		const auth = getAuth();
		try {
			await signOut(auth);
		} catch (error) {
			addToast({ message: '로그아웃에 실패했습니다' });
		}
	};
	return (
		<section>
			<div>
				<button onClick={logoutHandler} type='button'>
					로그아웃
				</button>
				<button>회월 탈퇴</button>
			</div>
		</section>
	);
};

export default MyPage;
