import { Converter, createConverterWrapper } from '@/lib/firebase/converter';
import { Quiz } from './quiz.type';
import { QuizInfo } from '@/types/quiz';

const quizConverter: Converter<QuizInfo, Quiz> = {
	fromFirestore(snapshot): QuizInfo {
		const data = snapshot.data();

		const record =
			data.record.recent_correct === undefined
				? {
						tryCount: data.record.try_count,
						wrongCount: data.record.wrong_count,
				  }
				: {
						tryCount: data.record.try_count,
						wrongCount: data.record.wrong_count,
						recentCorrect: data.record.recent_correct,
				  };

		return {
			id: snapshot.id,
			title: data.title,
			explain: data.explain,
			answer: data.answer,
			categoryId: data.category_id,
			favorite: data.favorite,
			record,
		};
	},
	toFirestore(client): Quiz {
		const record =
			client.record.recentCorrect === undefined
				? {
						try_count: client.record.tryCount,
						wrong_count: client.record.wrongCount,
				  }
				: {
						try_count: client.record.tryCount,
						wrong_count: client.record.wrongCount,
						recent_correct: client.record.recentCorrect,
				  };

		return {
			id: client.id,
			title: client.title,
			explain: client.explain,
			answer: client.answer,
			favorite: client.favorite,
			category_id: client.categoryId,
			record,
		};
	},
};

export const quizFireStoreConverter = createConverterWrapper(quizConverter);
