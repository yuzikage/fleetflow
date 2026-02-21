import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth, UserRole, getRoleDisplayName } from "../context/AuthContext";
import { SuccessState } from "../components/SuccessState";
import { Truck, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const user = await login(email, password);
      setAuthenticatedUser(user);
      setShowSuccess(true);
    } catch (error: any) {
      const errorMessage = error.message || "Invalid email or password";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    // Redirect based on role
    const roleRoutes: Record<UserRole, string> = {
      MANAGER: "/dashboard",
      DISPATCHER: "/trips",
      SAFETY_OFFICER: "/drivers",
      FINANCIAL_ANALYST: "/analytics",
    };

    const targetRoute = roleRoutes[authenticatedUser.role];
    navigate(targetRoute);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.7)]">
        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl p-10 flex flex-col justify-center min-h-fit">
          <AnimatePresence mode="wait">
            {!showSuccess ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
                  <p className="text-gray-400 text-sm">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3 rounded-lg font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <SuccessState
                key="success-state"
                userName={authenticatedUser?.name || ""}
                userRole={authenticatedUser?.role || ""}
                onComplete={handleSuccessComplete}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}