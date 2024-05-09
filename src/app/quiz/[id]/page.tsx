'use client';

import useToggle from '@/hooks/useToggle';
import styles from './quiz-detail.module.scss';
import { FavoriteButton } from '@/components';
import { MouseEventHandler, useEffect, useState } from 'react';
import { QuizInfo } from '@/types/quiz';
import { http } from '@/lib/api';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useUpdateQuizProperty } from '../hooks';

const QuizDetail = ({ params: { id } }: Params) => {
	const { isOn: explainOn, toggle: explainHandler } = useToggle();
	const updateQuiz = useUpdateQuizProperty({ quizId: id });

	const [quiz, setQuiz] = useState<QuizInfo | null>(null);

	useEffect(() => {
		const getQuiz = async () => {
			const data = await http.get<QuizInfo>(`/api/quiz/${id}`);

			if (data.message === 'FAILURE') {
				throw new Error(data.errors.message);
			}

			setQuiz(data.data);
		};

		getQuiz();
	}, [id]);

	const submitAnswerHandler =
		(answer: boolean): MouseEventHandler<HTMLButtonElement> =>
		async (event) => {
			event.preventDefault();

			const result = await http.post<{ result: boolean }, { answer: boolean }>(
				`/api/quiz/${id}`,
				{
					answer,
				}
			);
		};

	const favoriteClickHandler = () => {
		updateQuiz({ favorite: !quiz?.favorite });
	};

	return (
		<section className={styles['box']}>
			<div className={styles['quiz-container']}>
				<p className={styles['paragraph']}>{quiz?.title}</p>
				<FavoriteButton
					isFavorite={Boolean(quiz?.favorite)}
					onClick={favoriteClickHandler}
				/>
			</div>

			<div className={styles['answer-container']}>
				<button type='button' onClick={explainHandler}>{`해설 ${
					explainOn ? '닫기' : '보기'
				}`}</button>
				{explainOn && <p className={styles['paragraph']}>{quiz?.explain}</p>}
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

export default QuizDetail;
