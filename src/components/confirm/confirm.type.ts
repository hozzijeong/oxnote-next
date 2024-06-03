export type ConfirmProps = {
	title?: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	onClose: () => void;
};
