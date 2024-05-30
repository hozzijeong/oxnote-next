'use client';

import { Header, Navbar } from '@/components';
import { Fragment } from 'react';
import styles from './quiz-list.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='마이페이지' />
			</Header>
			<main className={styles.main}>{children}</main>
			<Navbar />
		</Fragment>
	);
};

export default Layout;
