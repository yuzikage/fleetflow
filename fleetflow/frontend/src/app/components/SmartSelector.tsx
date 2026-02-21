interface SmartSelectOption {
  id: string;
  label: string;
  subtext: string;
  available: boolean;
  capacity?: number;
}

interface SmartSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SmartSelectOption[];
  placeholder: string;
  error?: boolean;
}

export function SmartSelector({
  label,
  value,
  onChange,
  options,
  placeholder,
  error = false,
}: SmartSelectorProps) {
  return (
    <div>
      <label className="block text-gray-400 text-sm mb-2">
        {label} <span className="text-[#EF4444]">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-3 bg-white/5 backdrop-blur-xl border rounded-lg
          text-white transition-all duration-300 outline-none
          ${
            error
              ? "border-[#EF4444] border-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              : "border-white/10 focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-white/20"
          }
        `}
      >
        <option value="" className="bg-[#1E293B]">
          {placeholder}
        </option>
        {options
          .filter((opt) => opt.available)
          .map((option) => (
            <option key={option.id} value={option.id} className="bg-[#1E293B]">
              {option.label} | {option.subtext}
            </option>
          ))}
      </select>
    </div>
  );
}
