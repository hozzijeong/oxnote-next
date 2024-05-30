'use client';

import useToggle from '@/hooks/useToggle';
import styles from './quiz-detail.module.scss';
import { FavoriteButton } from '@/components';
import { useDeferredValue } from 'react';
import { useUpdateQuizProperty } from '../hooks';
import { useGetQuiz, useSubmitAnswer } from './hooks';

const QuizDetailPage = ({ params: { id } }: { params: { id: string } }) => {
	const { data: quiz } = useGetQuiz(id);
	const deferredQuiz = useDeferredValue(quiz);

	const { isOn: explainOn, toggle: explainHandler } = useToggle();
	const { updateQuiz } = useUpdateQuizProperty(id);
	const { submitAnswerHandler } = useSubmitAnswer(id);

	const favoriteClickHandler = () => {
		updateQuiz({ favorite: !deferredQuiz.favorite });
	};

	return (
		<section className={styles['box']}>
			<div className={styles['quiz-container']}>
				<p className={styles['paragraph']}>{deferredQuiz.title}</p>
				<FavoriteButton
					isFavorite={Boolean(deferredQuiz.favorite)}
					onClick={favoriteClickHandler}
				/>
			</div>

			<div className={styles['answer-container']}>
				<button type='button' onClick={explainHandler}>{`해설 ${
					explainOn ? '닫기' : '보기'
				}`}</button>
				{explainOn && (
					<p className={styles['paragraph']}>{deferredQuiz.explain}</p>
				)}
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
	);
};

export default QuizDetailPage;
