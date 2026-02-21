import { useNavigate } from "react-router";
import { Shield, CheckCircle2, AlertTriangle, XCircle, Calendar, FileText, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function DriversCompliancePage() {
  const navigate = useNavigate();

  // Compliance data for all drivers
  const complianceRecords = [
    {
      id: "DRV-001",
      name: "John Doe",
      license: "DL-443298",
      licenseExpiry: "2026-03-15",
      medicalCert: "Valid",
      medicalExpiry: "2026-06-20",
      backgroundCheck: "Passed",
      backgroundDate: "2025-12-10",
      trainingComplete: true,
      lastTraining: "2025-11-05",
      violations: 0,
      complianceScore: 100,
    },
    {
      id: "DRV-002",
      name: "Jane Smith",
      license: "DL-887654",
      licenseExpiry: "2027-08-22",
      medicalCert: "Valid",
      medicalExpiry: "2026-04-15",
      backgroundCheck: "Passed",
      backgroundDate: "2025-10-18",
      trainingComplete: true,
      lastTraining: "2025-09-20",
      violations: 1,
      complianceScore: 95,
    },
    {
      id: "DRV-003",
      name: "Bob Wilson",
      license: "DL-998877",
      licenseExpiry: "2026-04-10",
      medicalCert: "Valid",
      medicalExpiry: "2026-08-05",
      backgroundCheck: "Passed",
      backgroundDate: "2025-11-22",
      trainingComplete: true,
      lastTraining: "2025-10-12",
      violations: 0,
      complianceScore: 100,
    },
    {
      id: "DRV-005",
      name: "Alice Chen",
      license: "DL-556721",
      licenseExpiry: "2026-03-07",
      medicalCert: "Expiring Soon",
      medicalExpiry: "2026-03-01",
      backgroundCheck: "Passed",
      backgroundDate: "2025-09-14",
      trainingComplete: false,
      lastTraining: "2024-08-30",
      violations: 2,
      complianceScore: 75,
    },
    {
      id: "DRV-008",
      name: "Sarah Kim",
      license: "DL-334567",
      licenseExpiry: "2026-04-02",
      medicalCert: "Valid",
      medicalExpiry: "2026-07-18",
      backgroundCheck: "Passed",
      backgroundDate: "2025-12-05",
      trainingComplete: true,
      lastTraining: "2025-11-28",
      violations: 0,
      complianceScore: 100,
    },
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 95) return "text-[#10B981]";
    if (score >= 75) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getComplianceBg = (score: number) => {
    if (score >= 95) return "bg-[#10B981]/20 border-[#10B981]/40";
    if (score >= 75) return "bg-[#F59E0B]/20 border-[#F59E0B]/40";
    return "bg-[#EF4444]/20 border-[#EF4444]/40";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Valid" || status === "Passed" || status === true) {
      return <CheckCircle2 size={16} className="text-[#10B981]" />;
    }
    if (status === "Expiring Soon" || status === false) {
      return <AlertTriangle size={16} className="text-[#F59E0B]" />;
    }
    return <XCircle size={16} className="text-[#EF4444]" />;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/drivers")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Drivers
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield size={32} className="text-[#10B981]" />
              Driver Compliance Center
            </h1>
            <p className="text-gray-400">Safety Officer exclusive: Complete compliance tracking and certification management</p>
          </div>
        </div>
      </div>

      {/* Compliance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">100%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Fully Compliant</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-[#F59E0B]" size={24} />
            <span className="text-[#F59E0B] text-sm font-semibold">Action Needed</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Partial Compliance</h3>
          <p className="text-3xl font-bold text-white">1</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-[#3B82F6]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Next 30d</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Expiring Certs</h3>
          <p className="text-3xl font-bold text-white">2</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-[#06B6D4]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Avg</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Compliance Score</h3>
          <p className="text-3xl font-bold text-white">94%</p>
        </motion.div>
      </div>

      {/* Detailed Compliance Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Detailed Compliance Records</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Driver</th>
                <th className="text-left p-4 text-gray-400 font-semibold">License</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Medical Cert</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Background</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Training</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Violations</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {complianceRecords.map((driver, index) => (
                <motion.tr
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="p-4">
                    <p className="text-white font-semibold">{driver.name}</p>
                    <p className="text-gray-400 text-sm font-mono">{driver.id}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon("Valid")}
                      <span className="text-white text-sm">{driver.license}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Exp: {driver.licenseExpiry}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(driver.medicalCert)}
                      <span className={`text-sm font-medium ${
                        driver.medicalCert === "Valid" ? "text-[#10B981]" : "text-[#F59E0B]"
                      }`}>
                        {driver.medicalCert}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">Exp: {driver.medicalExpiry}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(driver.backgroundCheck)}
                      <span className="text-[#10B981] text-sm">{driver.backgroundCheck}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{driver.backgroundDate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(driver.trainingComplete)}
                      <span className={`text-sm font-medium ${
                        driver.trainingComplete ? "text-[#10B981]" : "text-[#F59E0B]"
                      }`}>
                        {driver.trainingComplete ? "Complete" : "Pending"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">Last: {driver.lastTraining}</p>
                  </td>
                  <td className="p-4">
                    {driver.violations > 0 ? (
                      <span className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 rounded-lg text-sm font-semibold">
                        {driver.violations}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 rounded-lg text-sm font-semibold">
                        0
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl ${getComplianceBg(driver.complianceScore)}`}>
                      <span className={`font-bold text-lg ${getComplianceColor(driver.complianceScore)}`}>
                        {driver.complianceScore}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
