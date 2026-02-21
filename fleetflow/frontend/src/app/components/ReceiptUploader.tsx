import { useState } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReceiptUploaderProps {
  onUpload: (file: File) => void;
}

export function ReceiptUploader({ onUpload }: ReceiptUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes("image") || file.type.includes("pdf"))) {
      simulateUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file);
          onUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div>
      <label className="block text-gray-400 text-sm mb-2">Receipt Upload (Optional)</label>

      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
            ${
              isDragging
                ? "border-[#3B82F6] bg-[#3B82F6]/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                : "border-white/20 bg-white/5 backdrop-blur-xl hover:border-[#3B82F6]/50 hover:bg-white/10"
            }
          `}
        >
          <input
            type="file"
            id="receipt-upload"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileSelect}
          />

          <Upload
            size={40}
            className={`mx-auto mb-3 transition-colors ${
              isDragging ? "text-[#3B82F6]" : "text-gray-400"
            }`}
          />

          <p className="text-white font-medium mb-1">
            Drop receipt here or{" "}
            <label
              htmlFor="receipt-upload"
              className="text-[#3B82F6] cursor-pointer hover:underline"
            >
              browse
            </label>
          </p>
          <p className="text-gray-400 text-sm">Supports: JPG, PNG, PDF (Max 5MB)</p>

          {/* Upload Progress */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  />
                </div>
                <p className="text-[#3B82F6] text-sm mt-2">Scanning... {uploadProgress}%</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#10B981]/10 backdrop-blur-xl border-2 border-[#10B981]/40 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#10B981]/20 rounded-lg">
                <CheckCircle size={20} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{uploadedFile.name}</p>
                <p className="text-gray-400 text-xs">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
