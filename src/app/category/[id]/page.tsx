'use client';
import QuizItem from '@/components/quiz-list-item/QuizListItem';
import { useGetQuizList } from '@/app/quiz/hooks/useGetQuizList';

// NOTE: 자체 라우터를 만들면 안되는 이유 (https://github.com/vercel/next.js/discussions/54840)

// TODO: 해당 페이지 자체를 컴포넌트화 가능하다고 생각. [id]에 해당하는 값만 어떻게 처리하면 좋을 듯
const CategoryQuizList = ({ params: { id } }: { params: { id: string } }) => {
	const { data: quizList, mutate } = useGetQuizList({ 'category-id': id });

	return (
		<div>
			{quizList.length &&
				quizList.map((quiz) => (
					<QuizItem key={quiz.id} item={quiz} mutateItem={mutate} />
				))}
		</div>
	);
};

export default CategoryQuizList;
