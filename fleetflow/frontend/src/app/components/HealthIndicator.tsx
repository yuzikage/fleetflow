import { Activity, AlertCircle, CheckCircle } from "lucide-react";

interface HealthIndicatorProps {
  score: number;
  nextService: string;
  kmUntilService: number;
}

export function HealthIndicator({
  score,
  nextService,
  kmUntilService,
}: HealthIndicatorProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-[#10B981]";
    if (score >= 60) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getHealthBg = (score: number) => {
    if (score >= 80) return "bg-[#10B981]/20 border-[#10B981]/40";
    if (score >= 60) return "bg-[#F59E0B]/20 border-[#F59E0B]/40";
    return "bg-[#EF4444]/20 border-[#EF4444]/40";
  };

  const getHealthIcon = (score: number) => {
    if (score >= 80) return <CheckCircle size={20} className="text-[#10B981]" />;
    if (score >= 60) return <AlertCircle size={20} className="text-[#F59E0B]" />;
    return <AlertCircle size={20} className="text-[#EF4444]" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Health Score */}
      <div
        className={`
        bg-white/5 backdrop-blur-xl border-2 rounded-xl p-6 
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${getHealthBg(score)}
      `}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/10 rounded-lg">{getHealthIcon(score)}</div>
          <h3 className="text-gray-400 text-sm font-medium">Fleet Health Score</h3>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-bold ${getHealthColor(score)}`}>{score}</span>
          <span className="text-gray-400 text-lg mb-1">/100</span>
        </div>
      </div>

      {/* Next Service */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
            <Activity size={20} className="text-[#3B82F6]" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Next Service</h3>
        </div>
        <p className="text-white text-xl font-semibold capitalize">
          {nextService.replace(/-/g, " ")}
        </p>
      </div>

      {/* KM Until Service */}
      <div
        className={`
        bg-white/5 backdrop-blur-xl border-2 rounded-xl p-6 
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${kmUntilService < 500 ? "bg-[#F59E0B]/10 border-[#F59E0B]/40" : "border-white/10"}
      `}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-2 rounded-lg ${
              kmUntilService < 500 ? "bg-[#F59E0B]/20" : "bg-white/10"
            }`}
          >
            <AlertCircle
              size={20}
              className={kmUntilService < 500 ? "text-[#F59E0B]" : "text-gray-400"}
            />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Service Due In</h3>
        </div>
        <div className="flex items-end gap-2">
          <span
            className={`text-4xl font-bold ${
              kmUntilService < 500 ? "text-[#F59E0B]" : "text-white"
            }`}
          >
            {kmUntilService}
          </span>
          <span className="text-gray-400 text-lg mb-1">km</span>
        </div>
      </div>
    </div>
  );
}
