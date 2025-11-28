import { X } from "lucide-react";
import toast, { type Toast } from "react-hot-toast";

const showCustomToast = (
  message: string,
  type: "success" | "error" | "info" = "info",
  duration = 4000
) => {
  toast.custom(
    (t: Toast) => {
      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs w-full p-4 rounded-xl shadow-lg flex justify-between items-center text-white`}
          style={{
            background:
              type === "success"
                ? "linear-gradient(90deg, #0A2540, #00D1B2)"
                : type === "error"
                ? "linear-gradient(90deg, #FF4D4F, #FF7A76)"
                : "#0A2540",
            fontWeight: 500,
          }}
        >
          <span>{message}</span>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 p-1 rounded hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    },
    { duration }
  );
};

export const showSuccess = (msg: string) =>
  showCustomToast(msg, "success", 3000);

export const showError = (msg: string) => showCustomToast(msg, "error", 5000);

export const showInfo = (msg: string) => showCustomToast(msg, "info", 4000);
