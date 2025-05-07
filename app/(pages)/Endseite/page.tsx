import Image from "next/image";

import EndseitenButton from "@/app/ui/EndseiteButton";

export default function Endseite() {
    return (
      <div className="flex items-center justify-center max-h-screen">
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
          <EndseitenButton />
          <h1 className="text-2xl font-bold text-center mt-4 p-4">Aufgabe geschafft!</h1>
          </div>
    );
}
