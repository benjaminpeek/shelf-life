import React from "react";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-lg p-8 relative min-w-[320px]">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					onClick={onClose}
					aria-label="Close"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
}
