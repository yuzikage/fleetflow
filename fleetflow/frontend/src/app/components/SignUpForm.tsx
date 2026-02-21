import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Truck } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string; role: string }) => void;
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && selectedRole) {
      onSubmit({ name, email, password, role: selectedRole });
    }
  };

  const roles = [
    {
      id: "manager",
      title: "Fleet Manager",
      description: "Full system access & analytics",
      icon: Briefcase,
    },
    {
      id: "dispatcher",
      title: "Dispatcher",
      description: "Trip & driver management",
      icon: Truck,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Field */}
      <div>
        <label className="block text-gray-400 text-sm mb-2 font-medium">
          Full Name
        </label>
        <div className="relative">
          <User
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>
      </div>

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

      {/* Role Selection */}
      <div>
        <label className="block text-gray-400 text-sm mb-3 font-medium">
          Select Your Role
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`
                  p-4 rounded-xl border-2 transition-all text-left
                  ${
                    selectedRole === role.id
                      ? "bg-[#3B82F6]/20 border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      p-2 rounded-lg
                      ${
                        selectedRole === role.id
                          ? "bg-[#3B82F6]/30"
                          : "bg-white/10"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={
                        selectedRole === role.id ? "text-[#3B82F6]" : "text-gray-400"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        selectedRole === role.id ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {role.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{role.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
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
            placeholder="Create a strong password"
            required
            minLength={8}
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
        <p className="text-gray-500 text-xs mt-2">Must be at least 8 characters</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
      >
        Create Account
      </button>
    </form>
  );
}
