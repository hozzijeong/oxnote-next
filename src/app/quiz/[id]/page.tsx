'use client';

import useToggle from '@/hooks/useToggle';
import styles from './quiz-detail.module.scss';
import { FavoriteButton, Header, Navbar, Pagination } from '@/components';
import { Fragment } from 'react';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useUpdateQuizProperty } from '../hooks';
import { useSessionStorage } from '@/hooks';
import { useGetQuiz, useModifyQuiz, useSubmitAnswer } from './hooks';

const QuizDetailPage = ({ params: { id } }: Params) => {
	const [quizIds] = useSessionStorage<string[]>('quiz-id', []);
	const { modifyHandler, deleteHandler } = useModifyQuiz(id);
	const { data: quiz } = useGetQuiz(id);

	const { isOn: explainOn, toggle: explainHandler } = useToggle();
	const { updateQuiz } = useUpdateQuizProperty(id);
	const { submitAnswerHandler } = useSubmitAnswer(id);

	const favoriteClickHandler = () => {
		updateQuiz({ favorite: !quiz.favorite });
	};

	return (
		<Fragment>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='문제 풀기' />
				<Header.Menu>
					<button type='button' onClick={modifyHandler}>
						수정하기
					</button>
					<button type='button' onClick={deleteHandler}>
						삭제하기
					</button>
				</Header.Menu>
			</Header>
			<Pagination currentPosition={id} positions={quizIds} path={`/quiz`} />
			<main className={styles.main}>
				<section className={styles['box']}>
					<div className={styles['quiz-container']}>
						<p className={styles['paragraph']}>{quiz.title}</p>
						<FavoriteButton
							isFavorite={Boolean(quiz.favorite)}
							onClick={favoriteClickHandler}
						/>
					</div>

					<div className={styles['answer-container']}>
						<button type='button' onClick={explainHandler}>{`해설 ${
							explainOn ? '닫기' : '보기'
						}`}</button>
						{explainOn && <p className={styles['paragraph']}>{quiz.explain}</p>}
					</div>

					<div className={styles['button-container']}>
						<button
							className={`${styles.button} ${styles['false-bg']}`}
							type='button'
							onClick={submitAnswerHandler(false)}
						>
							X
						</button>
						<button
							className={`${styles.button} ${styles['true-bg']}`}
							type='button'
							onClick={submitAnswerHandler(true)}
						>
							O
						</button>
					</div>
				</section>
			</main>
			<Navbar />
		</Fragment>
	);
};

export default QuizDetailPage;
