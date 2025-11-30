interface QuickActionButtonProps {
  text: string;
  onClick?: () => void;
}

export default function QuickActionButton({
  text,
  onClick,
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#00D1B2] text-[#0A2540] px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
    >
      {text}
    </button>
  );
}
