import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignupInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function SignupInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: SignupInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-gray-400 text-sm mb-2">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 bg-white/5 backdrop-blur-xl border rounded-lg
            text-white placeholder-gray-500
            transition-all duration-300 outline-none
            ${
              isFocused
                ? "border-[#3B82F6] border-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-white/10"
                : "border-white/10 hover:border-white/20 hover:bg-white/10"
            }
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
