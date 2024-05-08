import {
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
	SnapshotMetadata,
} from 'firebase/firestore';

export class MockQueryDocumentSnapshot<T extends DocumentData>
	implements QueryDocumentSnapshot
{
	private dataValue: T;
	private mockMetadata: SnapshotMetadata;

	constructor(dataValue: T) {
		this.dataValue = dataValue;
		this.mockMetadata = {
			hasPendingWrites: false,
			fromCache: false,
			isEqual: (other: SnapshotMetadata) => this.isMetadataEqual(other),
		};
	}
	exists(): this is QueryDocumentSnapshot<DocumentData, DocumentData> {
		throw new Error('Method not implemented.');
	}

	data(): T {
		return this.dataValue;
	}

	get id(): string {
		return 'mock-id';
	}

	get metadata(): SnapshotMetadata {
		return this.mockMetadata;
	}

	get ref(): DocumentReference {
		return {} as DocumentReference;
	}

	isEqual(other: QueryDocumentSnapshot): boolean {
		return JSON.stringify(this.data()) === JSON.stringify(other.data());
	}

	isMetadataEqual(other: SnapshotMetadata): boolean {
		return (
			this.metadata.hasPendingWrites === other.hasPendingWrites &&
			this.metadata.fromCache === other.fromCache
		);
	}

	get(fieldPath: string): any {
		return (this.dataValue as any)[fieldPath];
	}
}
