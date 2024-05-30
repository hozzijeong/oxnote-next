import { Converter, createConverterWrapper } from '@/lib/firebase/converter';
import { User } from './auth.type';

const userConverter: Converter<User, User> = {
	fromFirestore(snapshot): User {
		const data = snapshot.data();
		return {
			uid: data.uid,
			userName: data.userName,
			email: data.email,
		};
	},
	toFirestore(client): User {
		return {
			...client,
		};
	},
};

export const userFireStoreConverter = createConverterWrapper(userConverter);
