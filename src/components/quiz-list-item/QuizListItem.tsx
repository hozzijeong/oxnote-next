import { QuizListResponse } from '@/app/api/quiz/quiz.type';
import styles from './quiz-list-item.module.scss';
import Link from 'next/link';
import { URL_PATH } from '@/constants/path';
import { FavoriteButton } from '..';
import { generatePath } from '@/lib/utils';
import { useUpdateQuizProperty } from '@/app/quiz/hooks';
import { useDeferredValue } from 'react';
import { KeyedMutator } from 'swr';

type Props<D> = {
	item: QuizListResponse;
	mutateItem: KeyedMutator<D>;
};

const QuizListItem = <T extends {}>({ item, mutateItem }: Props<T>) => {
	const deferredValue = useDeferredValue(item);
	const { id, title, correctRate, favorite } = deferredValue;

	const { updateQuiz } = useUpdateQuizProperty(id);

	// NOTE: 즐겨찾기 업데이트시, 기존 데이터 refetch하도록 설정
	const favoriteClickHandler = () => {
		updateQuiz({ favorite: !favorite });
		mutateItem();
	};

	return (
		<li className={styles.item} key={id}>
			<Link
				className={styles['quiz-title']}
				href={`${generatePath(URL_PATH.QUIZ, { id })}`}
			>
				<p>{title}</p>
			</Link>
			<div className={styles['info-container']}>
				{correctRate > 0 && <span>{`${correctRate}%`}</span>}
				<FavoriteButton isFavorite={favorite} onClick={favoriteClickHandler} />
			</div>
		</li>
	);
};

export default QuizListItem;
