import { Converter, createConverterWrapper } from '@/lib/firebase/converter';
import { Quiz } from './quiz.type';
import { QuizInfo } from '@/types/quiz';

const quizConverter: Converter<QuizInfo, Quiz> = {
	fromFirestore(snapshot): QuizInfo {
		const data = snapshot.data();

		return {
			id: snapshot.id,
			title: data.title,
			explain: data.explain,
			answer: data.answer,
			categoryId: data.category_id,
			favorite: data.favorite,
			record: {
				tryCount: data.record.try_count,
				wrongCount: data.record.wrong_count,
			},
		};
	},
	toFirestore(client): Quiz {
		return {
			id: '',
			title: client.title,
			explain: client.explain,
			answer: client.answer,
			favorite: client.favorite,
			category_id: client.categoryId,
			record: {
				try_count: client.record.tryCount,
				wrong_count: client.record.wrongCount,
			},
		};
	},
};

export const quizFireStoreConverter = createConverterWrapper(quizConverter);
