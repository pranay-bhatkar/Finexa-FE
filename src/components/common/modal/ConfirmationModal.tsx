import { type FC } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          className="bg-[#4EF1C7] text-[#0A0F29] hover:bg-[#26C19F]"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
