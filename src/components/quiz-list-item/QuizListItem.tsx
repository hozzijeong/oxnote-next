import { QuizListResponse } from '@/app/api/quiz/quiz.type';
import styles from './quiz-list-item.module.scss';
import Link from 'next/link';
import { URL_PATH } from '@/constants/path';
import { FavoriteButton } from '..';
import { generatePath } from '@/lib/utils';
import { useUpdateQuizProperty } from '@/app/quiz/hooks';

type Props = {
	item: QuizListResponse;
};

const QuizListItem = ({ item }: Props) => {
	const updateFavorite = useUpdateQuizProperty({ quizId: item.id });

	const favoriteClickHandler = async () => {
		await updateFavorite({ favorite: !item.favorite });
	};

	const { id, title, correctRate, favorite } = item;

	return (
		<li className={styles.item} key={id}>
			<Link
				className={styles['quiz-title']}
				href={`${generatePath(URL_PATH.QUIZ, { id: id })}`}
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
