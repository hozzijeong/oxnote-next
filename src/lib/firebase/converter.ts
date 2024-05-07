import { User } from 'firebase/auth';
import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
} from 'firebase/firestore';

export type Converter<Client, FB extends DocumentData> = {
	toFirestore(client: Client): FB;
	fromFirestore(snapshot: QueryDocumentSnapshot): Client;
};
type ConvertWrapper = <Client, FB extends DocumentData>(
	props: Converter<Client, FB>
) => FirestoreDataConverter<Client, FB>;

export const createConverterWrapper: ConvertWrapper = <
	Client,
	FB extends DocumentData
>(
	props: Converter<Client, FB>
): FirestoreDataConverter<Client, FB> => ({
	toFirestore: (client: Client): FB => props.toFirestore(client),
	fromFirestore: (snapshot: QueryDocumentSnapshot): Client =>
		props.fromFirestore(snapshot),
});
