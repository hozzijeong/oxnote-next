'use client';

import { Header, Navbar } from '@/components';
import { Fragment } from 'react';
import styles from './filter.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='문제 풀기' />
			</Header>
			<main className={styles.main}>{children}</main>
			<Navbar />
		</Fragment>
	);
};

export default Layout;
