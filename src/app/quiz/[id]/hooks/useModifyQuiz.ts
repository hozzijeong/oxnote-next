import { useToast } from '@/components/toast';
import { URL_PATH } from '@/constants/path';
import { useSessionStorage } from '@/hooks';
import { http } from '@/lib/api';
import { CustomError } from '@/lib/error';
import { generatePath } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

const useModifyQuiz = (id: string) => {
	const router = useRouter();
	const [quizIds, updateQuizIds] = useSessionStorage<string[]>('quiz-id', []);
	const addToast = useToast();

	const { trigger } = useSWRMutation<{ quizId: string }, CustomError>(
		`/api/quiz/${id}`,
		http.delete,
		{
			onSuccess: ({ quizId }) => {
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
			},
			onError: (error) => {
				addToast({ message: error.message });
			},
		}
	);

	const deleteHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const result = await trigger();

		return result;
	};

	const modifyHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		router.push(`${generatePath(URL_PATH.QUIZ_EDIT, { id })}`);
	};

	return { deleteHandler, modifyHandler };
};

export default useModifyQuiz;
