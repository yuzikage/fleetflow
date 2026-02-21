interface StepperProps {
  currentStep: number;
}

export function TripStepper({ currentStep }: StepperProps) {
  const steps = ["Draft", "Dispatched", "In Progress", "Completed"];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                transition-all duration-300
                ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    : "bg-white/5 text-gray-500 border border-white/10"
                }
              `}
            >
              {index + 1}
            </div>
            <span
              className={`
                text-xs mt-2 font-medium
                ${index <= currentStep ? "text-white" : "text-gray-500"}
              `}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 relative top-[-16px]">
              <div
                className={`
                  h-full transition-all duration-300
                  ${
                    index < currentStep
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]"
                      : "bg-white/10"
                  }
                `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
