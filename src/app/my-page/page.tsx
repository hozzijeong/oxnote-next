'use client';

import { MouseEventHandler } from 'react';
import { useLogout } from './hooks/useLogout';

const MyPage = () => {
	const { logout } = useLogout();

	const logoutHandler: MouseEventHandler<HTMLButtonElement> = () => logout();

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
