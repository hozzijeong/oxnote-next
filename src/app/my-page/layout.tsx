'use client';

import { Header } from '@/components';
import { Fragment } from 'react';
import styles from './my-page.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='마이페이지' />
			</Header>
			<main className={styles.main}>{children}</main>
		</Fragment>
	);
};

export default Layout;
