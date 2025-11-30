import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  initial?: string; // first letter fallback
  avatarUrl?: string | null; // actual image from backend
  onUpload?: (file: File) => void;
};

export const AvatarUploader = ({ initial, avatarUrl, onUpload }: Props) => {
  const [preview, setPreview] = useState<string | null>(avatarUrl || null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // update preview when backend avatar changes
  useEffect(() => {
    if (avatarUrl) setPreview(avatarUrl);
  }, [avatarUrl]);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setLoading(true);

    // simulate upload, replace with actual API call
    setTimeout(() => {
      setLoading(false);
      onUpload && onUpload(file);
    }, 800);
  };

  return (
    <div className="relative w-28 h-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          w-28 h-28 rounded-full overflow-hidden 
          bg-white/10 border border-white/20 
          backdrop-blur-xl shadow-lg shadow-black/20
          flex items-center justify-center relative
        "
      >
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="avatar"
          />
        ) : (
          <span className="text-4xl font-bold text-primary">
            {initial?.charAt(0) ?? "?"}
          </span>
        )}

        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Loader2 className="w-7 h-7 animate-spin text-white" />
          </div>
        )}
      </motion.div>

      {/* Upload button */}
      <Button
        size="sm"
        className="
          absolute -bottom-2 left-1/2 -translate-x-1/2 
          bg-primary hover:bg-primary/80 text-white
          rounded-full px-3 py-1 shadow-md shadow-primary/40
        "
        onClick={() => inputRef.current?.click()}
      >
        <Camera className="w-4 h-4" />
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
    </div>
  );
};
