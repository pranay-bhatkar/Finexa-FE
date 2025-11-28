import { type FC, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div
        className="absolute inset-0 blur-sm  dark:bg-black/20"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative dark:bg-[#0A0F29] rounded-2xl max-w-md w-full p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-[#0A0F29] dark:text-white">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
