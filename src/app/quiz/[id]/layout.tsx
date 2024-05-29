'use client';

import styles from './quiz-detail.module.scss';
import { Header, Navbar, Pagination } from '@/components';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { usePathname } from 'next/navigation';
import { useSessionStorage } from '@/hooks';
import { useModifyQuiz } from './hooks';

// NOTE: [id]의 layout과 edit의 layout이 중첩된다. 따라서 Template로 변경했지만, 그것조차 중첩됐다... template는 중첩 안되는것 같던데 왜 된느 건지 모르겠다

const Layout = ({
	children,
	params: { id },
}: {
	children: React.ReactNode;
	params: Params;
}) => {
	const pathname = usePathname();
	const isEdit = pathname.includes('edit');

	const [quizIds] = useSessionStorage<string[]>('quiz-id', []);
	const { modifyHandler, deleteHandler } = useModifyQuiz(id);

	return (
		<>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title={isEdit ? '문제 수정하기' : '문제 풀기'} />
				{!isEdit && (
					<Header.Menu>
						<button type='button' onClick={modifyHandler}>
							수정하기
						</button>
						<button type='button' onClick={deleteHandler}>
							삭제하기
						</button>
					</Header.Menu>
				)}
			</Header>
			{!isEdit && (
				<Pagination currentPosition={id} positions={quizIds} path={`/quiz`} />
			)}
			<main className={styles.main}>{children}</main>
			{!isEdit && <Navbar />}
		</>
	);
};

export default Layout;
