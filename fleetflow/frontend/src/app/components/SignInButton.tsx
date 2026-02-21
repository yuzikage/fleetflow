interface SignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SignInButton({ onClick, disabled = false }: SignInButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3 px-4 rounded-lg font-medium text-white
        bg-gradient-to-r from-[#3B82F6] to-[#2563EB] backdrop-blur-xl
        border border-[#3B82F6]/50 transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 hover:scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"}
      `}
    >
      Sign In
    </button>
  );
}