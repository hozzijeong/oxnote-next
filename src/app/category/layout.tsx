import { Header, Navbar } from '@/components';
import { Fragment } from 'react';
import styles from './category.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='카테고리' />
			</Header>
			<main className={styles.main}>{children}</main>
			<Navbar />
		</Fragment>
	);
};

export default Layout;
