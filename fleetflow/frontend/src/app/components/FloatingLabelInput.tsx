import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  showPasswordToggle?: boolean;
}

export function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = false,
  showPasswordToggle = false,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isFloating = isFocused || value.length > 0;
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="relative">
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 pt-6 pb-2 bg-white/5 backdrop-blur-xl border rounded-lg
          text-white placeholder-transparent
          transition-all duration-200 outline-none
          ${error ? "border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]" : isFocused ? "border-[#3B82F6] border-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "border-white/20"}
          hover:border-white/40 hover:bg-white/10
        `}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFloating ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-base"}
          ${error ? "text-[#EF4444]" : isFocused ? "text-[#3B82F6]" : "text-gray-400"}
        `}
      >
        {label}
      </label>
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}