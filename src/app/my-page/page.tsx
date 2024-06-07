'use client';

import { MouseEventHandler } from 'react';
import { useLogout } from './hooks/useLogout';
import { useDeleteAccount } from './hooks';
import { Button, useConfirm } from '@/components';

const MyPage = () => {
	const { logout } = useLogout();
	const { deleteAccount } = useDeleteAccount();
	const confirm = useConfirm();

	const logoutHandler: MouseEventHandler<HTMLButtonElement> = () => logout();
	const deleteAccountHandler: MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const result = await confirm({
			message:
				'계정을 삭제하시면 작성한 데이터가 모두 없어집니다. 삭제하시겠습니까?',
		});

		if (result) {
			deleteAccount();
		}
	};

	return (
		<section>
			<div>
				<Button onClick={logoutHandler} type='button'>
					로그아웃
				</Button>
				<Button onClick={deleteAccountHandler} type='button' disabled>
					회월 탈퇴
				</Button>
			</div>
		</section>
	);
};

export default MyPage;
