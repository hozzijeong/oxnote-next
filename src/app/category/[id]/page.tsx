'use client';

import { http } from '@/lib/api';
import { useEffect, useState } from 'react';
import QuizItem from '@/components/quiz-list-item/QuizListItem';
import { QuizListResponse } from '@/app/api/quiz/quiz.type';
import { setSessionStorage } from '@/lib/storage/session-storage';

// NOTE: 자체 라우터를 만들면 안되는 이유 (https://github.com/vercel/next.js/discussions/54840)

// TODO: 해당 페이지 자체를 컴포넌트화 가능하다고 생각. [id]에 해당하는 값만 어떻게 처리하면 좋을 듯
const CategoryQuizList = ({ params: { id } }: { params: { id: string } }) => {
	const [quizList, setQuizList] = useState<QuizListResponse[]>([]);

	useEffect(() => {
		const getQuizData = async () => {
			const data = await http.get<QuizListResponse[]>(
				`/api/quiz?category-id=${id}`
			);

			if (data.message === 'FAILURE') {
				throw new Error(data.errors.message);
			}

			setSessionStorage<string[]>(
				'quiz-id',
				data.data.map((quiz) => quiz.id)
			);

			setQuizList(data.data);
		};

		getQuizData();
	}, [id]);

	return (
		<div>
			{quizList.length &&
				quizList.map((quiz) => <QuizItem key={quiz.id} item={quiz} />)}
		</div>
	);
};

export default CategoryQuizList;
