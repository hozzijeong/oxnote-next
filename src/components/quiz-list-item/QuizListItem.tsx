import { QuizListResponse } from '@/app/api/quiz/quiz.type';
import styles from './quiz-list-item.module.scss';
import Link from 'next/link';
import { URL_PATH } from '@/constants/path';
import { FavoriteButton } from '..';
import { generatePath } from '@/lib/utils';

interface QuizItemProps {
	item: QuizListResponse;
}

const QuizItem = ({ item }: QuizItemProps) => {
	const favoriteClickHandler = () => console.log('데이터 업데이트');
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

export default QuizItem;
