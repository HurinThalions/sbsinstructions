import { useState } from "react";
import Image from "next/image";

import { Progressbar } from "./progressbar";

export default function Einzelschritte({
  schritte,
}: {
  schritte: Array<{
    id: number;
    titel: string;
    beschreibung: string;
    bild: string;
    material: string;
  }>;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = schritte[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < schritte.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <>
        <h1 className="text-center mb-4">Schritt {currentStepIndex + 1} von {schritte.length}</h1>
        <div className="float-left min-w-[40%]">
            <div className="border-2 border-black rounded-lg p-2 mb-4">
                <h2 className="font-bold mb-2">{currentStep.titel}</h2>
                <p>Beschreibung:</p>
                <p>{currentStep.beschreibung}</p>
            </div>
            <div className="border-2 border-black rounded-lg p-2">
                <p className="font-semibold">Material:</p>
                <p>{currentStep.material}</p>
            </div>
        </div>
          {currentStep.bild && (
          <div className="float-right w-[40%] rounded-lg ml-4">
              <Image
                src={'/Testbild.jpg'}
                width={550}
                height={330}
                alt="Logo"
                className="rounded-lg hidden lg:block"
              />
              <Image
                src={currentStep.bild}
                width={150}
                height={150}
                alt="Logo"
                className="rounded-lg block lg:hidden"
              />
          </div>
        )}
      <div className="bottom-4 w-full flex items-center justify-between px-4">
        {/* Button für den vorherigen Schritt (links) */}
        <button
          onClick={handlePreviousStep}
          disabled={currentStepIndex === 0}
          className="btn btn-secondary"
        >
          Zurück
        </button>

        <Progressbar currentStepIndex={currentStepIndex} totalSteps={schritte.length}/>

        {/* Button für den nächsten Schritt (rechts) */}
        <button
          onClick={handleNextStep}
          disabled={currentStepIndex === schritte.length - 1}
          className="btn btn-primary"
        >
          Nächster Schritt
        </button>
      </div>
    </>
  );
}