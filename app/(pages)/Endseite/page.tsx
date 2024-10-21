import { CheckCircleIcon } from "@heroicons/react/16/solid";

import EndseitenButton from "@/app/ui/EndseiteButton";

export default function Endseite() {

    return (
        <div className="flex flex-grow">
            <CheckCircleIcon className=""></CheckCircleIcon>
            <EndseitenButton/>
        </div>
    )
}