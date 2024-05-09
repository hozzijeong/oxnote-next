'use client';

import { Header, Navbar, Pagination } from '@/components';
import { Fragment } from 'react';
import styles from './quiz-detail.module.scss';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { BASE_URL, URL_PATH } from '@/constants/path';
import { http } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useSessionStorage } from '@/hooks';
import { generatePath } from '@/lib/utils';

const Layout = ({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: Params;
}) => {
	const router = useRouter();

	const [quizIds, updateQuizIds] = useSessionStorage<string[]>('quiz-id', []);

	const deleteHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const { message, data } = await http.delete<{ quizId: string }>(
			`/api/quiz/${id}`
		);

		if (message === 'FAILURE') return;

		const { quizId } = data;
		updateQuizIds(quizIds.filter((id) => id !== quizId));
		const quizIndex = quizIds.findIndex((id) => id === quizId);

		if (quizIndex === -1) {
			router.replace(URL_PATH.HOME);
		}

		if (quizIds.length === 1) {
			router.back();
		}

		router.replace(
			generatePath(URL_PATH.QUIZ, {
				id: quizIds[quizIndex === 0 ? 0 : quizIndex - 1],
			})
		);
	};

	return (
		<Fragment>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='문제 풀기' />
				<Header.Menu>
					<button type='button'>수정하기</button>
					<button type='button' onClick={deleteHandler}>
						삭제하기
					</button>
				</Header.Menu>
			</Header>
			<Pagination
				currentPosition={id}
				positions={quizIds}
				path={`${BASE_URL}/quiz`}
			/>
			<main className={styles.main}>{children}</main>
			<Navbar />
		</Fragment>
	);
};

export default Layout;
