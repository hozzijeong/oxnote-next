'use client';

import { Header, Navbar, Pagination } from '@/components';
import { Fragment } from 'react';
import styles from './quiz-detail.module.scss';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getSessionStorage } from '@/lib/storage/session-storage';
import { BASE_URL } from '@/constants/path';

const quizIds = getSessionStorage<string[]>('quiz-id', []);

const Layout = ({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: Params;
}) => {
	return (
		<Fragment>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='문제 풀기' />
				<Header.Menu>
					<button type='button'>수정하기</button>
					<button type='button'>삭제하기</button>
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
