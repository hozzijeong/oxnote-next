import { Header, Navbar } from '@/components';
import { Fragment } from 'react';
import styles from './quiz-register.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header title='퀴즈 등록하기' backUrl={-1} />
			<main className={styles.main}>{children}</main>
		</Fragment>
	);
};

export default Layout;
