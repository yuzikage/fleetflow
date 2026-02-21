import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Field */}
      <div>
        <label className="block text-gray-400 text-sm mb-2 font-medium">
          Email Address
        </label>
        <div className="relative">
          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-gray-400 text-sm mb-2 font-medium">
          Password
        </label>
        <div className="relative">
          <Lock
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-[#3B82F6] text-sm font-medium hover:text-[#06B6D4] transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
      >
        Sign In
      </button>
    </form>
  );
}
