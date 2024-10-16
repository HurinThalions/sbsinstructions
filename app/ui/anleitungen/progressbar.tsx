

export function Progressbar({ currentStepIndex, totalSteps }: { currentStepIndex: number, totalSteps: number }) {
    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
  
    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="w-1/2 bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }} // Dynamische Breite
          ></div>
        </div>
      </div>
    );
  }