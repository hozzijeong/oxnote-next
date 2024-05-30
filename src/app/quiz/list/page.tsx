'use client';

import { useSEarchQueryParams } from '@/hooks';
import { useGetQuizList } from '../hooks/useGetQuizList';
import { QuizItem } from '@/components';

const QuizListPage = () => {
	const { getWholeURLParams } = useSEarchQueryParams();

	const { data: quizList, mutate } = useGetQuizList(getWholeURLParams());

	return (
		<div>
			{quizList.length &&
				quizList.map((quiz) => (
					<QuizItem key={quiz.id} item={quiz} mutateItem={mutate} />
				))}
		</div>
	);
};

export default QuizListPage;
