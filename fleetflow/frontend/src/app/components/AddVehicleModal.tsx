import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: any) => void;
}

export function AddVehicleModal({ isOpen, onClose, onAdd }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    plate: "",
    type: "Van",
    capacity: "",
    year: "",
    make: "",
    model: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.plate.trim()) {
      newErrors.plate = "License plate is required";
    }
    if (!formData.capacity || parseFloat(formData.capacity) <= 0) {
      newErrors.capacity = "Valid capacity is required";
    }
    if (!formData.year || parseInt(formData.year) < 1900 || parseInt(formData.year) > 2026) {
      newErrors.year = "Valid year is required (1900-2026)";
    }
    if (!formData.make.trim()) {
      newErrors.make = "Make is required";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    const newVehicle = {
      id: `VEH-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      plate: formData.plate.toUpperCase(),
      type: formData.type,
      capacity: parseFloat(formData.capacity),
      year: parseInt(formData.year),
      make: formData.make,
      model: formData.model,
      status: "Available",
    };

    onAdd(newVehicle);
    toast.success(`Vehicle ${newVehicle.plate} added successfully!`);
    
    // Reset form
    setFormData({
      plate: "",
      type: "Van",
      capacity: "",
      year: "",
      make: "",
      model: "",
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Add New Vehicle</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* License Plate */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      License Plate *
                    </label>
                    <input
                      type="text"
                      value={formData.plate}
                      onChange={(e) => handleChange("plate", e.target.value)}
                      placeholder="e.g., ABC-1234"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        errors.plate
                          ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />
                    {errors.plate && (
                      <p className="text-[#EF4444] text-xs mt-1">{errors.plate}</p>
                    )}
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Vehicle Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                    >
                      <option value="Motorcycle" className="bg-[#0F172A]">Motorcycle</option>
                      <option value="Van" className="bg-[#0F172A]">Van</option>
                      <option value="Truck" className="bg-[#0F172A]">Truck</option>
                      <option value="Trailer" className="bg-[#0F172A]">Trailer</option>
                    </select>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Capacity (kg) *
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      placeholder="e.g., 1500"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        errors.capacity
                          ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />
                    {errors.capacity && (
                      <p className="text-[#EF4444] text-xs mt-1">{errors.capacity}</p>
                    )}
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Year *
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                      placeholder="e.g., 2023"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        errors.year
                          ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />
                    {errors.year && (
                      <p className="text-[#EF4444] text-xs mt-1">{errors.year}</p>
                    )}
                  </div>

                  {/* Make */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Make *
                    </label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => handleChange("make", e.target.value)}
                      placeholder="e.g., Ford"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        errors.make
                          ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />
                    {errors.make && (
                      <p className="text-[#EF4444] text-xs mt-1">{errors.make}</p>
                    )}
                  </div>

                  {/* Model */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">
                      Model *
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => handleChange("model", e.target.value)}
                      placeholder="e.g., Transit"
                      className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                        errors.model
                          ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />
                    {errors.model && (
                      <p className="text-[#EF4444] text-xs mt-1">{errors.model}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02]"
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
