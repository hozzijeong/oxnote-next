import { http } from '@/lib/api';
import { QuizInfo } from '@/types';
import { useEffect, useState } from 'react';

let isFirst = true;

const useGetQuiz = (id: string) => {
	const [quiz, setQuiz] = useState<QuizInfo | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getQuiz = async () => {
			setLoading(true);
			const data = await http.get<QuizInfo>(`/api/quiz/${id}`);

			if (data.message === 'FAILURE') {
				throw new Error(data.errors.message);
			}

			if (isFirst) {
				setQuiz(data.data);
				setLoading(false);
				isFirst = false;
			}
		};

		getQuiz();
	}, [id]);

	if (loading) {
		throw new Promise(() => {});
	}

	return quiz;
};

export default useGetQuiz;
