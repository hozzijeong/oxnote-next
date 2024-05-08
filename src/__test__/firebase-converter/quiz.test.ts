import { FirestoreDataConverter } from 'firebase/firestore';
import { MockQueryDocumentSnapshot } from '../lib/MockQueryDocumentSnapshot';
import { QuizInfo } from '@/types/quiz';
import { Quiz } from '@/app/api/quiz/quiz.type';
import { quizFireStoreConverter } from '@/app/api/quiz/converter';

const MOCK_QUIZ_INFO: QuizInfo = {
	categoryId: '123',
	answer: true,
	explain: '설명은 이렇게 됩니다',
	favorite: true,
	id: 'mock-id',
	title: '테스트 들어갑니다잉?',
	record: {
		tryCount: 0,
		wrongCount: 0,
	},
};

const MOCK_QUIZ: Quiz = {
	category_id: '123',
	answer: true,
	explain: '설명은 이렇게 됩니다',
	favorite: true,
	id: 'mock-id',
	title: '테스트 들어갑니다잉?',
	record: {
		try_count: 0,
		wrong_count: 0,
	},
};

describe('quiz Converter 테스트', () => {
	let firestoreConverter: FirestoreDataConverter<QuizInfo, Quiz>;

	beforeAll(() => {
		firestoreConverter = quizFireStoreConverter;
	});

	test('fireStore에서 QuizInfo 에서 Quiz로 변환 되는지 테스트', () => {
		const quizInfo: QuizInfo = MOCK_QUIZ_INFO;
		const expected: Quiz = MOCK_QUIZ;

		const result = firestoreConverter.toFirestore(quizInfo);

		expect(result).toEqual(expected);
	});

	test('fireStore에서 convert된 snapshot이 UserInfo로 변환되는지 확인', () => {
		const quizDoc: Quiz = MOCK_QUIZ;
		const snapshot = new MockQueryDocumentSnapshot(quizDoc);

		const result = firestoreConverter.fromFirestore(snapshot);

		expect(result).toEqual(MOCK_QUIZ_INFO);
	});
});
