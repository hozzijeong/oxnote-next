'use client';

import { Input, QuizForm, Selector } from '@/components';
import styles from '../../register/quiz-register.module.scss';
import { QUIZ_ANSWER, FAVORITE_SELECT } from '@/constants/form';
import useSelector from '@/components/selector/hooks/useSelector';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { useGetCategoryList } from '@/app/category/hooks';
import useGetQuiz from '../hooks/useGetQuiz';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/navigation';
import { useUpdateQuizProperty } from '../../hooks';

// NOTE: useSelector에서 렌더링 하기 전에 initialData가 undefined가 할당된다고 하는데 잘 모르겠음;

const QuizEditPage = ({ params: { id } }: { params: Params }) => {
	const router = useRouter();

	const { data: categoryList } = useGetCategoryList();
	const { data: quiz } = useGetQuiz(id);
	const { updateQuiz } = useUpdateQuizProperty(id);

	const selectedCategory =
		categoryList.find((el) => el.id === quiz.categoryId) ?? null;

	if (selectedCategory === null) {
		throw new Error('카테고리가 존재하지 않습니다.');
	}

	const {
		selected: categorySelected,
		changeHandler: categoryChangeHandler,
		isModal: isCategoryModal,
	} = useSelector({
		initialData: [selectedCategory.name],
	});

	const {
		selected: answerSelected,
		changeHandler: answerChangeHandler,
		isModal: isAnswerModal,
	} = useSelector({
		initialData: [QUIZ_ANSWER[`${quiz.answer}`]],
	});

	const {
		selected: favoriteSelected,
		changeHandler: favoriteChangeHandler,
		isModal: isFavoriteModal,
	} = useSelector({
		initialData: [FAVORITE_SELECT[`${quiz.favorite}`]],
	});

	const [title, setTitle] = useState(quiz.title);
	const [explain, setExplain] = useState(quiz.explain);

	const titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTitle(e.currentTarget.value);
	};

	const explainChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setExplain(e.currentTarget.value);
	};

	const editHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
		const { result } = await updateQuiz({
			title,
			favorite: favoriteSelected[0] === '등록할게요' ? true : false,
			answer: answerSelected[0] === 'O' ? true : false,
			explain,
		});

		if (result) {
			router.back();
		}
	};

	const cancelHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		router.back();
	};

	const isNotChanged =
		title === quiz.title &&
		explain === quiz.explain &&
		answerSelected[0] === QUIZ_ANSWER[`${quiz.answer}`] &&
		favoriteSelected[0] === FAVORITE_SELECT[`${quiz.favorite}`];

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
					disabled={true}
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
				<QuizForm.SubmitButton type='reset' onClick={cancelHandler}>
					취소하기
				</QuizForm.SubmitButton>
				<QuizForm.SubmitButton
					type='button'
					color='primary'
					onClick={editHandler}
					disabled={isNotChanged}
				>
					제출하기
				</QuizForm.SubmitButton>
			</div>
		</QuizForm>
	);
};

export default QuizEditPage;
