interface SegmentedControlProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

export function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1 grid grid-cols-2 gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300
            ${
              selected === option
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }
          `}
        >
          {selected === option && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
}
