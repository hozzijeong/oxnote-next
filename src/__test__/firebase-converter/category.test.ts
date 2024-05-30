import { FirestoreDataConverter } from 'firebase/firestore';
import { MockQueryDocumentSnapshot } from '../lib/MockQueryDocumentSnapshot';
import { Category, CategoryInDB } from '@/app/api/category/category.type';
import { categoryFireStoreConverter } from '@/app/api/category/converter';

const MOCK_CATEGORY_DB: CategoryInDB = {
	['mock-id']: '테스트 카테고리입니다',
};

const MOCK_CATEGORY: Category = {
	id: 'mock-id',
	name: '테스트 카테고리입니다',
};

describe('quiz Converter 테스트', () => {
	let firestoreConverter: FirestoreDataConverter<Category[], CategoryInDB>;

	beforeAll(() => {
		firestoreConverter = categoryFireStoreConverter;
	});

	test('fireStore에서 QuizInfo 에서 Quiz로 변환 되는지 테스트', () => {
		const category: Category = MOCK_CATEGORY;
		const expected: CategoryInDB = MOCK_CATEGORY_DB;

		const result = firestoreConverter.toFirestore([category]);

		expect(result).toEqual(expected);
	});

	test('fireStore에서 convert된 snapshot이 UserInfo로 변환되는지 확인', () => {
		const categoryDoc: CategoryInDB = MOCK_CATEGORY_DB;
		const snapshot = new MockQueryDocumentSnapshot(categoryDoc);

		const result = firestoreConverter.fromFirestore(snapshot);

		expect(result).toEqual([MOCK_CATEGORY]);
	});
});
