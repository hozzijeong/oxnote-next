import { Input, Selector } from '@/components';
import styles from './quizRegister.module.scss';
import QuizForm from '@/components/quiz-form';

// const CATEGORIES: Category[] = [
// 	{ id: 1, name: '첫 번째' },
// 	{ id: 2, name: '두 번째' },
// 	{ id: 3, name: '세 번째' },
// 	{ id: 4, name: '네 번째' },
// ];

// const { YES, NO } = UserAnswer;

// const FAVORITE_SELECT: YesOrNoOption = {
// 	[YES]: '등록할게요',
// 	[NO]: '등록하지 않을래요',
// };

// const QUIZ_ANSWER: YesOrNoOption = {
// 	[YES]: 'O',
// 	[NO]: 'X',
// };

const QuizRegister = () => {
	return (
		<main className={styles.main}>
			<QuizForm>
				<QuizForm.FormElement
					title='카테고리'
					htmlFor='category'
				></QuizForm.FormElement>
				<QuizForm.FormElement title='문제' htmlFor='quiz'>
					<Input
						id='quiz'
						mode='text'
						name='quiz'
						placeholder='문제를 입력해주세요'
						required
					/>
				</QuizForm.FormElement>
				<QuizForm.FormElement
					title='답'
					htmlFor='answer'
				></QuizForm.FormElement>
				<QuizForm.FormElement title='해설' htmlFor='explain'>
					<textarea
						id='explain'
						className={styles.explain}
						name='explain'
						placeholder='해설을 입력해주세요'
						required
					/>
				</QuizForm.FormElement>
				<QuizForm.FormElement
					title='즐겨찾기 등록'
					htmlFor='favorite'
				></QuizForm.FormElement>

				<QuizForm.SubmitButtons
					title='등록하기'
					cancelHandler={() => console.log('cancel')}
				/>
			</QuizForm>
		</main>
	);
};

export default QuizRegister;
