import { CheckCircleIcon } from "@heroicons/react/16/solid";

import EndseitenButton from "@/app/ui/EndseiteButton";

export default function Endseite() {

    return (
        <div className="flex flex-grow">
            <CheckCircleIcon className="bg-green-500"></CheckCircleIcon>
            <h1 className="text-center font-bold text-2xl">Aufgabegeschafft</h1>
            <EndseitenButton/>
        </div>
    )
}