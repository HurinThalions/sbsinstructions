'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';  // Verwende useRouter für Navigation
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
    anleitung_id: number;
  }>;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = schritte[currentStepIndex];
  const router = useRouter();

  const handleNextStep = () => {
    if (currentStepIndex < schritte.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      router.push(`/Anleitung/${currentStep.anleitung_id}`);
    } else {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Schritt {currentStepIndex + 1} von {schritte.length}</h1>
      <div className="float-left min-w-[45%]">
        <div className="border-2 border-black rounded-lg p-2 mb-4">
          <h2 className="font-bold mb-2">{currentStep.titel}</h2>
          <p>Beschreibung:</p>
          <p>{currentStep.beschreibung}</p>
        </div>
        <div className="border-2 border-black rounded-lg p-2 mb-4">
          <p className="font-semibold">Material:</p>
          <p>{currentStep.material}</p>
        </div>
      </div>
      {currentStep.bild && (
        <div className="float-right w-[45%] rounded-lg mb-10">
          <Image
            src={`/${currentStep.bild}`}
            width={500}
            height={350}
            alt="Bild"
            className="rounded-lg hidden lg:block"
          />
          <Image
            src={currentStep.bild}
            width={150}
            height={100}
            alt="Bild"
            className="rounded-lg block lg:hidden"
          />
        </div>
      )}

      <div className="fixed bottom-10 w-full flex items-center justify-center px-20">
        {/* Dynamischer Zurück-Button */}
        <button
          onClick={handlePreviousStep}
          className="btn btn-secondary whitespace-nowrap min-w-[10%] max-w-[40%] sm:max-w-[70%] md:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {currentStepIndex === 0 ? "Zurück zum Überblick" : "Zurück"}
        </button>

        {/* Progressbar */}
        <div className="w-1/3">
          <Progressbar currentStepIndex={currentStepIndex} totalSteps={schritte.length} />
        </div>

        {/* Dynamischer Nächster Schritt/Beenden-Button */}
        <button
          onClick={handleNextStep}
          disabled={currentStepIndex === schritte.length - 1}
          className="btn btn-primary whitespace-nowrap min-w-[10%] max-w-[40%] sm:max-w-[70%] md:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {currentStepIndex === schritte.length - 1 ? "Anleitung beenden" : "Nächster Schritt"}
        </button>
      </div>
    </>
  );
}