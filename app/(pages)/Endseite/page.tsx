import {  } from "@heroicons/react/16/solid";

import EndseitenButton from "@/app/ui/EndseiteButton";

export default function Endseite() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">✔️</h1>
        </div>
        <h1 className="text-2xl font-bold text-center mt-4">Aufgabe geschafft!</h1>
          <EndseitenButton />
      </div>
    );
  }