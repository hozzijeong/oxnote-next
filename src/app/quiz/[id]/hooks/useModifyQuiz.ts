import { URL_PATH } from '@/constants/path';
import { useSessionStorage } from '@/hooks';
import { http } from '@/lib/api';
import { generatePath } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const useModifyQuiz = (id: string) => {
	const router = useRouter();
	const [quizIds, updateQuizIds] = useSessionStorage<string[]>('quiz-id', []);

	const deleteHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const { message, data } = await http.delete<{ quizId: string }>(
			`/api/quiz/${id}`
		);

		if (message === 'FAILURE') return;

		const { quizId } = data;
		updateQuizIds(quizIds.filter((id) => id !== quizId));
		const quizIndex = quizIds.findIndex((id) => id === quizId);

		if (quizIndex === -1) {
			router.replace(URL_PATH.HOME);
		}

		if (quizIds.length === 1) {
			router.back();
		}

		router.replace(
			generatePath(URL_PATH.QUIZ, {
				id: quizIds[quizIndex === 0 ? 0 : quizIndex - 1],
			})
		);
	};

	const modifyHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		router.push(`${generatePath(URL_PATH.QUIZ_EDIT, { id })}`);
	};

	return { deleteHandler, modifyHandler };
};

export default useModifyQuiz;
