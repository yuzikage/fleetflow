import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface SafetyScoreGaugeProps {
  score: number;
  size?: "small" | "large";
}

export function SafetyScoreGauge({ score, size = "large" }: SafetyScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10B981"; // Elite - Green
    if (score >= 70) return "#F59E0B"; // Coaching - Yellow
    return "#EF4444"; // Risk - Red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Elite Driver";
    if (score >= 70) return "Coaching Required";
    return "Risk of Suspension";
  };

  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const data = [
    {
      name: "Safety Score",
      value: score,
      fill: color,
    },
  ];

  const dimensions = size === "large" ? { width: 200, height: 200 } : { width: 120, height: 120 };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius={size === "large" ? "70%" : "65%"}
            outerRadius={size === "large" ? "90%" : "85%"}
            barSize={size === "large" ? 20 : 12}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              className={`drop-shadow-[0_0_20px_${color}]`}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${
              size === "large" ? "text-5xl" : "text-3xl"
            } font-bold mb-1`}
            style={{ color }}
          >
            {score}
          </span>
          <span className={`${size === "large" ? "text-sm" : "text-xs"} text-gray-400`}>
            / 100
          </span>
        </div>
      </div>

      {/* Label */}
      {size === "large" && (
        <div
          className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold border-2`}
          style={{
            backgroundColor: `${color}20`,
            borderColor: `${color}40`,
            color,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
