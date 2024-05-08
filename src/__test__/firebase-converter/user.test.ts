import { User } from '@/app/api/auth/auth.type';
import { userFireStoreConverter } from '@/app/api/auth/converter';
import { FirestoreDataConverter } from 'firebase/firestore';
import { MockQueryDocumentSnapshot } from '../lib/MockQueryDocumentSnapshot';

const MOCK_USER = {
	uid: '1234567',
	userName: '클린',
	email: 'clean@example.com',
};

describe('user Converter 테스트', () => {
	let firestoreConverter: FirestoreDataConverter<User>;

	beforeAll(() => {
		firestoreConverter = userFireStoreConverter;
	});

	test('toFirestore should convert User to UserDocument', () => {
		const user: User = MOCK_USER;
		const expected: User = MOCK_USER;

		const result = firestoreConverter.toFirestore(user);

		expect(result).toEqual(expected);
	});

	test('fromFirestore should convert snapshot to User', () => {
		const userDoc: User = MOCK_USER;
		const snapshot = new MockQueryDocumentSnapshot(userDoc);

		const result = firestoreConverter.fromFirestore(snapshot);

		expect(result).toEqual(MOCK_USER);
	});
});
