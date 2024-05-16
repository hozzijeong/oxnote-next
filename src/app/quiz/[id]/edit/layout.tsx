'use client';

import styles from '../quiz-detail.module.scss';
import { Header } from '@/components';

// NOTE: [id]의 layout과 edit의 layout이 중첩된다. 따라서 Template로 변경했지만, 그것조차 중첩됐다... template는 중첩 안되는것 같던데 왜 된느 건지 모르겠다

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='문제 수정하기' />
			</Header>
			<main className={styles.main}>{children}</main>
		</>
	);
};

export default Layout;
