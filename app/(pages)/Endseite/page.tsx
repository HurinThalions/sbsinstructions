import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

import EndseitenButton from "@/app/ui/EndseiteButton";


export default function Endseite() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Image
            src={'/GruenerHaken.svg'}
            height={300}
            width={300}
            alt="GruenerHaken"
            className="hidden md:block"></Image>
        <Image
            src={'/GruenerHaken.svg'}
            height={300}
            width={300}
            alt="GruenerHaken"
            className="block md:hidden"></Image>
        <h1 className="text-2xl font-bold text-center mt-4">Aufgabe geschafft!</h1>
          <EndseitenButton />
      </div>
    );
}
