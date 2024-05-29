'use client';

import { useSEarchQueryParams } from '@/hooks';
import { useGetQuizList } from '../hooks/useGetQuizList';

const QuizListPage = () => {
	const { getWholeURLParams } = useSEarchQueryParams();

	const { data } = useGetQuizList(getWholeURLParams());

	console.log(data, 'data??');

	return <div>리스트입니다</div>;
};

export default QuizListPage;
