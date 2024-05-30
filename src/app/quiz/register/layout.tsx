'use client';

import { Header } from '@/components';
import { Fragment } from 'react';
import styles from './quiz-register.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='퀴즈 등록하기' />
			</Header>
			<main className={styles.main}>{children}</main>
		</Fragment>
	);
};

export default Layout;
