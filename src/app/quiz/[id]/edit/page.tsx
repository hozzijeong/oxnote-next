'use client';

import { Input, QuizForm, Selector } from '@/components';
import styles from '../../register/quiz-register.module.scss';
import { UserAnswer, YesOrNoOption } from '@/types/form';
import useSelector from '@/components/selector/hooks/useSelector';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useGetCategoryList } from '@/app/category/hooks';
import useGetQuiz from '../hooks/useGetQuiz';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const { YES, NO } = UserAnswer;

const FAVORITE_SELECT: YesOrNoOption = {
	[YES]: '등록할게요',
	[NO]: '등록하지 않을래요',
};

const QUIZ_ANSWER: YesOrNoOption = {
	[YES]: 'O',
	[NO]: 'X',
};

// TODO: 여기 상태를 설정하기 위해서는 서버 상태관리 라이브러리가 필요함

const QuizEditPage = ({ params: { id } }: { params: Params }) => {
	const categoryList = useGetCategoryList();

	const quiz = useGetQuiz(id);

	console.log(quiz);

	const {
		selected: categorySelected,
		changeHandler: categoryChangeHandler,
		isModal: isCategoryModal,
	} = useSelector(quiz?.categoryId ? [quiz.categoryId] : []);

	const {
		selected: answerSelected,
		changeHandler: answerChangeHandler,
		isModal: isAnswerModal,
	} = useSelector(quiz !== null ? [QUIZ_ANSWER[`${quiz.answer}`]] : []);

	const {
		selected: favoriteSelected,
		changeHandler: favoriteChangeHandler,
		isModal: isFavoriteModal,
	} = useSelector(quiz !== null ? [QUIZ_ANSWER[`${quiz.favorite}`]] : []);

	const [title, setTitle] = useState(quiz?.title);
	const [explain, setExplain] = useState(quiz?.explain);

	const titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTitle(e.currentTarget.value);
	};

	const explainChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setExplain(e.currentTarget.value);
	};

	return (
		<QuizForm>
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
					onChange={titleChangeHandler}
					value={title}
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
					onChange={explainChangeHandler}
					value={explain}
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
				<QuizForm.SubmitButton type='button' color='primary'>
					제출하기
				</QuizForm.SubmitButton>
			</div>
		</QuizForm>
	);
};

export default QuizEditPage;
