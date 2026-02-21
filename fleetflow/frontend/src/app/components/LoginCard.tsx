import { useState } from "react";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { RoleSelector } from "./RoleSelector";
import { SignInButton } from "./SignInButton";
import { Truck } from "lucide-react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState("Manager");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Mock authentication - check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Invalid email format");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Simulate success
    console.log("Signing in as:", role, "Email:", email);
    alert(`Successfully signed in as ${role}!\nEmail: ${email}\nRemember me: ${rememberMe}`);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#1E293B]/40 backdrop-blur-2xl rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] border border-white/10 p-8 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Truck size={24} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Welcome back
        </h1>
        <p className="text-gray-400 text-center text-sm">
          Enter your credentials to access the fleet dashboard
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-[#EF4444]/10 backdrop-blur-xl border border-[#EF4444]/50 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <p className="text-[#EF4444] text-sm text-center">{errorMessage}</p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-5">
        <FloatingLabelInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={error}
        />

        <FloatingLabelInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={error}
          showPasswordToggle
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
          >
            Forgot Password?
          </a>
        </div>

        {/* Role Selector */}
        <div className="pt-2">
          <RoleSelector value={role} onChange={setRole} />
        </div>

        {/* Sign In Button */}
        <SignInButton onClick={handleSignIn} />
      </div>
    </div>
  );
}