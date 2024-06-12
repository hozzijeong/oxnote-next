'use client';

import { Input, QuizForm, Selector } from '@/components';
import useSelector from '@/components/selector/hooks/useSelector';
import {
	ChangeEventHandler,
	FormEventHandler,
	Fragment,
	MouseEventHandler,
	useCallback,
	useState,
} from 'react';
import { useGetCategoryList } from '@/app/category/hooks';
import { ANSWER_OPTIONS } from '@/constants/form';
import { useRouter } from 'next/navigation';

const QuizFilterPage = () => {
	const router = useRouter();

	const { data: categoryList } = useGetCategoryList();

	const {
		selected: categorySelected,
		changeHandler: categoryChangeHandler,
		isModal: isCategoryModal,
	} = useSelector();

	const {
		selected: favoriteSelected,
		changeHandler: favoriteChangeHandler,
		isModal: isFavoriteModal,
	} = useSelector();

	const {
		selected: onlyFreshQuizSelected,
		changeHandler: onlyFreshQuizChangeHandler,
		isModal: onlyFreshQuizModal,
	} = useSelector();

	const {
		selected: recentCorrectSelected,
		changeHandler: recentCorrectChangeHandler,
		isModal: isRecentCorrectModal,
	} = useSelector();

	const [correctRate, setCorrectRate] = useState('');

	const correctRateChangeHandler: ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		const inputValue = e.currentTarget.value;

		if (
			inputValue === '' ||
			(/^\d+$/.test(inputValue) && Number(inputValue) <= 100)
		) {
			setCorrectRate(inputValue);
		}
	};

	const isOnlyFresh = onlyFreshQuizSelected[0] === '예';

	const submitHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		let query = '';

		const categoryIds = categoryList
			.filter((c) => categorySelected.includes(c.name))
			.map((c) => c.id);

		if (categoryIds.length !== 0) {
			query += `category-id=${categoryIds.join(',')}&`;
		}

		const favorite =
			favoriteSelected[0] === '아니오'
				? false
				: favoriteSelected[0] === '예'
				? true
				: null;

		if (favorite !== null) {
			query += `favorite=${favorite}&`;
		}

		const onlyFreshQuiz =
			onlyFreshQuizSelected[0] === '아니오'
				? false
				: onlyFreshQuizSelected[0] === '예'
				? true
				: null;
		if (favorite !== null) {
			query += `first=${onlyFreshQuiz}&`;
		}

		if (!onlyFreshQuiz) {
			const recentCorrect =
				recentCorrectSelected[0] === '아니오'
					? false
					: recentCorrectSelected[0] === '예'
					? true
					: null;
			if (recentCorrect !== null) {
				query += `recent-correct=${recentCorrect}&`;
			}

			if (correctRate !== '') {
				query += `correct-rate=${correctRate}&`;
			}
		}

		query = query.slice(0, -1);

		router.push(`/quiz/list?${query}`);
	};

	const isDisabled =
		categorySelected.length === 0 ||
		favoriteSelected.length === 0 ||
		onlyFreshQuizSelected.length === 0;

	return (
		<QuizForm>
			<QuizForm.FormElement title='카테고리' htmlFor='category'>
				<Selector
					type='multi'
					options={categoryList.map((c) => c.name)}
					placeholder='카테고리를 선택해주세요'
					selected={categorySelected}
					changeHandler={categoryChangeHandler}
					isModal={isCategoryModal}
				/>
			</QuizForm.FormElement>

			<QuizForm.FormElement title='즐겨찾기 여부' htmlFor='favorite'>
				<Selector
					type='single'
					options={Object.values(ANSWER_OPTIONS)}
					placeholder='즐겨찾기가 추가된 문제인가요'
					selected={favoriteSelected}
					changeHandler={favoriteChangeHandler}
					isModal={isFavoriteModal}
				/>
			</QuizForm.FormElement>

			<QuizForm.FormElement title='처음 풀어본 문제' htmlFor='answer'>
				<Selector
					type='single'
					options={Object.values(ANSWER_OPTIONS)}
					placeholder='처음 풀어보는 문제인가요'
					selected={onlyFreshQuizSelected}
					changeHandler={onlyFreshQuizChangeHandler}
					isModal={onlyFreshQuizModal}
				/>
			</QuizForm.FormElement>
			{onlyFreshQuizSelected.length !== 0 && !isOnlyFresh && (
				<Fragment>
					<QuizForm.FormElement
						title='최근 틀린 문제인가요'
						htmlFor='recentCorrect'
					>
						<Selector
							type='single'
							options={Object.values(ANSWER_OPTIONS)}
							placeholder='최근 틀린 문제인가요'
							selected={recentCorrectSelected}
							changeHandler={recentCorrectChangeHandler}
							isModal={isRecentCorrectModal}
						/>
					</QuizForm.FormElement>

					<QuizForm.FormElement title='정답률(n%이하)' htmlFor='correctRate'>
						<Input
							type='text'
							placeholder='정답률을 입력해주세요'
							onChange={correctRateChangeHandler}
							value={correctRate}
						/>
					</QuizForm.FormElement>
				</Fragment>
			)}

			<QuizForm.SubmitButton
				type='button'
				color='primary'
				onClick={submitHandler}
				disabled={isDisabled}
			>
				적용하기
			</QuizForm.SubmitButton>
		</QuizForm>
	);
};

export default QuizFilterPage;
