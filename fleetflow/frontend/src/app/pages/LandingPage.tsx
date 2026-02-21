import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Gauge, MapPin, Shield, TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Gauge,
      title: "Fleet Managers",
      subtitle: "Health & Scheduling",
      description: "Real-time asset utilization tracking with predictive maintenance alerts.",
      color: "from-[#3B82F6] to-[#06B6D4]",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: MapPin,
      title: "Dispatchers",
      subtitle: "Live Trip Validation",
      description: "Instant cargo assignment with route optimization and ETA tracking.",
      color: "from-[#10B981] to-[#22D3EE]",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: Shield,
      title: "Safety Officers",
      subtitle: "Compliance & Driver Scores",
      description: "Automated license tracking with violation monitoring and alerts.",
      color: "from-[#F59E0B] to-[#EF4444]",
      glowColor: "rgba(245, 158, 11, 0.3)",
    },
    {
      icon: TrendingUp,
      title: "Financial Analysts",
      subtitle: "ROI & Fuel Spend",
      description: "Deep analytics on maintenance costs, fuel efficiency, and profitability.",
      color: "from-[#8B5CF6] to-[#EC4899]",
      glowColor: "rgba(139, 92, 246, 0.3)",
    },
  ];

  const stats = [
    { value: "87%", label: "Avg Fleet Health" },
    { value: "3.2s", label: "Route Optimization" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Live Support" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#22D3EE]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] rounded-lg flex items-center justify-center">
              <Gauge size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              TRANSCOPE
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors hidden md:block">
              Features
            </a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors hidden md:block">
              Pricing
            </a>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
            >
              <Sparkles size={16} className="text-[#22D3EE]" />
              <span className="text-sm text-gray-300">Powering 10,000+ fleets worldwide</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Fleet Intelligence.
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#22D3EE] to-[#10B981] bg-clip-text text-transparent">
                Reimagined.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              One platform for <span className="text-[#3B82F6] font-semibold">Managers</span>,{" "}
              <span className="text-[#10B981] font-semibold">Dispatchers</span>, and{" "}
              <span className="text-[#F59E0B] font-semibold">Safety Officers</span>.
              <br />
              Real-time logistics meets executive ROI.
            </motion.p>

            {/* CTA Button with Shimmer */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate("/login")}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-full font-bold text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] transition-all overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight size={20} />
              </span>
            </motion.button>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative mx-auto max-w-6xl"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/30 via-transparent to-transparent blur-3xl" />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#3B82F6]/20 via-[#22D3EE]/20 to-[#10B981]/20 blur-2xl opacity-50" />

            {/* Glass dashboard container */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Dashboard mockup content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Fleet Overview</h3>
                    <p className="text-gray-400 text-sm">Real-time operational dashboard</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Mini cards */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-2">Active Vehicles</div>
                    <div className="text-3xl font-bold text-white">42</div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]" />
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-2">Safety Score</div>
                    <div className="text-3xl font-bold text-[#10B981]">87%</div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-[#10B981] to-[#22D3EE]" />
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-2">Monthly ROI</div>
                    <div className="text-3xl font-bold text-[#22D3EE]">206%</div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />
                    </div>
                  </div>
                </div>

                {/* Chart placeholder */}
                <div className="mt-6 h-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-end gap-2 p-4">
                  {[40, 70, 50, 80, 60, 90, 75, 85, 65, 95].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#3B82F6] to-[#22D3EE] rounded-t opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Light trails */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role-Based Feature Grid */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Built for Every Role
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From dispatch to finance, every team member gets a tailored experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: feature.glowColor }}
                />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 transition-all">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#22D3EE] mb-4 font-semibold">{feature.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">Learn more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {["DHL", "FedEx", "UPS", "Maersk"].map((company, i) => (
                <div key={i} className="flex items-center justify-center">
                  <span className="text-2xl font-black text-white/30 hover:text-white/60 transition-colors">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Ready to Transform
                <br />
                Your Fleet?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join thousands of fleet operators who've already made the switch
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-full font-bold text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight size={20} />
                </span>
              </motion.button>

              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 border border-white/20 rounded-full font-bold text-lg hover:bg-white/5 transition-all"
              >
                View Demo
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#10B981]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#10B981]" />
                <span>14-day free trial</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glassy Footer */}
      <footer className="relative border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] rounded-lg flex items-center justify-center">
                  <Gauge size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-black">TRANSCOPE</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Fleet Intelligence Platform for modern logistics teams.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Get Started</h4>
              <button
                onClick={() => navigate("/login")}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
              >
                Login Now →
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© 2026 Transcope. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
