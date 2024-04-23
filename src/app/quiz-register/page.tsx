'use client';
import { Input, QuizForm, Selector } from '@/components';
import styles from './quiz-register.module.scss';
import { Category } from '../category/types';
import { UserAnswer, YesOrNoOption } from '@/types/form';
import useSelector from '@/components/selector/hooks/useSelector';
import { FormEventHandler, useCallback } from 'react';
import { useGetCategoryList } from '../category/hooks';

const { YES, NO } = UserAnswer;

const FAVORITE_SELECT: YesOrNoOption = {
	[YES]: '등록할게요',
	[NO]: '등록하지 않을래요',
};

const QUIZ_ANSWER: YesOrNoOption = {
	[YES]: 'O',
	[NO]: 'X',
};

const QuizRegisterPage = () => {
	const categoryList = useGetCategoryList();

	const {
		selected: categorySelected,
		changeHandler: categoryChangeHandler,
		isModal: isCategoryModal,
	} = useSelector();
	const {
		selected: answerSelected,
		changeHandler: answerChangeHandler,
		isModal: isAnswerModal,
	} = useSelector();
	const {
		selected: favoriteSelected,
		changeHandler: favoriteChangeHandler,
		isModal: isFavoriteModal,
	} = useSelector();

	const submitHandler: FormEventHandler<HTMLFormElement> = useCallback(
		(event) => {
			event.preventDefault();
		},
		[]
	);

	return (
		<main className={styles.main}>
			<QuizForm onSubmit={submitHandler}>
				<QuizForm.FormElement title='카테고리' htmlFor='category'>
					<Selector
						type='single'
						options={categoryList.map((c) => c.name)}
						placeholder='카테고리를 선택해주세요'
						selected={categorySelected}
						changeHandler={categoryChangeHandler}
						isModal={isCategoryModal}
					/>
				</QuizForm.FormElement>

				<QuizForm.FormElement title='문제' htmlFor='quiz'>
					<Input
						id='quiz'
						mode='text'
						name='quiz'
						placeholder='문제를 입력해주세요'
						required
					/>
				</QuizForm.FormElement>

				<QuizForm.FormElement title='답' htmlFor='answer'>
					<Selector
						type='single'
						options={Object.values(QUIZ_ANSWER)}
						placeholder='정답을 입력해주세요'
						selected={answerSelected}
						changeHandler={answerChangeHandler}
						isModal={isAnswerModal}
					/>
				</QuizForm.FormElement>
				<QuizForm.FormElement title='해설' htmlFor='explain'>
					<textarea
						id='explain'
						className={styles.explain}
						name='explain'
						placeholder='해설을 입력해주세요'
						required
					/>
				</QuizForm.FormElement>

				<QuizForm.FormElement title='즐겨찾기 등록' htmlFor='favorite'>
					<Selector
						type='single'
						options={Object.values(FAVORITE_SELECT)}
						placeholder='즐겨찾기를 등록하시겠습니까?'
						selected={favoriteSelected}
						changeHandler={favoriteChangeHandler}
						isModal={isFavoriteModal}
					/>
				</QuizForm.FormElement>

				<div className={styles['button-container']}>
					<QuizForm.SubmitButton type='reset'>취소하기</QuizForm.SubmitButton>
					<QuizForm.SubmitButton type='submit' color='primary'>
						제출하기
					</QuizForm.SubmitButton>
				</div>
			</QuizForm>
		</main>
	);
};

export default QuizRegisterPage;
